import React from 'react'
import Hero from '../../Component/Home/Hero'
import Sale from '../../Component/Home/Sale'

const Home = () => {
  return (
    <div className='flex flex-col gap-5 w-[80vw] m-auto'>
      <Hero/>
      <Sale/>
    </div>
  )
}

export default Home
