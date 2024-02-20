'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FormPage() {
  const [images, setImages] = useState<FileList | null>();
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    uploadToCloudinary(images as FileList)
      .then(() => {
        setUploading(false);
        toast.success('Uploaded');
      })
      .catch(() => {
        setUploading(false);
        toast.error('Failed to upload');
      });
  };

  return (
    <div className='container h-screen'>
      <div className='py-20'>
        <Input
          type='file'
          accept='image/*'
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
        <Button onClick={handleUpload}>
          {uploading ? 'uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
}
