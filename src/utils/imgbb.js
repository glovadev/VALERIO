// ImgBB upload utility using environment variables
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadToImgBB = async (file) => {
  if (!IMGBB_API_KEY) {
    throw new Error("ImgBB API key is missing. Please set VITE_IMGBB_API_KEY in your environment.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to ImgBB");
  }

  const data = await response.json();

  // Extract the 100% full-resolution uncompressed original image URL
  const highResUrl = data.data.image?.url || data.data.url || data.data.display_url;

  return {
    url: highResUrl,
    displayUrl: highResUrl,
    deleteUrl: data.data.delete_url,
  };
};
