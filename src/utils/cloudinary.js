import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  // Upload an image
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      }
    );
    console.log(response)
    // console.log("File Uploaded Successfully on cloudinary!",response.url);
    fs.unlink(localFilePath)
    return response;

  } catch (error) {
    fs.unlink(localFilePath) // remove the locally saved temporary file as upload operation got failed
    console.log(error);
    return null;
  }
};

export {uploadCloudinary}
