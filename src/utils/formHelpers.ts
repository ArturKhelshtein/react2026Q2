export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image"));
      }
    };
    reader.onerror = () => {
        reject(new Error("FileReader error"));
    };
    reader.readAsDataURL(file);
  });
};

export const validateImage = (file: File): string | null => {
  const validTypes = ["image/png", "image/jpeg"];
  if (!validTypes.includes(file.type)) {
    return "Only PNG and JPEG images are allowed";
  }
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Image must be smaller than 2MB";
  }
  return null;
};
