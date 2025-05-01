import React, { useEffect, useState } from "react";
import { useAppStore } from "../../Store";
import ProductCard from "../../Component/Home/ProductCard";

const Product = () => {
  const { productData, category, setCategory, categoryData } = useAppStore();
  const [filteredProducts, setFilteredProducts] = useState(productData || []);

  useEffect(() => {
    if (!productData) return;
    
    if (!category || category === "all") {
      setFilteredProducts(productData);
    } else {
      const filtered = productData.filter(
        (item) => item.category === category
      );
      setFilteredProducts(filtered);
    }
  }, [category, productData]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter Dropdown */}
      <div className="mb-8">
        <label htmlFor="category-select" className="block mb-2 font-medium">
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={category || "all"}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md w-full md:w-64"
        >
          <option value="all">All Categories</option>
          {categoryData?.map((item) => (
            <option key={item._id} onClick={()=>setCategory(item.name)} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="flex justify-center">
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default Product;