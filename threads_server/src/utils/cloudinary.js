import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  
  try {
    if (!localFilePath) {
      return null;
    }
    console.log('file is  there');

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Threads_clone_youtube/Profiles"
    });
    

    return response;
  } catch (error) {
    console.log('\n\n\n\n error is available',error,'\n\n\n\n');
    
    return null;
  }
};

export const removeFromCloudinary = async (user) => {
  
  try {
    const result = await cloudinary.uploader.destroy(user.public_id, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    return error;
  }
};
