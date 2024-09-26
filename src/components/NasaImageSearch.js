import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "../style/NasaImageSearch.css";

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
    <div className="App">
      <h1>NASA Search</h1>
      <div className="search-container">
        <input
          className="text-black"
          type="text"
          placeholder="Search for stars, moon, mars, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to fetch data</p>}

      <div className="card-container text-black">
        {data.length
          ? data.map((item, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleCardClick(item)}
              >
                {item.links && item.links[0] ? (
                  <img
                    src={item.links[0].href}
                    alt={item.data[0]?.title || "NASA Image"}
                  />
                ) : (
                  <div className="placeholder">No Image Available</div>
                )}
                <h3>{item.data[0]?.title || "No Title"}</h3>
              </div>
            ))
          : "No data Found"}
      </div>
    </div>
  );
};

export default NasaImageSearch;
