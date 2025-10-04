import { FaPhoneVolume, FaShippingFast } from "react-icons/fa";
import { FaInstagram, FaMeta, FaXTwitter } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";

const TopBar = () => {
  return (
    <div className="bg-[#E67300] w-full text-white p-2">
      <div className="w-full md:w-full mx-auto flex justify-between md:justify-around items-center text-center">
        <div className="hidden md:flex items-center space-x-7 text-xs md:text-md">
          <a href="#" className="hover:text-gray-300">
            <FaMeta className="w-4 h-4" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <FaXTwitter className="w-4 h-4" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <FaInstagram className="w-4 h-4" />
          </a>
        </div>

        <div className="text-md md:text-sm text-center text-white flex md:flex w-full md:w-100 gap-2 md:gap-0">
          <h1 className="flex">
            <Typewriter
              words={["We ship WorldWide - Fast and reliable shipping!"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
            <p className="mt-1 md:mt-1">
              <FaShippingFast className=" md:-ml-0" />
            </p>
          </h1>
        </div>

        <div className="hidden md:flex text-xs md:text-sm">
          <a href="tel:+2349024863242" className="hover:text-gray-300">
            <h2 className="flex">
              <FaPhoneVolume className="mt-0.5" />
              <span>+234-902-486-3242</span>
            </h2>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
