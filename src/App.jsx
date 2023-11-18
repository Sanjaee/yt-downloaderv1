import React, { useState } from "react";
import axios from "axios";

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDownload = async () => {
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/",
      params: {
        url: url,
      },
      headers: {
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host": "youtube-mp3-downloader2.p.rapidapi.com",
      },
      responseType: "json",
    };

    try {
      const response = await axios.request(options);

      // Assuming the API response structure contains the necessary information
      const result = {
        title: response.data.title,
        link: response.data.link,
        length: response.data.length,
        size: response.data.size,
      };

      setDownloadInfo(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    if (downloadInfo) {
      window.location.href = downloadInfo.link;
    }
  };

  return (
    <div className="container">
      <h1>YouTube Video Downloader</h1>
      <form>
        <label>
          YouTube URL limit 20 url:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <button onClick={handleDownload} disabled={loading}>
          {loading ? "Downloading..." : "Download"}
        </button>
      </form>

      {downloadInfo && (
        <div className="result">
          <h2>Download Information</h2>
          <div className="result-container">
            <p>Title: {downloadInfo.title}</p>
            <p>Length: {downloadInfo.length}</p>
            <p>Size: {downloadInfo.size}</p>
            <button onClick={handleRedirect}>Download Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloader;
