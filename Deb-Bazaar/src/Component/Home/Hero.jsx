import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
  const products = [
    {
      id: 1,
      image: "/public/mobile.png",
      name: "IQOO Z9 Lite",
      rating: 4.5,
      description:
        "Powered by Snapdragon 7 Gen 3 with 820K+ AnTuTu Score, 4nm TSMC Octa-core CPU architecture which gives you effortless multi-tasking experience and Adreno 720 Flagship GPU. Take your cinematic experience to the next level with 120Hz 3D Curved AMOLED display. The 4500 nits local peak brightness ensures outstanding visibility, even in direct sunlight. QOO Z9s Pro comes with 0.749cm Ultra Slim body with 5500mAh Battery.",
      price: "12,900₹",
    },
    {
      id: 2,
      image: "/public/Monitor.png",
      name: "Acer Nitro",
      rating: 4.7,
      description:
        "IPS Full HD Display - At 1920x1080 resolution, LG's Full HD IPS monitors feature vibrant color and visual clarity even at wide viewing angles. Work through your projects with ease and efficiency.100Hz Refresh Rate & 5ms(GTG) - With a 100Hz refresh rate and 5ms(GTG) response time, on screen visuals are rendered clearly for ultra-smooth motion and fluidity.",
      price: "8,000₹",
    },
    {
      id: 3,
      image: "/public/keyboard.png",
      name: "Mechanical Gaming Keyboard",
      rating: 4.8,
      description:
        "Sleek & Space-Saving Design: Experience the best of both worlds with a compact yet fully functional Mechanical keyboard design that maximizes desk space.Pro-Level Performance with Outemu Blue Switches: Elevate your gaming with the reliability of Outemu Blue switches.Vivid Aesthetics  25 anti-ghosting keys and a 1.5m braided cable, expect flawless execution and a dependable link for uninterrupted gameplay.",
      price: "1,500₹",
    },
    {
      id: 4,
      image: "/public/graphics_card.png",
      name: "NVIDIA GeForce RTX 3080",
      rating: 4.9,
      description:
        "Powerful GPU Engine: Features 2304 CUDA Cores for smooth graphics rendering and gaming performance. Achieve a Boost Clock up to 1485MHz with 1-Click OC using Xtreme Tuner Plus Software, enhancing responsiveness and speed.High-Speed Memory: Equipped with 6GB of GDDR6 memory and a Memory Speed of 14 Gbps. It utilizes a 96-bit Memory Interface, providing a Memory Bandwidth of 168 GB/sec for seamless multitasking and gaming.",
      price: "45,500₹",
    },
    {
      id: 5,
      image: "/public/laptop.png",
      name: "The Acer Nitro V15",
      rating: 4.6,
      description:
        "The Acer Nitro V15 is powered with the 13th Gen Intel Core i5 processor to take your gaming sessions to a whole new level. The Gen4 M.2 PCIe NVMe SSDs and up to 32 GB of DDR5 RAM enhance your visual experience and provide a smooth gaming experience. Its large 39.6 cm (15.6) screen allows you to immerse in your favourite visuals.",
      price: "49,000₹",
    },
    {
      id: 6,
      image: "/public/Headphones.png",
      name: "Noise Cancelling Headphones",
      rating: 4.4,
      description:
        "Blazing RGB LEDs with 6 Modes: Amp your audio corner with the striking design of the boAt Rockerz 480 Bluetooth Headphones. The blazing RGB LEDs on these headphones are integrated with 6 modes. Its 40 ms low latency eliminates pesky lag for a realistic feel.60 hours of Playback: Charge less and enjoy more with the massive playtime of these headphones.",
      price: "1,299₹",
    },
  ];

  return (
    <div>
  <Swiper
    spaceBetween={30}
    // loop={true} // Enables infinite scrolling
    pagination={{
      clickable: true, // Enables pagination dots
    }}
    modules={[Pagination, Autoplay]}
     autoplay={{
       delay: 5000, // Changes slide every 5 seconds (5000 ms)
       disableOnInteraction: false,
     }}
    className="mySwiper"
  >
    {products.map((product, index) => (
      <SwiperSlide key={product.id}>
        {/* Add even:bg-black here */}
        <div className={`flex items-center justify-center p-4 rounded-lg shadow-md h-[80vh] ${index % 2 === 1 ? 'bg-[#2c2525] text-white' : 'bg-white text-gray-800'}`}>
          {/* Product Details */}
          <div className="w-1/2 text-left flex flex-col">
            {/* Product Name */}
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>

            {/* Product Rating */}
            <p className="text-yellow-500 mb-2">
              ⭐ {product.rating.toFixed(1)} / 5
            </p>

            {/* Product Description */}
            <p className="text-base mb-4 text-start">{product.description}</p>

            {/* Product Price */}
            <p className="text-lg font-semibold">{product.price}</p>
            <div>
              <button className="p-3 border border-transparent flex justify-center my-2 mx-0 text-white bg-red-600 rounded-sm hover:bg-white hover:border-red-600 hover:border-3 transition-all hover:text-red-600">
                Shop Now
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-1/4 h-1/4 object-cover rounded-lg"
            />
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

  );
};

export default Hero;
