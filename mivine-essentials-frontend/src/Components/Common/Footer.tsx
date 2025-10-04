import { useRef, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaMeta, FaXTwitter } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { MdPhonelinkRing } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { FaArrowAltCircleRight } from "react-icons/fa";


const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleHomeButton = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add your logic to navigate to the home page
    navigate("/");
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    
    if (!form.current) return;

    setIsSubmitting(true);
    emailjs
      .sendForm(
        "service_n163bpn",
        "template_qyqpzy2",
        form.current!,
        "Giwir94S-ALfMoe0M"
      )
      .then(
        () => {
          setIsSubmitting(false);
          form.current?.reset();
          toast.success("Thank you for subscribing to our newsletter!", {duration: 1000});
        },
        (error) => {
          console.error("FAILED...", error);
          setIsSubmitting(false);
          toast.error("An error occurred. Please try again.", {duration: 1000});
        }
      );
  };
  return (
    <footer className="py-12">
      <div onSubmit={handleHomeButton} className="flex justify-center md:justify-center items-center mb-8 border-none w-50 md:w-fit px-0 md:px-8 lg:px-2 py-2 md:py-1 bg-black text-white mx-auto rounded-full">
        <button type="button" className="flex" onClick={handleHomeButton}>Back to home <FaArrowAltCircleRight className="mt-1.5 w-5 h-3.5"/></button>
      </div>


      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg-px-0 border-t py-12">
        <div className="space-y-6">
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="">
            Be the first to get updates about new arrivals, exclusive events and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600">
            Sign up and get 10% off your first order
          </p>

          {/* newsletter form */}
          <form onSubmit={handleSubmit} ref={form} className="flex h-11 space-y-3">
            <input
              type="email"
              placeholder="Be the first to know – drop your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-0.5 focus:ring-gray-400 transition-all"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-2 text-white hover:text-gray-300 bg-black rounded-r-md h-8"
            >
              {isSubmitting}
              <IoMdSend className="text-md" />
            </button>
          </form>
          {/* newsletter form */}
        </div>

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's Top wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's Top wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Children's Top wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's Bottom wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's Bottom wear
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Children's Bottom wear
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                About Us
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                FAQs
              </Link>
            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* follow us aspect */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-700"
            >
                <FaMeta className='w-4 h-4' />
            </a>

             <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-700"
            >
                <FaInstagram className='w-4 h-4' />
            </a>

             <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-700"
            >
                <FaXTwitter className='w-4 h-4' />
            </a>

            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-700"
            >
                <FaTiktok className='w-4 h-4' />
            </a>
          </div>
          <p className="text-gray-600">Call Us</p>
          <p className="items-center">
            <MdPhonelinkRing className="inline-block mr-2"/> +234-902-486-3242
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-600 text-sm tracking-tighter text-center">
            © 2025, Mike-the-coder. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
