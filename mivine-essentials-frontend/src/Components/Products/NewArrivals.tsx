import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Base URL: proxy in dev, env var in prod
const baseURL =
  import.meta.env.MODE === "development"
    ? "" // proxy will handle `/api`
    : import.meta.env.VITE_BACKEND_URL;

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // Fetch new arrivals from the backend API
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/products/new-arrivals`);
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, [baseURL]);

  const handleMouseDown = (e: { pageX: number; }) => {
    setIsScrolling(true);
    if (scrollRef.current) {
      setScrollPosition(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isScrolling || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - scrollPosition) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: string) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="w-full max-w-6xl mx-auto text-center mb-10 relative">
        <h1 className="text-3xl font-bold mb-4">Explore New Arrivals</h1>
        <p className="text-lg text-gray-600 mb-8">
          Check out the latest additions to our collection to find your perfect
          fit for the summer!
        </p>

        {/* Scroll Button */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 mx-auto w-full md:w-[100px]">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`bg-white text-black rounded-full border ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoIosArrowDropleftCircle className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`bg-white text-black rounded-full border ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoIosArrowDroprightCircle className="text-2xl" />
          </button>
        </div>
      </div>

      {/* scrollable content */}
      <div ref={scrollRef} className={`w-full max-w-6xl mx-auto overflow-x-auto ${isScrolling ? "cursor-grabbing" : "cursor-grab"}`}>
        <div
          className="flex space-x-6 py-2"
          onMouseUp={handleMouseUpOrLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div key={product._id} className="relative w-72 flex-shrink-0">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.alt || product.name}
                  className="w-full h-full object-cover rounded-lg"
                  draggable="false"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 text-white bg-black/50 backdrop-blur-md p-4 rounded-b-lg">
                <Link to={`/products/${product._id}`} className="block">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-300">₦{product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
