import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../Redux/Slices/productsSlice";
import type { AppDispatch, RootState } from "../../Redux/Store";
import { addToCart } from "../../Redux/Slices/cartSlice";
import { Typewriter } from "react-simple-typewriter";

interface ProductDetailsProps {
  productId?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state: RootState) => state.products
  );

  const { user, guestId } = useSelector((state: RootState) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to Cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        name: selectedProduct.name,
        productId: productFetchId!,
        price: selectedProduct.price,
        quantity,
        image: mainImage,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
        guestId,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully!", { duration: 1000 });
      })
      .finally(() => {
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 1000);
      });
  };

  if (loading) {
    return (
      <p className="text-center">
        Loading product details
        <span className="animate-pulse">
          <Typewriter
            words={["..."]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {String(error)}</p>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `thumbnail ${index}`}
                  className={`w-32 h-32 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt={selectedProduct.images?.[0]?.altText || "Main Product Image"}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `thumbnail ${index}`}
                  className={`w-32 h-32 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Right details */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl font-bold mb-2">{selectedProduct.name}</h1>
              <p className="text-lg text-gray-700 mb-4 gap-2">
                ₦{selectedProduct.discountPrice}{" "}
                <span className="line-through text-gray-500">
                  ₦{selectedProduct.price}
                </span>
              </p>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold">Brand:</h3>
                <p>{selectedProduct.brand}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold">Material:</h3>
                <p>{selectedProduct.material}</p>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <h3 className="font-semibold">Sizes:</h3>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 rounded border ${
                        selectedSize === size
                          ? "border-blue-500 bg-black text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-4">
                <h3 className="font-semibold">Colors:</h3>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors?.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${
                        selectedColor === color
                          ? "ring-2 ring-blue-500"
                          : "ring-2 ring-gray-500"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.8)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-800">Quantity</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black w-full text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "Add To Cart"}
              </button>
            </div>
          </div>

          {/* Similar products */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={false}
              error={""}
              onProductClick={(product) => {
                dispatch(fetchProductDetails(product._id));
                dispatch(fetchSimilarProducts({ id: product._id }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

