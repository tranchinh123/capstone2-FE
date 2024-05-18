import axios from "axios";

export const handleUpload = async (selectedFile) => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('upload_preset', 'gpzpsw8q'); // replace with your preset
  formData.append('cloud_name', 'dxohjake1'); // replace with your cloud name

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dxohjake1/video/upload', // replace with your cloud name
      formData,
    );
    console.log('Upload successful:', response.data);
    return response.data;
    // Handle the response as needed
  } catch (error) {
    console.error('Error uploading the file:', error);
  }
};