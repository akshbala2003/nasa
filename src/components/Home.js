import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import "../style/Home.css";

const NASA_API_URL =
  "https://images-api.nasa.gov/search?q=galaxy&media_type=image";

const fetchImages = async () => {
  const response = await fetch(NASA_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await response.json();

  return data.collection.items.map((item) => item.links[0].href);
};

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: images = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nasaImages"],
    queryFn: fetchImages,
  });

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <div className="carousel-container relative">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        {error && <p>Error fetching images: {error.message}</p>}
        {images.length > 0 && (
          <div className="carousel-slide">
            <img
              src={images[currentIndex]}
              alt={`NASA Space ${currentIndex}`}
              className="carousel-image"
            />
          </div>
        )}
      </div>

      <section className="description">
        <h1>Welcome to NASA Image Gallery</h1>
        <p>
          Explore breathtaking images of the cosmos, planets, stars, and more.
          The gallery features images captured by NASA’s spacecraft, telescopes,
          and astronauts. Dive into the wonders of the universe with NASA’s most
          iconic and recent space imagery. Whether you're looking for celestial
          beauty or scientific data, our image gallery is a doorway to the
          stars.
        </p>
      </section>
    </div>
  );
};

export default Home;
