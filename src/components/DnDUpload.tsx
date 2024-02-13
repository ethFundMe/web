'use client';

import { cn, uploadToCloudinary } from '@/lib/utils';
import { Download, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

type Props = {
  handleUpload: (bannerUrl: string[]) => void;
  maxFiles?: number;
} & React.ComponentProps<'div'>;

type DropStatus = 'idle' | 'accepted' | 'rejected';
type UploadStatus = 'uploading' | 'idle' | 'uploaded';

export default function DnDUpload({
  handleUpload,
  className,
  maxFiles,
}: Props) {
  const [dropStatus, setDropStatus] = useState<DropStatus>('idle');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

  const dropStatusStyles: Record<DropStatus, string> = {
    accepted: 'bg-slate-200',
    rejected: 'bg-red-50 outline-red-300',
    idle: 'bg-slate-100',
  };

  // file.size > 1024 ** 2 * 2

  const fileSizeValidator = (file: File) => {
    if (file.size > 1024 ** 2 * 2) {
      setDropStatus('rejected');
      return {
        code: 'size-too-large',
        message: 'Image is larger than 2mb',
      };
    }
    setDropStatus('idle');
    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.length > 0 && setDropStatus('accepted');
  }, []);

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragAccept,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    validator: fileSizeValidator,
    maxFiles,
  });

  const upload = (file: FileList) => {
    setUploadStatus('uploading');

    uploadToCloudinary(file)
      .then((res) => {
        if (!res) throw new Error();
        handleUpload(res);
        setUploadStatus('idle');
      })
      .catch(() => {
        toast.error('Failed to upload');
        setUploadStatus('idle');
      });
  };

  const dndErrors = useMemo(() => {
    fileRejections.length > 0 && setDropStatus('rejected');
    return fileRejections.map(({ file, errors }) => {
      return (
        <li key={file.name} className='text-sm'>
          {file.name} - {(file.size / 1000000).toFixed(2)} mb
          <ul>
            {errors.map((e) => (
              <li key={e.code} className='text-red-500'>
                {e.message}
              </li>
            ))}
          </ul>
        </li>
      );
    });
  }, [fileRejections]);

  const dndAcceptedFiles = useMemo(() => {
    acceptedFiles.length > 0 &&
      fileRejections.length === 0 &&
      setDropStatus('idle');
    return acceptedFiles.map((file) => {
      return (
        <li key={file.name} className='basis-20 text-sm'>
          <Image
            className='h-auto w-full object-cover'
            src={URL.createObjectURL(file)}
            width={70}
            height={70}
            alt={file.name}
          />
        </li>
      );
    });
  }, [acceptedFiles, fileRejections]);

  return (
    <div
      {...getRootProps({
        className: cn(
          'absolute border-dashed outline-2 outline-transparent rounded-md outline-dashed transition-all duration-150 ease-in-out left-0 top-0 h-full w-full cursor-pointer',
          (isDragActive || isDragAccept) && 'outline-blue-200 bg-slate-200',
          dropStatusStyles[dropStatus],
          className
        ),
      })}
    >
      <div className='absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
        {isDragActive ? (
          <div className='flex flex-col items-center'>
            <Download size={50} strokeWidth={1.2} />
            <span className='mt-2'>Drop files here</span>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <UploadCloud size={50} strokeWidth={1.2} />
            <span className='mt-2 max-w-xl text-center'>
              Drag files here or click to upload
            </span>
          </div>
        )}

        {!!dndAcceptedFiles.length && dndErrors.length === 0 && (
          <>
            <ul
              className={cn(
                'my-2 grid max-h-40 gap-2 overflow-y-auto p-2',
                dndAcceptedFiles.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              )}
            >
              {dndAcceptedFiles}
            </ul>

            <Button
              disabled={uploadStatus === 'uploading'}
              size='sm'
              variant='outline'
              className='disabled:cursor-not-allowed disabled:opacity-50'
              onClick={(e) => {
                e.stopPropagation();
                upload(acceptedFiles as unknown as FileList);
              }}
            >
              {uploadStatus === 'uploading'
                ? 'Uploading...'
                : 'Click to upload'}
            </Button>
          </>
        )}

        {dndErrors && (
          <ul className='max-h-32 overflow-y-auto p-2'>{dndErrors}</ul>
        )}
      </div>

      <div className='hidden h-full flex-col items-end'>
        <Image
          className='mt-auto opacity-10'
          src='/images/efm-logo.svg'
          width={800}
          height={800}
          alt='logo'
        />
      </div>
      <input {...getInputProps()} />
    </div>
  );
}
