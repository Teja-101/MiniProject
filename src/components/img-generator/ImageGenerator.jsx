import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageGenerator.css';
import AI_Image from '../Assests/AI_Image.jpg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  // Logout and redirect
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Redirect to login
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Main image generation logic
  const imageGeneration = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (inputRef.current.value.trim() === "") return;

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

      if (!response.ok) throw new Error("Image generation failed");

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImage_url(imageObjectURL);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Check your prompt or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='ai-image-generator'>
      {/* Top-right Login/Logout Button */}
      <div className="top-bar">
        {isLoggedIn ? (
          <button className="top-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="top-btn" onClick={handleLoginRedirect}>Login</button>
        )}
      </div>

      <div className="header">AI Image <span>Generator</span></div>

      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? AI_Image : image_url} alt="Generated" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Describe your image..."
          ref={inputRef}
        />
        <div className="generate-btn" onClick={imageGeneration}>Generate</div>
      </div>

      {image_url !== "/" && !loading && (
        <a
          href={image_url}
          download="ai-generated-image.jpg"
          className="download-btn"
        >
          Download Image
        </a>
      )}
    </div>
  );
};

export default ImageGenerator;
