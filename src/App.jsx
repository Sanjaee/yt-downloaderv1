// YoutubeVideo.js
import React, { useState } from "react";
import axios from "axios";

const YoutubeVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clearInput, setClearInput] = useState(false);

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
    setClearInput(false);
  };

  const handleClearInput = () => {
    setVideoUrl("");
    setClearInput(true);
  };

  const handleFetchData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiEndpoint =
      "https://youtube-mp3-download-highest-quality1.p.rapidapi.com/ytmp3/ytmp3/custom/";

    const options = {
      method: "GET",
      url: apiEndpoint,
      params: { url: videoUrl, quality: "128" },
      headers: {
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host":
          "youtube-mp3-download-highest-quality1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setVideoData(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error fetching video data");
      setVideoData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (videoData && videoData.links && videoData.links.length > 0) {
      const highestQualityLink = videoData.links[0].url;
      window.open(highestQualityLink, "_blank");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>YouTube Video Downloader</h1>
        <label>
          Video URL:
          <div className="input-container">
            <input
              type="text"
              value={videoUrl}
              onChange={handleInputChange}
              className={`input-field ${clearInput ? "cleared" : ""}`}
              placeholder="Enter YouTube Video URL"
            />
            {videoUrl && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClearInput}
              >
                X
              </button>
            )}
          </div>
        </label>
        <button onClick={handleFetchData} className="submit-button">
          Generate
        </button>

        {loading && <p className="loading-message">Loading...</p>}

        {error && <p className="error-message">{error}</p>}

        {videoData && (
          <div className="result-container">
            <h2>Hasil</h2>
            <h4>Judul: {videoData.title}</h4>
            <p>
              <a
                href={videoData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="download-button"
                onClick={handleDownload}
              >
                Download
              </a>
            </p>
            <p>Size: {videoData.size}</p>
          </div>
        )}
        <h4>Support Me: </h4>
        <div className="social-icons">
          <a href="https://www.instagram.com/ahmdafriz4/">
            <img src="instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/">
            <img src="linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default YoutubeVideo;
