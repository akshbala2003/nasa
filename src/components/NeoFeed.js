import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { FaExclamationTriangle, FaLink } from "react-icons/fa";

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
    <div className="container mx-auto min-h-screen flex flex-col items-center  text-center space-y-8 px-4 py-8 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Near Earth Objects Feed
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col space-y-4">
          <label className="text-lg font-semibold text-gray-300">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100"
            placeholderText="Select Date"
          />
          <button
            type="submit"
            disabled={!selectedDate}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            Fetch Asteroids
          </button>
        </div>
      </form>

      {isLoading || isFetching ? (
        <p className="text-lg text-blue-400">Loading...</p>
      ) : null}
      {error && <p className="text-lg text-red-500">{error.message}</p>}

      <div className="w-full max-w-4xl space-y-6">
        {currentAsteroids.length > 0 ? (
          <>
            {currentAsteroids.map((asteroid) => (
              <div
                className="asteroid-card bg-gray-800 text-violet-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                key={asteroid.id}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {asteroid.name}
                  </h2>
                  {asteroid.is_potentially_hazardous_asteroid && (
                    <div className="flex items-center space-x-2 text-red-500">
                      <FaExclamationTriangle />
                      <span>Hazardous</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <p>
                    <strong className="text-gray-300">NASA JPL URL:</strong>{" "}
                    <a
                      href={asteroid.nasa_jpl_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline flex items-center space-x-1"
                    >
                      <FaLink />
                      <span>Link</span>
                    </a>
                  </p>
                  <p>
                    <strong className="text-gray-300">
                      Absolute Magnitude:
                    </strong>{" "}
                    {asteroid.absolute_magnitude_h}
                  </p>
                  <p>
                    <strong className="text-gray-300">
                      Estimated Diameter (km):
                    </strong>{" "}
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
                    <strong className="text-gray-300">
                      Close Approach Date:
                    </strong>{" "}
                    {asteroid.close_approach_data[0]?.close_approach_date}
                  </p>
                  <p>
                    <strong className="text-gray-300">Miss Distance (km):</strong>{" "}
                    {asteroid.close_approach_data[0]?.miss_distance.kilometers}
                  </p>
                  <p>
                    <strong className="text-gray-300">Relative Velocity (km/h):</strong>{" "}
                    {
                      asteroid.close_approach_data[0]?.relative_velocity
                        .kilometers_per_hour
                    }
                  </p>
                </div>
              </div>
            ))}

            <div className="pagination flex justify-between items-center space-x-4 mt-6">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          !isLoading && (
            <p className="text-lg text-gray-400">
              No asteroids found for the selected date.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default NeoFeed;
