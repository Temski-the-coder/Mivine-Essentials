import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../Redux/Slices/productsSlice"


interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductClick?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, error, onProductClick }) => {
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/products/${product._id}`} className="block" onClick={() => onProductClick?.(product)}>
          <div className="bg-white rounded-lg p-4">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || "Product Image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name || "Product Name"}</h3>
            <p className="text-sm text-gray-600 font-medium tracking-tighter">₦{product.price || "Product Price"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
