import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const New_Arrive = ({ flashSaleData }) => {
  const content = {
    badgeText: "Today's",
    heading: "Flash Sales",
    ctaText: "Shop Now",
    ctaLink: "/product",
    products: [],
    ...(flashSaleData || {}),
  };

  const products = Array.isArray(content.products) ? content.products.slice(0, 4) : [];

  const fallbackCards = [
    { Product_name: "PlayStation 5" },
    { Product_name: "Women Collection" },
    { Product_name: "Speakers" },
    { Product_name: "Perfume" },
  ];

  const cards = fallbackCards.map((fallback, index) => ({
    ...fallback,
    ...(products[index] || {}),
  }));

  const getProductLink = (item) => (item?._id ? `/product/${item._id}` : content.ctaLink);

  const getBgStyle = (item) => {
    if (!item?.product_image_url) return undefined;
    return {
      backgroundImage: `url(${item.product_image_url})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="p-4 mt-4">
      <div className="flex flex-col gap-4 mx-2 sm:mx-3 mb-6">
        <div className="flex flex-col gap-3 sm:gap-5 pl-3 lg:pl-20 mb-6">
          {/* Header Section */}
          <div data-aos="fade-right">
          <div className="flex flex-row gap-2 sm:gap-3 items-center text-red-600 font-semibold text-base sm:text-lg">
            <span className="bg-red-600 px-2 py-1 rounded">A</span>
            {content.badgeText}
          </div>
          <div className="text-2xl sm:text-3xl font-medium">{content.heading}</div>
          </div>

          {/* Flash Sales Content */}
          <div data-aos="zoom-in" className="flex flex-col md:flex-row gap-3 h-auto md:h-[60vh] w-full">
            {/* Left Side */}
            <div
              className="bg-PS5 bg-black bg-center bg-no-repeat bg-contain text-start relative h-[250px] md:h-full flex-1"
              style={getBgStyle(cards[0])}
            >
              <div className="lg:absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
                  {cards[0].Product_name}
                </h3>
                <Link
                  to={getProductLink(cards[0])}
                  className="inline-block mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300"
                >
                  {content.ctaText}
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4 sm:gap-5 flex-1">
              {/* Top Box */}
              <div
                className="bg-black bg-WomenCollection bg-no-repeat bg-cover bg-left h-[125px] md:h-1/2 relative"
                style={getBgStyle(cards[1])}
              >
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-200">
                    {cards[1].Product_name}
                  </h3>

                  <Link
                    to={getProductLink(cards[1])}
                    className="inline-block mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300"
                  >
                    {content.ctaText}
                  </Link>
                </div>
              </div>

              {/* Bottom Boxes */}
              <div className="flex gap-2 sm:gap-3 h-[125px] md:h-1/2">
                {/* Left Bottom Box */}
                <div
                  className="bg-Speaker bg-black bg-contain bg-no-repeat bg-center w-1/2 relative"
                  style={getBgStyle(cards[2])}
                >
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-gray-200">
                      {cards[2].Product_name}
                    </h3>
                    <Link
                      to={getProductLink(cards[2])}
                      className="inline-block mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300"
                    >
                      {content.ctaText}
                    </Link>
                  </div>
                </div>
                {/* Right Bottom Box */}
                <div
                  className="bg-Perfume bg-black bg-contain bg-no-repeat bg-center w-1/2 relative"
                  style={getBgStyle(cards[3])}
                >
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-gray-200">
                      {cards[3].Product_name}
                    </h3>
 
                    <Link
                      to={getProductLink(cards[3])}
                      className="inline-block mt-3 text-gray-300 hover:text-white border-b border-transparent hover:border-gray-300 px-2 py-1 sm:px-3 sm:py-1 transition-all duration-300"
                    >
                      {content.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

New_Arrive.propTypes = {
  flashSaleData: PropTypes.shape({
    badgeText: PropTypes.string,
    heading: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default New_Arrive;
