import React, { useEffect, useState } from "react";

const Categories_section = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      // Function to calculate the remaining time
      const calculateTimeLeft = () => {
        const now = new Date(); // Current time
        const targetDate = new Date(); // Starting from now
        targetDate.setDate(targetDate.getDate() + 20); // Add 20 days
        targetDate.setHours(targetDate.getHours() + 23); // Add 23 hours
        targetDate.setMinutes(0); // Set minutes to 0
        targetDate.setSeconds(0); // Set seconds to 0
    
        const difference = targetDate - now; // Calculate difference in milliseconds
    
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // When the countdown ends
        }
      };
    
      // Run the calculation every second
      useEffect(() => {
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer); // Clear the interval when the component unmounts
      }, []);
    
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-black text-white p-4 md:p-8  md:min-h-[80vh] gap-8 md:gap-12">
    {/* Text Content */}
    <div data-aos="fade-right" className="flex flex-col justify-center text-start w-full md:w-1/2 p-4 space-y-6 md:space-y-8">
      <p className="text-[#00FF66] text-sm md:text-base font-semibold">Categories</p>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        Enhance Your <br className="hidden md:block" /> Music Experience
      </h1>
      
      {/* Timer Section */}
      <div className="flex flex-wrap gap-4 md:gap-6 justify-start">
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div key={unit} className="flex flex-col items-center bg-white text-black p-3 md:p-4 rounded-full w-14 h-14 md:w-20 md:h-20">
            <p className="text-base md:text-xl font-bold">{timeLeft[unit]}</p>
            <p className="text-[10px] md:text-xs uppercase mt-[-2px]">{unit}</p>
          </div>
        ))}
      </div>
  
      <button className="bg-[#00FF66] text-white px-6 py-3 rounded-lg w-fit text-sm md:text-base hover:bg-green-600 transition-colors mt-4">
        Buy Now
      </button>
    </div>
  
    {/* Image Section */}
    <div data-aos="fade-left" className="w-full md:w-1/2 flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl aspect-[1/1]">
        <img 
          src="/Frame 694.png" 
          alt="Music Experience" 
          className="w-full h-full object-contain object-center" 
        />
      </div>
    </div>
  </div>
  )
}

export default Categories_section
