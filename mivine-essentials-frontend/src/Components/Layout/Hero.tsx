import { useState, useEffect } from "react";
import download1 from "../../assets/download (1).jpg"
import download2 from "../../assets/download (2).jpg"
import premium1 from "../../assets/Modern Fashion Poster Design(Social Media post).jpg"
import premium3 from "../../assets/Download premium png 2.jpg"
import fashion1 from "../../assets/Fashion sale Facebook post template.jpg"
import face1 from "../../assets/Facebook Cover.jpg"
import ootd from "../../assets/OOTD.jpg"
import exclusive from "../../assets/exclusive men's wears.jpg"
import women from "../../assets/women dress.gif"
import womenFashion from "../../assets/women-fashion.jpg"
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const heroImages = [women, ootd, exclusive, download1, womenFashion, download2, premium1, premium3, fashion1, face1];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const interval = setInterval(() => {
      setSliding(true);
      setDirection(1); // always slide right for auto
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setSliding(false);
      }, 500); // slide duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-[400px] md:h-[400px] lg:h-[600px] relative">
        {heroImages.map((img, idx) => {
          let translate = "translate-x-full";
          let z = "z-0";
          if (idx === current) {
            translate = sliding ? "translate-x-0" : "translate-x-0";
            z = "z-10";
          } else if (
            idx === (current - 1 + heroImages.length) % heroImages.length &&
            sliding
          ) {
            translate =
              direction === 1 ? "-translate-x-full" : "translate-x-full";
            z = "z-0";
          }
          return (
            <img
              key={idx}
              src={img}
              alt={`hero-${idx}`}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-transform duration-500 ${translate} ${z}`}
              style={{
                transitionProperty: "transform",
              }}
            />
          );
        })}
        {/* Overlay text always visible and centered, with highest z-index */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none z-20">
          <div className="text-center text-white/85 p-6 mt-30 pointer-events-auto w-full">

            <p className="flex-col md:flex sm:mb-1 mt-22 hero-text items-center justify-center text-lg gap-2 text-gray-50 w-full">
              Your refined summer style awaits
              <FaLongArrowAltRight className="hidden md:visible"/>
              <Link
                to="/collections/all"
                className="bg-black text-white w-fit md:w-fit px-3 md:px-4 py-1 flex rounded-none md:rounded-2xl text-lg sm:text-sm justify-center items-center text-center md:justify-center hover:bg-black hover:text-white"
              >
                Shop Now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
