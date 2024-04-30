'use client';

import { cn, deleteFromCloudinary, uploadToCloudinary } from '@/lib/utils';
import { Download, Trash, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
    return fileRejections.map(({ file, errors }, idx) => {
      return (
        <li key={idx} className='text-sm'>
          {file.name} - {(file.size / 1000000).toFixed(2)} mb
          <ul>
            {errors.map((e, idx) => (
              <li key={idx} className='text-red-500'>
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
        <li key={file.name} className='w-full basis-20 text-sm'>
          <Image
            className='mx-auto h-52 w-auto object-cover'
            src={URL.createObjectURL(file)}
            width={800}
            height={800}
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
          'absolute border-dashed overflow-hidden outline-2 outline-transparent rounded-md outline-dashed transition-all duration-150 ease-in-out left-0 top-0 h-full w-full cursor-pointer',
          (isDragActive || isDragAccept) && 'outline-blue-200 bg-slate-200',
          dropStatusStyles[dropStatus],
          uploadStatus === 'uploading'
            ? 'pointer-events-none'
            : 'pointer-events-auto',
          className
        ),
      })}
    >
      <div
        className={cn(
          'absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center',
          !!acceptedFiles || !!fileRejections ? 'h-fit py-4' : 'h-full'
        )}
      >
        <div className='flex h-full flex-col items-center justify-center'>
          {isDragActive ? (
            <>
              <Download size={50} strokeWidth={1.2} />
              <span className='mt-2'>Drop files here</span>
            </>
          ) : (
            <>
              <UploadCloud size={50} strokeWidth={1.2} />
              <span className='mt-2 max-w-xl text-center'>
                Drag files here or click to upload
              </span>
            </>
          )}
        </div>

        {!!dndAcceptedFiles.length && dndErrors.length === 0 && (
          <>
            <ul
              onClick={() => {}}
              className={cn(
                'my-2 grid w-full gap-2 overflow-y-auto p-2',
                dndAcceptedFiles.length > 1
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-2'
                  : 'grid-cols-1'
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

      <input {...getInputProps({ disabled: uploadStatus === 'uploading' })} />
    </div>
  );
}

export function DnDUploadSmall({
  disabled = false,
  maxFiles = 1,
  className,
  handleUpload,
  preview,
  deletable = false,
  handleDelete,
}: {
  disabled?: boolean;
  maxFiles?: number;
  className?: string;
  deletable?: boolean;
  handleUpload: (bannerUrl: string[]) => void;
  handleDelete?: (bannerUrl: string) => void;
  preview?: string[];
}) {
  const [dropStatus, setDropStatus] = useState<DropStatus>('idle');
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

  const dropStatusStyles: Record<DropStatus, string> = {
    accepted: 'bg-slate-200',
    rejected: 'bg-red-50 outline-red-300',
    idle: 'bg-slate-100',
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.length > 0 && setDropStatus('accepted');
  }, []);

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

  const dndAcceptedFiles = useMemo(() => {
    acceptedFiles.length > 0 &&
      fileRejections.length === 0 &&
      setDropStatus('idle');
    return acceptedFiles.map((file) => {
      return (
        <li key={file.name} className='h-32 w-full basis-20 text-sm'>
          <Image
            className='mx-auto h-full w-auto object-cover'
            src={URL.createObjectURL(file)}
            width={800}
            height={800}
            alt={file.name}
          />
        </li>
      );
    });
  }, [acceptedFiles, fileRejections]);

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

  const upload = (file: FileList) => {
    setUploadStatus('uploading');

    uploadToCloudinary(file)
      .then((res) => {
        if (!res) throw new Error();
        setPreviewToShow(preview as unknown as JSX.Element[]);
        handleUpload(res);
        setUploadStatus('idle');
      })
      .catch(() => {
        toast.error('Failed to upload');
        setUploadStatus('idle');
      });
  };

  const dragView = {
    active: (
      <>
        <Download size={25} strokeWidth={1.2} />
        <span>Drop files here</span>
      </>
    ),
    inActive: (
      <>
        <UploadCloud size={25} strokeWidth={1.2} />
        <span className='max-w-xl'>Drag files here or click to upload</span>
      </>
    ),
  };

  const getPreview = () => {
    if (!preview || preview.length < 1) return;

    if (preview.length > 1) {
      return preview.map((item) => (
        <li className='h-40 w-full overflow-hidden lg:h-24' key={item}>
          <ImagePreview
            disabled={disabled}
            deletable={deletable}
            handleDelete={handleDelete}
            src={item}
          />
        </li>
      ));
    } else {
      return (
        <li className='h-40 w-full'>
          <ImagePreview
            disabled={disabled}
            deletable={deletable}
            handleDelete={handleDelete}
            src={preview[0]}
          />
        </li>
      );
    }
  };

  const view = getPreview();

  const [previewToShow, setPreviewToShow] = useState<JSX.Element[]>(
    preview as unknown as JSX.Element[]
  );

  const gridViewStyles =
    previewToShow && previewToShow.length === 1
      ? 'lg:grid-cols-1 mx-auto'
      : 'md:grid-cols-3 grid-cols-1 lg:grid-col-2';

  useEffect(() => {
    if (dndAcceptedFiles && dndAcceptedFiles.length > 0) {
      setPreviewToShow(dndAcceptedFiles);
    } else {
      setPreviewToShow(preview as unknown as JSX.Element[]);
    }
  }, [dndAcceptedFiles, preview]);

  return (
    <>
      {dndErrors.length === 0 && (
        <>
          <ul
            onClick={() => {}}
            className={cn(
              'my-2 grid w-full items-center gap-2 overflow-y-auto',
              gridViewStyles
            )}
          >
            {dndAcceptedFiles.length ? dndAcceptedFiles : view}
          </ul>

          {dndAcceptedFiles.length > 0 && (
            <Button
              disabled={uploadStatus === 'uploading' || disabled}
              size='sm'
              variant='outline'
              className='w-full disabled:cursor-not-allowed disabled:opacity-50'
              onClick={(e) => {
                e.stopPropagation();
                upload(acceptedFiles as unknown as FileList);
              }}
            >
              {uploadStatus === 'uploading'
                ? 'Uploading...'
                : disabled
                ? 'Loading...'
                : 'Click to upload'}
            </Button>
          )}
        </>
      )}

      <div className='relative h-full min-h-20'>
        <div
          {...getRootProps({
            className: cn(
              'absolute border-dashed overflow-hidden outline-2 outline-transparent rounded-md outline-dashed transition-all duration-150 ease-in-out left-0 top-0 h-full w-full cursor-pointer',
              (isDragActive || isDragAccept) && 'outline-blue-200 bg-slate-200',
              dropStatusStyles[dropStatus],
              uploadStatus === 'uploading'
                ? 'pointer-events-none'
                : 'pointer-events-auto',
              className
            ),
          })}
        >
          <div
            className={cn(
              'flex justify-center p-2 pb-0',
              dndErrors.length > 0 ? 'gap-x-2' : 'h-full flex-col items-center'
            )}
          >
            {isDragActive ? dragView.active : dragView.inActive}
          </div>

          {dndErrors && (
            <ul className='max-h-20 overflow-y-auto bg-slate-950/5  p-2 pb-10'>
              {dndErrors}
            </ul>
          )}

          <input
            {...getInputProps({ disabled: uploadStatus === 'uploading' })}
          />
        </div>
      </div>
    </>
  );
}

const ImagePreview = ({
  src,
  deletable = false,
  handleDelete,
  disabled = false,
}: {
  src: string;
  disabled?: boolean;
  deletable?: boolean;
  handleDelete?: (src: string) => void;
}) => {
  const { refresh } = useRouter();

  return (
    <div className='group relative h-full'>
      <Image
        src={src}
        width={800}
        className='mx-auto h-full w-auto'
        height={800}
        alt='...'
      />

      {deletable && handleDelete && (
        <div className='absolute left-0 top-0 z-10 grid h-full w-full place-content-center bg-black/30 text-xl text-red-500 opacity-0 transition-all duration-150 group-hover:opacity-100'>
          <span
            className={cn(
              'cursor-pointer p-2',
              disabled ? 'pointer-events-none' : 'pointer-events-auto'
            )}
            onClick={async () => {
              if (deletable) {
                try {
                  const res = await deleteFromCloudinary(src);
                  console.log(
                    res.ok
                      ? 'Deleted from Cloudinary'
                      : 'Not found on Cloudinary'
                  );

                  handleDelete(src);
                  refresh();
                  return;
                } catch {
                  handleDelete(src);
                  refresh();
                  return;
                }
              }
            }}
          >
            {disabled ? (
              <div className='h-8 w-8 animate-spin rounded-full border-2 border-t-0 border-slate-300'></div>
            ) : (
              <Trash />
            )}
          </span>
        </div>
      )}
    </div>
  );
};
