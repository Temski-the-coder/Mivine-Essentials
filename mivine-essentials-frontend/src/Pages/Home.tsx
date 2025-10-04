import type { Product } from "../Redux/Slices/productsSlice";
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivals from '../Components/Products/NewArrivals'
import ProductGrid from '../Components/Products/ProductGrid'
import FeaturedCollections from '../Components/Products/FeaturedCollections'
import FeaturesSection from '../Components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../Redux/Store'
import { Typewriter } from "react-simple-typewriter";


import { useEffect } from 'react'
import { fetchProductsByFilters, fetchSimilarProducts, fetchBestSellerProduct, setBestSellerProduct } from '../Redux/Slices/productsSlice'



// // Base URL: proxy in dev, env var in prod
// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "" // proxy will handle `/api`
//     : import.meta.env.VITE_BACKEND_URL;
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menProducts, womenProducts, loading, error, bestSellerProduct } = useSelector((state: RootState) => state.products);

 useEffect(() => {
    // fetch best seller and products
    dispatch(fetchBestSellerProduct());
    dispatch(fetchProductsByFilters({ gender: 'Men', category: 'TopWear', limit: 8 }));
    dispatch(fetchProductsByFilters({ gender: 'Women', category: 'TopWear', limit: 8 }));
  }, [dispatch]);

  useEffect(() => {
  if (bestSellerProduct) {
    // use the best seller product to fetch similar products
    dispatch(fetchSimilarProducts({ id: bestSellerProduct._id }));
  }
}, [bestSellerProduct, dispatch]);
  return (
    <div>
        <Hero />
        <GenderCollection />
        <NewArrivals />

        {/* best seller */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
       {bestSellerProduct ? (
        <ProductGrid products={[bestSellerProduct]} loading={loading}
    error={error} onProductClick={(product) => dispatch(setBestSellerProduct(product))} />
      ) : (
          <p className="text-center">Loading best sellers<span className="animate-pulse"><Typewriter
              words={["..."]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            /></span></p>
        )}

        <div className='container max-w-6xl mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Wears For Men
          </h2>
          <ProductGrid products={menProducts} loading={loading} error={error} onProductClick={(product: Product) => dispatch(setBestSellerProduct(product))} />
        </div>

        <div className='container max-w-6xl mx-auto mt-15'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Wears For Women
          </h2>
          <ProductGrid products={womenProducts} loading={loading} error={error} onProductClick={(product) => dispatch(setBestSellerProduct(product))} />
        </div>

        <FeaturedCollections />

        <FeaturesSection />
    </div>
  )
}

export default Home