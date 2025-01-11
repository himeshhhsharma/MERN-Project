import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    // file clodinary pr upload nhi hui hai, but uss ke pehle wo server pr to hai hi
    fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
