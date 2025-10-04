import { Link } from 'react-router-dom'
import Featured from '../../assets/featured.webp'

const FeaturedCollections = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-100 rounded-3xl'>
        {/* left content */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
          <h1 className='text-lg font-bold text-gray-800 mb-2'>Featured Collections</h1>
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Discover our exclusive collections that redefine style and comfort.
          </h2>
          <p className='text-gray-600 mb-6 text-lg'>
            Explore the latest trends and timeless classics in our featured collections.
          </p>
          <Link to="/collections/all" className='bg-gray-900 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700'>
            Shop Now
          </Link>
        </div>

        {/* right content */}
        <div className='lg:w-1/2'>
          <img src={Featured} alt="Featured Collection" className='w-full h-auto object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections