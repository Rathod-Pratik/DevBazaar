import React from 'react'
import Hero from '../../Component/Home/Hero Section'
import Sale from '../../Component/Home/Sale Section'
import Categories from '../../Component/Home/Browse Categories section'
import BestSelling from '../../Component/Home/BestSelling'
import Categories_section from '../../Component/Home/Categories_section'
import Product from '../../Component/Home/Product Section'
import New_Arrive from '../../Component/Home/New_Arrive'

const Home = () => {
  return (
    <div className='flex flex-col gap-7 m-auto w-[90%] overflow-auto'>
      <Hero/>
      <Sale/>
      <hr className='w-[90%] m-auto' />
      <Categories/>
      <hr className='w-[90%] m-auto' />
      <BestSelling/>
      <Categories_section/>
      <Product/>
      <New_Arrive/>
    </div>
  )
}

export default Home
