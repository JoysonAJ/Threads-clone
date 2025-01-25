import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath,folderName) => {
  
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `Threads_clone_youtube/${folderName}`
    });
    
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    console.log('\n\n\n\n error is available',error,'\n\n\n\n');
    
    return null;
  }
};

export const removeFromCloudinary = async (public_id) => {
  
  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    return error;
  }
};
