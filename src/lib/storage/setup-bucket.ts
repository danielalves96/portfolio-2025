import { CreateBucketCommand, HeadBucketCommand } from '@aws-sdk/client-s3';

import { BUCKET_NAME, s3Client } from './s3-client';

export async function ensureBucketExists() {
  try {
    // Try to access the bucket first
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    return { success: true, message: `Bucket ${BUCKET_NAME} is ready` };
  } catch (error: any) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      // Bucket doesn't exist, try to create it
      try {
        await s3Client.send(
          new CreateBucketCommand({
            Bucket: BUCKET_NAME,
            ACL: 'public-read',
          })
        );
        return {
          success: true,
          message: `Bucket ${BUCKET_NAME} created successfully`,
        };
      } catch (createError: any) {
        console.error('Error creating bucket:', createError);
        return {
          success: false,
          error: `Failed to create bucket: ${createError.message}`,
        };
      }
    } else {
      console.error('Error checking bucket:', error);
      return {
        success: false,
        error: `Failed to check bucket: ${error.message}`,
      };
    }
  }
}
