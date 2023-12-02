import React, { useState } from "react";
import axios from "axios";

const YoutubeVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleFetchData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const apiEndpoint =
      "https://youtube-mp3-download-highest-quality1.p.rapidapi.com/ytmp3/ytmp3/custom/";

    const options = {
      method: "GET",
      url: apiEndpoint,
      params: { url: videoUrl, quality: "128" }, // Set quality to 128 by default
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
    }
  };

  const handleDownload = () => {
    if (videoData && videoData.links && videoData.links.length > 0) {
      const highestQualityLink = videoData.links[0].url; // Assuming the array is sorted by quality

      // Open the link in a new tab/window
      window.open(highestQualityLink, "_blank");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>YouTube Video Downloader</h1>
        <label>
          Video URL:
          <input
            type="text"
            value={videoUrl}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter YouTube Video URL"
          />
        </label>
        <button onClick={handleFetchData} className="submit-button">
          Generate
        </button>

        {error && <p className="error-message">{error}</p>}

        {videoData && (
          <div className="result-container">
            <h2>Result</h2>
            <p>Title: {videoData.title}</p>
            {/* Display the link as a clickable anchor */}
            <p>
              Link:{" "}
              <a
                href={videoData.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </p>
            <p>Length: {videoData.length}</p>
            <p>Size: {videoData.size}</p>
            {/* Remove the separate "Download" button */}
          </div>
        )}
      </form>
    </div>
  );
};

export default YoutubeVideo;
