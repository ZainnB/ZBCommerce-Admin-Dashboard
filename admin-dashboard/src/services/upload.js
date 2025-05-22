// This service handles file uploads for product images
// It supports both local storage and Cloudinary

// For Cloudinary uploads
const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset"; // Replace with your upload preset
const CLOUDINARY_CLOUD_NAME = "your_cloud_name"; // Replace with your cloud name
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

/**
 * Create a local URL for a file (for development)
 * @param {File} file - The file to create a URL for
 * @returns {string} - The local URL of the file
 */
export const createLocalFileUrl = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Upload a file (uses Cloudinary in production, local URL in development)
 * @param {File} file - The file to upload
 * @param {boolean} useCloudinary - Whether to use Cloudinary
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFile = async (file, useCloudinary = false) => {
  if (!file) return null;

  // For production, use Cloudinary
  if (useCloudinary) {
    return await uploadToCloudinary(file);
  }

  // For development, use local URL
  return createLocalFileUrl(file);
};
