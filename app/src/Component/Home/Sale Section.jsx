import { useEffect, useState } from "react";
import OldCard from "./OldCard";
import { useAppStore } from "../../Store";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import PropTypes from "prop-types";

const Sale = ({ flashSaleData }) => {
  const { productData } = useAppStore();
  const [data, setData] = useState([]); // Initialize as an empty array

  const content = {
    badgeText: "Today's",
    heading: "Flash Sales",
    ctaText: "View All Products",
    ctaLink: "/product",
    products: [],
    ...(flashSaleData || {}),
  };

  useEffect(() => {
    if (Array.isArray(content.products) && content.products.length > 0) {
      setData(content.products);
      return;
    }

    const limitedData = productData.slice(0, Number(content.limit) || 5);
    setData(limitedData);
  }, [productData, content.products, content.limit]);

  return (
    <div className="p-4 mt-4">
      {/* Header Section */}
      <div
        data-aos="fade-right"
        className="flex flex-col pl-1 gap-5 mx-3 mb-[30px]"
      >
        <div className="flex flex-row gap-3 items-center text-lg font-semibold text-red-600">
          <span className="bg-red-600 px-2 rounded py-1">A</span>
          {content.badgeText}
        </div>
        <div className="text-2xl md:text-3xl lg:text-4xl font-medium">
          {content.heading}
        </div>
      </div>

      {/* Product Cards Section */}
      <div>
        {data.length === 0 ? (
          <div className="flex justify-center items-center h-[45vh]">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product, index) => (
              <div
                key={index}
                className="rounded-lg mb-6 mx-3 flex justify-center md:max-w-[250px] lg:max-w-[300px] w-full"
              >
                <OldCard data={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center mt-6">
        <Link
          to={content.ctaLink}
          className="bg-[#DB4444] hover:bg-[#E07575] text-white px-6 py-3 rounded transition-all duration-300"
        >
          {content.ctaText}
        </Link>
      </div>
    </div>
  );
};

Sale.propTypes = {
  flashSaleData: PropTypes.shape({
    badgeText: PropTypes.string,
    heading: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    limit: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Sale;
