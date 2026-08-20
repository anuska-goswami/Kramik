import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

/**
 * Upload an image buffer to Cloudinary
 */
export const uploadToCloudinary = (fileBuffer, folder = 'kramik/profile_pictures') => {
  return new Promise((resolve, reject) => {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

    if (!isCloudinaryConfigured) {
      // Development / Testing fallback: generate a data URI
      const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;
      const mockPublicId = `mock_profile_${Date.now()}`;
      return resolve({
        secure_url: base64Image,
        public_id: mockPublicId
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete an asset from Cloudinary by public ID
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('mock_profile_')) {
    return true;
  }

  try {
    const isCloudinaryConfigured =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (isCloudinaryConfigured) {
      await cloudinary.uploader.destroy(publicId);
    }
    return true;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return false;
  }
};
