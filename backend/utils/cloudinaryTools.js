const cloudinary = require("cloudinary").v2;
require("dotenv").config({
  path: "../.env",
});

const configureCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("connected to cloudinary");
  } catch (error) {
    console.log({ message: "cannot connect to cloudinary", error });
  }
};

const uploadFile = async (file, folder, limit) => {
  return await cloudinary.uploader.upload(file.tempFilePath, {
    folder: folder,
    resource_type: "auto",
  });
};

module.exports = {
  configureCloudinary,
  uploadFile,
};
