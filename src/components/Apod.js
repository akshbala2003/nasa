import React from "react";
import { useQuery } from "@tanstack/react-query";

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
  const { data: apod, error, isLoading } = useQuery({
    queryKey: ["apod"],
    queryFn: fetchApod,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-500">
        Astronomy Picture of the Day
      </h1>

      {isLoading && (
        <p className="text-lg animate-pulse text-gray-400">Loading...</p>
      )}
      {error && (
        <p className="text-lg text-red-500">Error:{error.message}</p>
      )}

      {apod && (
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-3xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">{apod.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{apod.date}</p>
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-auto rounded-lg mb-6 shadow-lg border border-indigo-500"
          />
          <p className="text-lg leading-relaxed text-gray-300">{apod.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Apod;
