import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGRmNzk0NjIwMGVmYTZkYWUyMjNlMzJmODJmMTViMCIsIm5iZiI6MTc1Nzk4MzQ5NC43NzQwMDAyLCJzdWIiOiI2OGM4YjMwNmJiYjkxNjRjMTMwYzExMDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v5ti217bQcLZGHrD_XTbH6X417W0IoPrse7kbUk5WDs", // Replace with secure method
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();
        const trailer = data.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (trailer) {
          setApiData(trailer);
        } else {
          setError("Trailer not available");
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError("Something went wrong");
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-arrow"
        onClick={() => navigate(-1)}
      />
      {error ? (
        <div className="error-message">{error}</div>
      ) : apiData ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>
              {new Date(apiData.published_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <div className="loading">Loading trailer...</div>
      )}
    </div>
  );
};

export default Player;
