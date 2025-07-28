'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { deleteImage, uploadImage } from '@/lib/actions/upload-actions';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  accept = 'image/*',
  maxSize = 40,
  placeholder = 'Clique para fazer upload da imagem',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadImage(formData);

      if (result.success && result.url) {
        onChange(result.url);
        setPreview(null); // Clear preview since we now have the final URL
        toast.success('Imagem enviada com sucesso!');
      } else {
        const error = result.error || 'Erro ao fazer upload da imagem';
        toast.error(error);
        setPreview(null); // Clear preview on error
        console.error('❌ Upload failed:', error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao fazer upload da imagem');
      setPreview(null); // Clear preview on error
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
  };

  const removeImage = async () => {
    if (value) {
      // Delete from S3 bucket if it's an uploaded image
      try {
        const result = await deleteImage(value);
        if (result.success) {
          console.log('✅ Image deleted from S3');
        } else {
          console.warn('⚠️ Failed to delete from S3:', result.error);
        }
      } catch (error) {
        console.error('❌ Error deleting from S3:', error);
        // Continue with removal from form even if S3 deletion fails
      }
    }

    onChange('');
    setPreview(null);
    toast.success('Imagem removida');
  };

  const displayImage = value || preview;

  return (
    <div className='space-y-4'>
      {displayImage ? (
        // Show uploaded/preview image with remove option
        <div className='relative'>
          <div className='aspect-square w-full max-w-sm rounded-lg overflow-hidden border bg-muted'>
            {preview ? (
              // Show local preview using Next.js Image for base64
              <Image
                src={preview}
                alt='Preview'
                width={400}
                height={400}
                className='w-full h-full object-cover'
                unoptimized
              />
            ) : (
              // Show uploaded image from S3
              <Image
                src={value!}
                alt='Uploaded image'
                className='w-full h-full object-cover'
                width={250}
                height={250}
                unoptimized // For external S3 URLs
              />
            )}
            {isUploading && (
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                <div className='text-white text-sm font-medium'>
                  Enviando...
                </div>
              </div>
            )}
          </div>
          <Button
            type='button'
            variant='destructive'
            size='sm'
            className='absolute top-2 right-2'
            onClick={removeImage}
            disabled={isUploading}
          >
            <X className='h-4 w-4' />
          </Button>
          {value && (
            <p className='text-xs text-muted-foreground mt-2 break-all'>
              {value}
            </p>
          )}
        </div>
      ) : (
        // Show upload area
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
            ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
            ${isUploading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id='file-input'
            type='file'
            accept={accept}
            onChange={handleFileChange}
            className='sr-only'
            disabled={isUploading}
          />

          <div className='flex flex-col items-center justify-center space-y-2 text-center'>
            <Upload
              className={`h-8 w-8 ${isUploading ? 'animate-pulse' : ''}`}
            />
            <div>
              <p className='text-sm font-medium'>
                {isUploading ? 'Enviando...' : placeholder}
              </p>
              <p className='text-xs text-muted-foreground'>
                {isUploading
                  ? 'Aguarde...'
                  : `Arraste e solte ou clique para selecionar (máx. ${maxSize}MB)`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
