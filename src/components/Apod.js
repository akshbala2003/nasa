import React from "react";
import { useQuery } from "@tanstack/react-query";
import "../style/Apod.css";

const fetchApod = async () => {
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=rg9PWyRZt0yYApTiOKfmaXkmMjwYHfAVNT2AsmnL"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const Apod = () => {
  const {
    data: apod,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["apod"],
    queryFn: fetchApod,
  });

  return (
    <div className="container">
      <h1>Astronomy Picture of the Day</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      {apod && (
        <div className="apod-content">
          <h2>{apod.title}</h2>
          <p className="apod-date">{apod.date}</p>
          <img src={apod.url} alt={apod.title} className="apod-image" />
          <p>{apod.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Apod;
