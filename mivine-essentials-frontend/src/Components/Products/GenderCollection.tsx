
import mensCollectionImg from "../../assets/mens-collection.webp";
import womensCollectionImg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-[500px] mx-auto">
          <img
            src={mensCollectionImg}
            alt="Men's Collection"
            className="w-full md:w-[500px] h-auto md:h-[500px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/40 p-4">
            <h2 className="text-2xl ">Men's Collection</h2>
            <Link to="/collections/all?gender=Men" className="text-gray-900 underline hover:text-blue-500">Shop Now</Link>
          </div>
        </div>


           <div className="relative w-full md:w-[500px] mx-auto">
          <img
            src={womensCollectionImg}
            alt="Women's Collection"
            className="w-full md:w-[500px] h-auto md:h-[500px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/40 p-4">
            <h2 className="text-2xl ">Women's Collection</h2>
            <Link to="/collections/all?gender=Women" className="text-gray-900 underline hover:text-blue-500">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollection;
