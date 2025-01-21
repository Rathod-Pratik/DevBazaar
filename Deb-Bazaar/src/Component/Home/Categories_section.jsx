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
    <div className="grid grid-cols-2 mt-4 h-[80vh] bg-black text-white p-4">
      <div className="flex gap-2 flex-col justify-center text-start p-4">
        <p className="text-[#00FF66] text-[16px] font-semibold ">Categories</p>
            <p className="text-[65px] font-semibold">Enhance Your<br />Music Experience</p>
        <div className="flex gap-6 mt-4">
      <div className="box bg-white text-black p-4 rounded-full w-[62px] h-[62px] text-center">
        <p className="text-[16px] font-bold">{timeLeft.days}</p>
        <p className="text-[11px] flex items-center justify-center" >Days</p>
      </div>
      <div className="box bg-white text-black p-4 rounded-full w-[62px] h-[62px] text-center">
        <p className="text-[16px] font-bold">{timeLeft.hours}</p>
        <p className="text-[11px] flex items-center justify-center" >Hours</p>
      </div>
      <div className="box bg-white text-black p-4 rounded-full w-[62px] h-[62px] text-center">
        <p className="text-[16px] font-bold">{timeLeft.minutes}</p>
        <p className="text-[11px] flex items-center justify-center" >Minutes</p>
      </div>
      <div className="box bg-white text-black p-4 rounded-full w-[62px] h-[62px] text-center">
        <p className="text-[16px] font-bold">{timeLeft.seconds}</p>
        <p className="text-[11px] flex items-center justify-center" >Seconds</p>
      </div>
    </div >
        <button className="bg-[#00FF66] text-white mx-3 my-4 w-[120px] h-[40px] rounded-[5px] ">Buy Now</button>
      </div>
      <div className="flex items-center justify-center backdrop-blur-lg p-4">
  <img src="/public/Frame 694.png" alt="" />
</div>
    </div>
  )
}

export default Categories_section
