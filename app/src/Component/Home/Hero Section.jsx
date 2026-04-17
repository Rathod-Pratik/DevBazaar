import "swiper/css";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Hero = ({ heroData }) => {
  const content = {
    title: "Iphone 14 Pro Max",
    line1: "Up to 10%",
    line2: "off Voucher",
    buttonText: "Shop Now",
    buttonLink: "/product",
    imageUrl: "/hero.png",
    ...(heroData || {}),
  };

  return (
    <div className="mt-4 rounded-md">
    <div className="lg:min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-evenly p-4 md:p-6 lg:p-8 rounded-[10px] shadow-md bg-black text-white">
      {/* Product Details */}
      <div data-aos="fade-right" className="text-center md:text-left gap-4 flex flex-col items-center md:items-start">
        <h3 className="font-bold mb-4 text-white flex flex-row gap-3 items-center">
          <FaApple className="text-4xl" />
          <p className="text-2xl md:text-3xl lg:text-4xl">{content.title}</p>
        </h3>
        <p className="text-2xl md:text-4xl lg:text-6xl">{content.line1}</p>
        <p className="text-2xl md:text-4xl lg:text-6xl">{content.line2}</p>
        <Link
          to={content.buttonLink}
          className="p-3 border border-transparent flex gap-2 justify-center text-white hover:border hover:border-b-white w-[130px] transition-all duration-300"
          aria-label={content.buttonText}
        >
          {content.buttonText}
          <FaArrowRight className="self-center text-white transition-all" />
        </Link>
      </div>
      {/* Product Image */}
      <div className="flex justify-center" data-aos="fade-left">
        <img
          src={content.imageUrl}
          alt="Hero image showcasing product discount"
          className="object-cover rounded-lg w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </div>
    </div>
  </div>
  
  
  );
};

Hero.propTypes = {
  heroData: PropTypes.shape({
    title: PropTypes.string,
    line1: PropTypes.string,
    line2: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

export default Hero;
