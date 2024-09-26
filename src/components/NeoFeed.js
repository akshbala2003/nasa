import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import "../style/NeoFeed.css";

const apiKey = "rg9PWyRZt0yYApTiOKfmaXkmMjwYHfAVNT2AsmnL";

const fetchAsteroids = async (selectedDate) => {
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return Object.values(data.near_earth_objects).flat();
};

function NeoFeed() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: asteroids = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["asteroids", selectedDate],
    queryFn: () => fetchAsteroids(selectedDate),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      refetch();
    }
  };

  const indexOfLastAsteroid = currentPage * pageSize;
  const indexOfFirstAsteroid = indexOfLastAsteroid - pageSize;
  const currentAsteroids = asteroids.slice(
    indexOfFirstAsteroid,
    indexOfLastAsteroid
  );
  const totalPages = Math.ceil(asteroids.length / pageSize);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      <h1>Near Earth Objects Feed</h1>
      <form onSubmit={handleSubmit}>
        <div className="date-picker-container">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
            placeholderText="Select Date"
          />
        </div>
        <button type="submit" disabled={!selectedDate}>
          Fetch Asteroids
        </button>
      </form>

      {isLoading || isFetching ? <p>Loading...</p> : null}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <div>
        {currentAsteroids.length > 0 ? (
          <>
            {currentAsteroids.map((asteroid) => (
              <div className="asteroid-card" key={asteroid.id}>
                <p>
                  <strong>Name:</strong> {asteroid.name}
                </p>
                <p>
                  <strong>NASA JPL URL:</strong>{" "}
                  <a
                    href={asteroid.nasa_jpl_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {asteroid.nasa_jpl_url}
                  </a>
                </p>
                <p>
                  <strong>Absolute Magnitude:</strong>{" "}
                  {asteroid.absolute_magnitude_h}
                </p>
                <p>
                  <strong>Estimated Diameter (km):</strong>{" "}
                  {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                    3
                  )}{" "}
                  -{" "}
                  {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                    3
                  )}{" "}
                  km
                </p>
                <p>
                  <strong>Is Potentially Hazardous:</strong>{" "}
                  {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Close Approach Date:</strong>{" "}
                  {asteroid.close_approach_data[0]?.close_approach_date}
                </p>
                <p>
                  <strong>Miss Distance (km):</strong>{" "}
                  {asteroid.close_approach_data[0]?.miss_distance.kilometers}
                </p>
                <p>
                  <strong>Relative Velocity (km/h):</strong>{" "}
                  {
                    asteroid.close_approach_data[0]?.relative_velocity
                      .kilometers_per_hour
                  }
                </p>
              </div>
            ))}

            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          !isLoading && <p>No asteroids found for the selected date.</p>
        )}
      </div>
    </div>
  );
}

export default NeoFeed;
