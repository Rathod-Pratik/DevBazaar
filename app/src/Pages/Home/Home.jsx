import React, { useEffect, useState } from "react";
import Hero from "../../Component/Home/Hero Section";
import Sale from "../../Component/Home/Sale Section";
import Categories from "../../Component/Home/Browse Categories section";
import BestSelling from "../../Component/Home/BestSelling";
import Categories_section from "../../Component/Home/Categories_section";
import Product from "../../Component/Home/Product Section";
import { apiClient } from "../../lib/api-Client";
import { GET_HOME_CONTENT } from "../../Utils/Constant";
import FlashSale from "../../Component/Home/New_Arrive";
import New_Arrive from "../../Component/Home/New_Arrive";

const Home = () => {
  const [homeContent, setHomeContent] = useState({
    hero: null,
    categoriesSection: null,
    flashSale: null,
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await apiClient.get(GET_HOME_CONTENT);
        if (response.status === 200) {
          setHomeContent(response.data.data || {});
        }
      } catch (error) {
        console.log("Failed to fetch home content", error);
      }
    };

    fetchHomeContent();
  }, []);

  return (
    <div className="flex flex-col gap-7 m-auto w-[90%] overflow-hidden">
      <Hero heroData={homeContent.hero} />
      <hr className="w-[90%] m-auto" />
      <Categories />
      <hr className="w-[90%] m-auto" />
      <BestSelling />
      <Categories_section sectionData={homeContent.categoriesSection} />
      <Product />
      <New_Arrive flashSaleData={homeContent.flashSale} />
    </div>
  );
};

export default Home;
