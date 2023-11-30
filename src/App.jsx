import React, { useState } from "react";
import axios from "axios";

const YoutubeVideo = () => {
  const [videoId, setVideoId] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  const extractVideoId = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);

    return match ? match[1] : null;
  };

  const handleInputChange = (e) => {
    const inputUrl = e.target.value;
    const extractedVideoId = extractVideoId(inputUrl);

    if (extractedVideoId) {
      setVideoId(extractedVideoId);
    } else {
      setVideoId("");
    }
  };

  const handleFetchData = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: videoId },
      headers: {
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
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
    if (videoData && videoData.link) {
      const link = document.createElement("a");
      link.href = videoData.link;
      link.download = "downloadedFile.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <body>
      <div className="login-container">
        <form className="login-form">
          <h1>YouTube Video Downloader</h1>
          <label>
            Video URL:
            <input
              type="text"
              value={videoId}
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
              <p>Link: {videoData.link}</p>
              <p>Title: {videoData.title}</p>
              <p>Filesize: {videoData.filesize}</p>
              <p>Progress: {videoData.progress}</p>
              <p>Duration: {videoData.duration}</p>
              <p>Status: {videoData.status}</p>
              <p>Message: {videoData.msg}</p>
              <button onClick={handleDownload} className="download-button">
                Download
              </button>
            </div>
          )}
        </form>
      </div>
    </body>
  );
};

export default YoutubeVideo;
