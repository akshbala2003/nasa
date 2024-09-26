import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../style/Details.css";

const fetchImageDetails = async (href) => {
  const response = await fetch(href);
  if (!response.ok) {
    throw new Error("Failed to fetch image details");
  }
  const result = await response.json();

  const origImage = result.find((url) => url.endsWith("orig.jpg"));
  if (!origImage) {
    throw new Error("No high-resolution image found");
  }
  return origImage;
};

const Details = () => {
  const location = useLocation();
  const { item } = location.state;

  const {
    data: imageData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["imageDetails", item.href],
    queryFn: () => fetchImageDetails(item.href),
    retry: 1,
  });

  return (
    <div className="details-container flex gap-8 flex-col">
      <h1>{item.data[0]?.title}</h1>

      {isLoading && <p>Loading image...</p>}
      {error && <p>{error.message}</p>}
      {imageData && (
        <img
          src={imageData}
          alt={item.data[0]?.title}
          className="large-image"
        />
      )}

      <p>{`${item.data[0]?.description}`}</p>
      <p>Date Created: {item.data[0]?.date_created}</p>
    </div>
  );
};

export default Details;
