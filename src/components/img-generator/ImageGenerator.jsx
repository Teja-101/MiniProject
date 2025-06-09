import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import AI_Image from "../Assests/AI_Image.jpg";
const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const imageGeneration = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("prompt", inputRef.current.value);

    try {
      const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image generation failed");
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImage_url(imageObjectURL);
      setLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Check your prompt or API key.");
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span> Generator </span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? AI_Image : image_url} alt="Generated" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Describe your image..."
          ref={inputRef}
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGeneration();
          }}
        >
          Generate
        </div>
      </div>
      {image_url !== "/" && !loading && (
        <a
          href={image_url}
          download="ai-generated-image.jpg"
          className="download-btn"
        >
          Download Image   
        </a>
      )}
    </div>
  );
};

export default ImageGenerator;
