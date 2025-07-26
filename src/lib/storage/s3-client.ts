import { S3Client } from '@aws-sdk/client-s3';

// Configure S3 client for Zenko S3-compatible storage
export const s3Client = new S3Client({
  endpoint: 'https://l0la-storage.kyantech.com.br',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.SCALITY_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SCALITY_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

// Default bucket name for the portfolio
export const BUCKET_NAME = 'portfolio-assets';
