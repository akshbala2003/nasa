import React, { useState, useEffect } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../style/Carousel.css";

import { BsClipboardData } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { FaSatellite } from "react-icons/fa";
import { FiArrowRight, FiSun, FiMoon, FiStar } from "react-icons/fi";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/earth.json")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="app-container">
      <div className="carousel-section">
        <ResponsiveCarousel
          showThumbs={true}
          selectedItem={0}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
          swipeable={true}
          className="carousel-root"
        >
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="carousel-item">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
              </div>
            ))}
        </ResponsiveCarousel>
      </div>

      <>
        <div className="mb-4 rounded-lg lg:mb-0">
          <div className="bg-gray-900 rounded-lg  aspect-w-6 aspect-h-6 animate-pulse" />
          <div className="h-20 my-4 bg-gray-900 rounded-lg  animate-pulse" />
        </div>
        <div className="-mx-4 -mb-4 bg-black rounded-lg  sm:border sm:border-gray-700 data-container sm:-mx-0 sm:-mb-0">
          <div className="relative pt-2">
            <div className="flex items-center justify-between p-2 text-xl bg-opacity-50 rounded-t-lg text-primary-light"></div>
            <div className="p-4 text-center">
              <h2 className="flex items-center justify-center pb-2 text-2xl text-blue-300 font-bold glow">
                <BsClipboardData className="mr-2 text-purple-500" />  Image Data
              </h2>
              <p className="pb-4 text-lg text-gray-300">
                This image was taken by NASA's EPIC camera onboard the NOAA
                DSCOVR spacecraft.
              </p>
              <div className="grid grid-cols-2 grid-rows-3">
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <GiEarthAmerica className="mr-3" />
                    <FiArrowRight className="mr-3" />
                    <FiSun />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">Earth to Sun</h3>
                  <div className="w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    150,032,442 km
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <GiEarthAmerica className="mr-3" />
                    <FiArrowRight className="mr-3" />
                    <FiMoon />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">Earth to Moon</h3>
                  <div className="w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    384,634 km
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <FaSatellite className="mr-3" />
                    <FiArrowRight className="mr-3" />
                    <FiSun />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">EPIC to Sun</h3>
                  <div className="w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    148,480,473 km
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <FaSatellite className="mr-3" />
                    <FiArrowRight className="mr-3" />
                    <FiMoon />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">EPIC to Moon</h3>
                  <div className="w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    1,628,959 km
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <GiEarthAmerica className="mr-3" />
                    <FiArrowRight className="mr-3" />
                    <FaSatellite />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">Earth to EPIC</h3>
                  <div className="w-32 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    1,566,797 km
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex justify-center pb-1 text-xl text-primary">
                    <FiSun className="mr-3" />
                    <GiEarthAmerica className="mr-3" />
                    <FaSatellite />
                  </div>
                  <h3 className="pb-1 text-lg font-bold text-purple-500">SEV Angle</h3>
                  <div className="w-16 h-5 mx-auto mt-1 bg-gray-900 rounded animate-pulse">
                    7.85°
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="flex items-center justify-center pb-2 text-2xl font-bold glow">
                  <FiStar className="mr-2 text-primary text-purple-500" /> Notable Events
                </h2>
                <ul className="pl-2 text-lg list-disc list-inside">
                  <li className="text-primary-light">
                    Saharan Dust Storm 2020
                  </li>
                  <li className="text-primary-light">
                    Total Solar Eclipse 2017
                  </li>
                  <li className="text-primary-light">
                    Annular Solar Eclipse 2017
                  </li>
                  <li className="text-primary-light">Solar Eclipse 2016</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Carousel;
