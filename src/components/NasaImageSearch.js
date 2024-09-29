// NasaImageSearch.js (Add Tailwind classes)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const fetchNASAData = async (query) => {
  const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.collection.items;
};

const NasaImageSearch = () => {
  const [query, setQuery] = useState(localStorage.getItem("query") || "moon");
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["nasaImages", query],
    queryFn: () => fetchNASAData(query),
    enabled: false,
    initialData: () => JSON.parse(localStorage.getItem("results")) || [],
    onError: () => {
      console.log("Error fetching NASA data");
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("results", JSON.stringify(data));
      localStorage.setItem("query", query);
      setQuery(query);
    }
  }, [data, query]);

  const handleSearch = () => {
    refetch();
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/details`, { state: { item } });
  };

  return (
    <div className="nasa-search-page min-h-screen bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-8 text-blue-400">NASA Search</h1>

      <div className="search-container w-full max-w-md mb-12 flex gap-4">
        <input
          className="w-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Search for stars, moon, mars, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>

      {isLoading && <p className="text-xl animate-pulse">Loading...</p>}
      {error && <p className="text-red-400">Failed to fetch data</p>}

      <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mt-8">
        {data.length
          ? data.map((item, index) => (
              <div
                className="card bg-purple-700 hover:bg-purple-900 p-4 rounded-lg shadow-lg transition duration-300 ease-in-out cursor-pointer"
                key={index}
                onClick={() => handleCardClick(item)}
              >
                {item.links && item.links[0] ? (
                  <img
                    src={item.links[0].href}
                    alt={item.data[0]?.title || "NASA Image"}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="placeholder bg-gray-600 w-full h-64 rounded-md mb-4 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
                <h3 className="text-lg text-white">
                  {item.data[0]?.title || "No Title"}
                </h3>
              </div>
            ))
          : "No data Found"}
      </div>
    </div>
  );
};

export default NasaImageSearch;


