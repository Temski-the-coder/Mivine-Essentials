import { FaArrowsRotate } from 'react-icons/fa6';
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineCreditCard } from 'react-icons/md';

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 text-center'>
         {/* First Feature */}
         <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4'>
                <GiShoppingBag className='text-xl'/>
            </div>
            <h4 className='tracking-tighter mb-2'>FREE SHIPPING</h4>
            <p className='text-gray-600 text-sm tracking-tighter'>On all orders over $100</p>
         </div>

            {/* Second Feature */}
         <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4'>
                <FaArrowsRotate className='text-xl'/>
            </div>
            <h4 className='tracking-tighter mb-2'>45 DAYS RETURN</h4>
            <p className='text-gray-600 text-sm tracking-tighter'>Money Back Guarantee</p>
         </div>

            {/* Third Feature */}
         <div className='flex flex-col items-center'>
            <div className='p-4 rounded-full mb-4'>
                <MdOutlineCreditCard className='text-xl'/>
            </div>
            <h4 className='tracking-tighter mb-2'>SECURE PAYMENT</h4>
            <p className='text-gray-600 text-sm tracking-tighter'>100% Secure Payment Process</p>
         </div>
        </div>
        </section>
  )
}

export default FeaturesSection