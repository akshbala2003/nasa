import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
    <div className="details-container flex flex-col gap-8 p-8 max-w-5xl mx-auto text-gray-100 bg-black bg-opacity-90 rounded-lg shadow-2xl relative">
      <h1 className="text-4xl font-semibold glow-text">{item.data[0]?.title}</h1>

      {isLoading && <p className="text-lg text-blue-400 glow-text">Loading image...</p>}
      {error && <p className="text-lg text-red-500 glow-text">{error.message}</p>}

      {imageData && (
        <div className="relative overflow-hidden">
          <img
            src={imageData}
            alt={item.data[0]?.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px] glow-image"
          />
        </div>
      )}

      <p className="text-lg leading-relaxed glow-text">{item.data[0]?.description}</p>
      <p className="text-sm text-gray-400 glow-text">Date Created: {item.data[0]?.date_created}</p>
    </div>
  );
};

export default Details;
