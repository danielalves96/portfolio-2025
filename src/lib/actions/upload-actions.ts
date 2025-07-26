'use server';

import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

import { BUCKET_NAME, s3Client } from '@/lib/storage/s3-client';
import { ensureBucketExists } from '@/lib/storage/setup-bucket';

const BASE_URL = 'https://l0la-storage.kyantech.com.br';

export async function uploadImage(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Ensure bucket exists
    const bucketResult = await ensureBucketExists();
    if (!bucketResult.success) {
      return { success: false, error: bucketResult.error };
    }

    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'Nenhum arquivo selecionado' };
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Tipo de arquivo não suportado. Use JPEG, PNG, WebP ou SVG.',
      };
    }

    // Validate file size (40MB max)
    const maxSize = 40 * 1024 * 1024; // 40MB in bytes
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Arquivo muito grande. Tamanho máximo: 40MB.',
      };
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read', // Make file publicly accessible
    });

    await s3Client.send(command);

    // Return public URL
    const url = `${BASE_URL}/${BUCKET_NAME}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Erro interno do servidor durante o upload',
    };
  }
}

export async function deleteImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!imageUrl || !imageUrl.startsWith(BASE_URL)) {
      return { success: false, error: 'URL da imagem inválida' };
    }

    // Extract the file key from the URL
    // URL format: https://l0la-storage.kyantech.com.br/portfolio-assets/filename.jpg
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];

    if (!fileName) {
      return { success: false, error: 'Nome do arquivo não encontrado na URL' };
    }

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    });

    await s3Client.send(command);

    console.log('✅ Image deleted from S3:', fileName);
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: 'Erro ao deletar imagem do storage',
    };
  }
}
