// const cloudinary = require("cloudinary").v2;

// exports.uploadImageToCloudinary = async (file, folder) => {
//   const options = { folder };

//   // Ensure the file is uploaded as a Base64 string
//   options.resource_type = "auto";  // auto-detects the type of file (e.g., image, video, etc.)

  

//   // Upload the Base64 string directly
//   return await cloudinary.uploader.upload(file, options);
// };
const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder) => {
  const options = {
    folder,
    resource_type: "auto",  // auto-detects the type of file (e.g., image, video, etc.)
    width: 300,
    height: 250,
    crop: "fill"  // Ensures the image is resized to fit within 300x200 with no distortion
  };

  // Upload the Base64 string directly
  return await cloudinary.uploader.upload(file, options);
};