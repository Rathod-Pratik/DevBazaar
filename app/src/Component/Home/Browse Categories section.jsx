import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_CATEGORY } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { getIconComponent } from "../../Utils/GetIcon";
import { useAppStore } from "../../Store";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate=useNavigate();
  const {setCategoryData,categoryData,setCategory}=useAppStore();
  const [loading,setLoading]=useState(false);
  const FetchCategory=async()=>{
    setLoading(true)
    try {
      const response=await apiClient.get(GET_CATEGORY);
      if(response.status===200){
        setCategoryData(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch Category")
    }finally{
      setLoading(false)
    }
  }
useEffect(()=>{
  FetchCategory()
},[])
  const BrowseByCategory=(name)=>{
    setCategory(name);
    return navigate('/Product')
  }

if (loading) return <div>Loading categories...</div>;

return (
  <div>
    <div data-aos="fade-right" className="flex flex-col gap-3 sm:gap-5 mx-2 sm:mx-3 my-2 sm:my-3">
      <div className="flex flex-row gap-2 sm:gap-3 text-base sm:text-lg font-semibold text-red-600">
        <span className="bg-red-600 px-2 py-1 rounded">A</span>
        Categories
      </div>
      <div className="text-2xl sm:text-3xl font-medium">Browse By Category</div>
    </div>
    <div className="flex flex-row justify-center flex-wrap gap-4 sm:gap-8">
      {categoryData && categoryData?.map((category, index) => (
        <div
        onClick={()=>BrowseByCategory(category.name)}
          data-aos="fade-down"
          key={index}
          className="border-black hover:bg-[#DB4444] hover:text-white hover:border-none p-3 sm:p-4 border-solid border-[1px] mx-2 sm:mx-3 my-2 w-[130px] h-[120px] sm:w-[170px] sm:h-[145px] gap-2 sm:gap-3 flex flex-col items-center justify-center transition-all duration-200"
        >
          <div className="text-3xl sm:text-4xl hover:text-white">
            {getIconComponent(category.iconName)}
          </div>
          <p className="text-sm sm:text-base">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
);
};

export default Categories;
