"use client";

import React from "react";

const ImageUpload = ({ onChange }: { onChange: (url: string) => void }) => {
  const [image, setImage] = React.useState<File>();
  const [imageURL, setImageURL] = React.useState("");

  const handleImageUpload = async () => {
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await response.json();
        if (response.ok) {
          setImageURL(data.url);
          onChange(data.url);
        } else {
          console.error("Error uploading image:", data.error);
        }
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    };
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleImageUpload} className="p-2 bg-white text-black">
          Upload Image
        </button>
      </div>
      {imageURL && (
        <div>
          <h3>Image Uploaded Successfully:</h3>
          <img src={imageURL} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
