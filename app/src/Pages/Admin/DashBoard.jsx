import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_HOME_SECTION,
  GET_ALL_STATE,
  GET_ALL_REVIEW,
  GET_HOME_CONTENT_ADMIN,
  GET_PRODUCT_DATA,
  UPDATE_HOME_SECTION,
} from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const [stats, setStat] = useState(null);
  const [existingSections, setExistingSections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const [heroForm, setHeroForm] = useState({
    title: "",
    line1: "",
    line2: "",
    buttonText: "",
    buttonLink: "",
    imageUrl: "",
    productId: "",
  });

  const [categoriesForm, setCategoriesForm] = useState({
    tag: "",
    title: "",
    buttonText: "",
    buttonLink: "",
    imageUrl: "",
    countdownEndAt: "",
    productId: "",
  });

  const [flashSaleForm, setFlashSaleForm] = useState({
    badgeText: "",
    heading: "",
    ctaText: "",
    ctaLink: "",
    productIds: [],
    limit: 5,
  });

  const [featuredReviewForm, setFeaturedReviewForm] = useState({
    tag: "",
    title: "",
    reviewIds: [],
    limit: 4,
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState("hero");
  const [productSearch, setProductSearch] = useState("");
  const [tempFlashSelection, setTempFlashSelection] = useState([]);
  const [tempReviewSelection, setTempReviewSelection] = useState([]);

  const syncForms = (payload, sections = []) => {
    const data = payload || {};
    setExistingSections(sections);

    setHeroForm({
      title: data?.hero?.title || "",
      line1: data?.hero?.line1 || "",
      line2: data?.hero?.line2 || "",
      buttonText: data?.hero?.buttonText || "",
      buttonLink: data?.hero?.buttonLink || "",
      imageUrl: data?.hero?.imageUrl || "",
      productId: data?.hero?.productId || "",
    });

    setCategoriesForm({
      tag: data?.categoriesSection?.tag || "",
      title: data?.categoriesSection?.title || "",
      buttonText: data?.categoriesSection?.buttonText || "",
      buttonLink: data?.categoriesSection?.buttonLink || "",
      imageUrl: data?.categoriesSection?.imageUrl || "",
      countdownEndAt: data?.categoriesSection?.countdownEndAt || "",
      productId: data?.categoriesSection?.productId || "",
    });

    setFlashSaleForm({
      badgeText: data?.flashSale?.badgeText || "",
      heading: data?.flashSale?.heading || "",
      ctaText: data?.flashSale?.ctaText || "",
      ctaLink: data?.flashSale?.ctaLink || "",
      productIds: Array.isArray(data?.flashSale?.productIds)
        ? data.flashSale.productIds
        : [],
      limit: data?.flashSale?.limit || 5,
    });

    setFeaturedReviewForm({
      tag: data?.featuredReviews?.tag || "",
      title: data?.featuredReviews?.title || "",
      reviewIds: Array.isArray(data?.featuredReviews?.reviewIds)
        ? data.featuredReviews.reviewIds
        : [],
      limit: data?.featuredReviews?.limit || 4,
    });
  };

  const fetchStats = useCallback(async () => {
    try {
      const response = await apiClient.get(GET_ALL_STATE, { withCredentials: true });
      if (response.status === 200) {
        setStat(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Some error occurred");
    }
  }, [navigate]);

  const fetchHomeContent = useCallback(async () => {
    try {
      const response = await apiClient.get(GET_HOME_CONTENT_ADMIN, {
        withCredentials: true,
      });
      if (response.status === 200) {
        syncForms(response.data.data, response.data.existingSections || []);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to fetch home section content");
    }
  }, [navigate]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await apiClient.get(GET_PRODUCT_DATA);
      if (response.status === 200) {
        setAllProducts(response.data.Products || []);
      }
    } catch {
      toast.error("Failed to fetch products");
    }
  }, []);

  const fetchAllReviews = useCallback(async () => {
    try {
      const response = await apiClient.get(GET_ALL_REVIEW, { withCredentials: true });
      if (response.status === 200) {
        setAllReviews(response.data.Review || []);
      }
    } catch {
      toast.error("Failed to fetch reviews");
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchHomeContent();
    fetchAllProducts();
    fetchAllReviews();
  }, [fetchStats, fetchHomeContent, fetchAllProducts, fetchAllReviews]);

  const submitSection = async (sectionType, data) => {
    try {
      const exists = existingSections.includes(sectionType);
      const endpoint = exists
        ? `${UPDATE_HOME_SECTION}/${sectionType}`
        : CREATE_HOME_SECTION;
      const method = exists ? "put" : "post";
      const payload = exists ? { data } : { sectionType, data };

      const response = await apiClient[method](endpoint, payload, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(
          `${sectionType} section ${exists ? "updated" : "created"} successfully`,
        );
        fetchHomeContent();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error(`Failed to save ${sectionType} section`);
    }
  };

  const openPicker = (target) => {
    setPickerTarget(target);
    setProductSearch("");
    if (target === "flashSale") {
      setTempFlashSelection(flashSaleForm.productIds || []);
    }
    if (target === "featuredReviews") {
      setTempReviewSelection(featuredReviewForm.reviewIds || []);
    }
    setIsPickerOpen(true);
  };

  const closePicker = () => {
    setIsPickerOpen(false);
  };

  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase();
    if (!query) return allProducts;
    return allProducts.filter(
      (product) =>
        product.Product_name.toLowerCase().includes(query) ||
        String(product._id).toLowerCase().includes(query),
    );
  }, [allProducts, productSearch]);

  const selectedHeroProduct = allProducts.find((p) => p._id === heroForm.productId);
  const selectedCategoriesProduct = allProducts.find(
    (p) => p._id === categoriesForm.productId,
  );

  const handlePickSingleProduct = (product) => {
    if (pickerTarget === "hero") {
      setHeroForm((prev) => ({
        ...prev,
        productId: product._id,
        title: prev.title || product.Product_name,
        imageUrl: product.product_image_url,
        buttonLink: `/product/${product._id}`,
      }));
    }

    if (pickerTarget === "categories") {
      setCategoriesForm((prev) => ({
        ...prev,
        productId: product._id,
        imageUrl: product.product_image_url,
        buttonLink: `/product/${product._id}`,
      }));
    }

    closePicker();
  };

  const toggleFlashProduct = (productId) => {
    setTempFlashSelection((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const toggleFeaturedReview = (reviewId) => {
    setTempReviewSelection((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const applyFlashSelection = () => {
    setFlashSaleForm((prev) => ({ ...prev, productIds: tempFlashSelection }));
    closePicker();
  };

  const applyReviewSelection = () => {
    setFeaturedReviewForm((prev) => ({ ...prev, reviewIds: tempReviewSelection }));
    closePicker();
  };

  const selectedFlashProducts = allProducts.filter((product) =>
    flashSaleForm.productIds.includes(product._id),
  );

  const selectedFeaturedReviews = allReviews.filter((review) =>
    featuredReviewForm.reviewIds.includes(review._id),
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats ? (
          <>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500 mb-2">Total Payment</p>
              <h2 className="text-2xl font-bold text-green-600">₹ {stats.totalRevenue}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500 mb-2">Total Users</p>
              <h2 className="text-2xl font-bold text-blue-600">{stats.totalUsers}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500 mb-2">Total Order</p>
              <h2 className="text-2xl font-bold text-purple-600">{stats.order}</h2>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow text-center animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-28 mx-auto"></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-28 mx-auto"></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-28 mx-auto"></div>
            </div>
          </>
        )}
      </div>

      <div className="mt-12 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-5">Hero Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Top Greeting</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Hello! I Am"
                  value={heroForm.line1}
                  onChange={(e) => setHeroForm({ ...heroForm, line1: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Main Name</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Iphone 14 Pro Max"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Secondary Line</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="off Voucher"
                  value={heroForm.line2}
                  onChange={(e) => setHeroForm({ ...heroForm, line2: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Button Text</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Shop Now"
                  value={heroForm.buttonText}
                  onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                />
              </div>
              <button
                onClick={() => openPicker("hero")}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              >
                Select Product for Hero
              </button>
            </div>

            <div className="flex flex-col justify-between">
              <div className="border border-dashed border-gray-300 rounded-xl p-4 min-h-[280px] bg-gray-50 flex flex-col items-center justify-center gap-3">
                {heroForm.imageUrl ? (
                  <img
                    src={heroForm.imageUrl}
                    alt="Hero preview"
                    className="max-h-[220px] max-w-full object-contain rounded-md"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">No product selected</p>
                )}
                <p className="text-sm text-gray-600">
                  {selectedHeroProduct ? selectedHeroProduct.Product_name : "Select product to auto use image and detail route"}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => submitSection("hero", heroForm)}
                  className="bg-[#DB4444] text-white py-2 px-5 rounded-md"
                >
                  {existingSections.includes("hero") ? "Update Hero" : "Create Hero"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-5">Categories Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Tag</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Categories"
                  value={categoriesForm.tag}
                  onChange={(e) => setCategoriesForm({ ...categoriesForm, tag: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Title</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Enhance Your Music Experience"
                  value={categoriesForm.title}
                  onChange={(e) =>
                    setCategoriesForm({ ...categoriesForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Button Text</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Buy Now"
                  value={categoriesForm.buttonText}
                  onChange={(e) =>
                    setCategoriesForm({ ...categoriesForm, buttonText: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Countdown End</p>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  type="datetime-local"
                  value={categoriesForm.countdownEndAt}
                  onChange={(e) =>
                    setCategoriesForm({ ...categoriesForm, countdownEndAt: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => openPicker("categories")}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              >
                Select Product for Categories Section
              </button>
            </div>

            <div className="flex flex-col justify-between">
              <div className="border border-dashed border-gray-300 rounded-xl p-4 min-h-[280px] bg-gray-50 flex flex-col items-center justify-center gap-3">
                {categoriesForm.imageUrl ? (
                  <img
                    src={categoriesForm.imageUrl}
                    alt="Categories section preview"
                    className="max-h-[200px] max-w-full object-contain rounded-md"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">No product selected</p>
                )}
                <p className="text-sm text-gray-600">
                  {selectedCategoriesProduct
                    ? selectedCategoriesProduct.Product_name
                    : "Select product to auto use image and detail route"}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => submitSection("categoriesSection", categoriesForm)}
                  className="bg-[#DB4444] text-white py-2 px-5 rounded-md"
                >
                  {existingSections.includes("categoriesSection")
                    ? "Update Categories Section"
                    : "Create Categories Section"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-5">Flash Sale Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Badge Text"
                  value={flashSaleForm.badgeText}
                  onChange={(e) =>
                    setFlashSaleForm({ ...flashSaleForm, badgeText: e.target.value })
                  }
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Heading"
                  value={flashSaleForm.heading}
                  onChange={(e) =>
                    setFlashSaleForm({ ...flashSaleForm, heading: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="CTA Text"
                  value={flashSaleForm.ctaText}
                  onChange={(e) =>
                    setFlashSaleForm({ ...flashSaleForm, ctaText: e.target.value })
                  }
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="CTA Link"
                  value={flashSaleForm.ctaLink}
                  onChange={(e) =>
                    setFlashSaleForm({ ...flashSaleForm, ctaLink: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Products</p>
                <div className="flex flex-wrap gap-2 min-h-[42px]">
                  {selectedFlashProducts.length === 0 ? (
                    <span className="text-sm text-gray-500">No products selected</span>
                  ) : (
                    selectedFlashProducts.map((product) => (
                      <span
                        key={product._id}
                        className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700"
                      >
                        {product.Product_name}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <button
                onClick={() => openPicker("flashSale")}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              >
                Select Products for Flash Sale
              </button>
              <input
                className="w-full border border-gray-300 rounded-md p-2.5"
                type="number"
                min="1"
                placeholder="Fallback Limit"
                value={flashSaleForm.limit}
                onChange={(e) =>
                  setFlashSaleForm({ ...flashSaleForm, limit: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-col justify-between">
              <div className="border border-dashed border-gray-300 rounded-xl p-4 min-h-[280px] bg-gray-50 space-y-2">
                <p className="font-medium text-gray-800">Flash Sale Preview</p>
                <p className="text-sm text-gray-600">Badge: {flashSaleForm.badgeText || "-"}</p>
                <p className="text-sm text-gray-600">Heading: {flashSaleForm.heading || "-"}</p>
                <p className="text-sm text-gray-600">CTA: {flashSaleForm.ctaText || "-"}</p>
                <p className="text-sm text-gray-600">
                  Selected Product Count: {flashSaleForm.productIds.length}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => submitSection("flashSale", flashSaleForm)}
                  className="bg-[#DB4444] text-white py-2 px-5 rounded-md"
                >
                  {existingSections.includes("flashSale")
                    ? "Update Flash Sale"
                    : "Create Flash Sale"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-5">Featured Reviews Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Tag (e.g. Top Reviews)"
                  value={featuredReviewForm.tag}
                  onChange={(e) =>
                    setFeaturedReviewForm({ ...featuredReviewForm, tag: e.target.value })
                  }
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5"
                  placeholder="Title"
                  value={featuredReviewForm.title}
                  onChange={(e) =>
                    setFeaturedReviewForm({ ...featuredReviewForm, title: e.target.value })
                  }
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Reviews</p>
                <div className="flex flex-col gap-2 min-h-[42px]">
                  {selectedFeaturedReviews.length === 0 ? (
                    <span className="text-sm text-gray-500">No reviews selected</span>
                  ) : (
                    selectedFeaturedReviews.map((review) => (
                      <div
                        key={review._id}
                        className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-700"
                      >
                        <span className="font-semibold">{review?.UserInfo?.Name || review?.UserInfo?.name || "User"}</span>
                        {" - "}
                        {review.reviewStar}★
                        {" - "}
                        {review.reviewText}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => openPicker("featuredReviews")}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm"
              >
                Select Reviews for Home
              </button>

              <input
                className="w-full border border-gray-300 rounded-md p-2.5"
                type="number"
                min="1"
                placeholder="Fallback Limit"
                value={featuredReviewForm.limit}
                onChange={(e) =>
                  setFeaturedReviewForm({
                    ...featuredReviewForm,
                    limit: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex flex-col justify-between">
              <div className="border border-dashed border-gray-300 rounded-xl p-4 min-h-[280px] bg-gray-50 space-y-2">
                <p className="font-medium text-gray-800">Featured Reviews Preview</p>
                <p className="text-sm text-gray-600">Tag: {featuredReviewForm.tag || "-"}</p>
                <p className="text-sm text-gray-600">Title: {featuredReviewForm.title || "-"}</p>
                <p className="text-sm text-gray-600">
                  Selected Review Count: {featuredReviewForm.reviewIds.length}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => submitSection("featuredReviews", featuredReviewForm)}
                  className="bg-[#DB4444] text-white py-2 px-5 rounded-md"
                >
                  {existingSections.includes("featuredReviews")
                    ? "Update Featured Reviews"
                    : "Create Featured Reviews"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Amount (₹)</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Currency</th>
              <th className="p-3 border">Method</th>
              <th className="p-3 border">Refund Status</th>
              <th className="p-3 border">Contact No</th>
              <th className="p-3 border">Tax (₹)</th>
              <th className="p-3 border">Payment Time</th>
            </tr>
          </thead>
          <tbody>
            {stats ? (
              stats?.payments?.length > 0 ? (
                stats.payments.map((payment, index) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{payment.id}</td>
                    <td className="p-3 border">{payment.amount / 100}</td>
                    <td
                      className={`p-3 border ${payment.status === "captured" ? "text-green-600" : "text-red-600"}`}
                    >
                      {payment.status}
                    </td>
                    <td className="p-3 border">{payment.currency}</td>
                    <td className="p-3 border capitalize">{payment.method || "N/A"}</td>
                    <td className="p-3 border">{payment.refund_status || "No Refund"}</td>
                    <td className="p-3 border">{payment.contact || "N/A"}</td>
                    <td className="p-3 border">{payment.tax || 0}</td>
                    <td className="p-3 border">
                      {new Date(payment.created_at * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-3 border text-center text-gray-400">
                    No Transactions Found
                  </td>
                </tr>
              )
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {Array.from({ length: 10 }).map((__, colIndex) => (
                    <td key={colIndex} className="p-3 border">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-5 max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">
                {pickerTarget === "flashSale"
                  ? "Select Flash Sale Products"
                  : pickerTarget === "featuredReviews"
                    ? "Select Reviews for Home"
                    : "Select Product"}
              </h4>
              <button onClick={closePicker} className="text-gray-500 hover:text-gray-800">
                Close
              </button>
            </div>
            {pickerTarget === "featuredReviews" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
                  {allReviews.map((review) => {
                    const checked = tempReviewSelection.includes(review._id);
                    return (
                      <div
                        key={review._id}
                        className="border rounded-lg p-3 flex gap-3 items-start"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {review?.UserInfo?.Name || review?.UserInfo?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500">{review.reviewStar}★</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{review.reviewText}</p>
                          <p className="text-[10px] text-gray-400 truncate">{review._id}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFeaturedReview(review._id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <input
                  className="w-full border border-gray-300 rounded-md p-2.5 mb-4"
                  placeholder="Search product by name or id"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2">
                  {filteredProducts.map((product) => {
                    const checked = tempFlashSelection.includes(product._id);
                    return (
                      <div
                        key={product._id}
                        className="border rounded-lg p-3 flex gap-3 items-center"
                      >
                        <img
                          src={product.product_image_url}
                          alt={product.Product_name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.Product_name}</p>
                          <p className="text-xs text-gray-500 truncate">{product._id}</p>
                        </div>
                        {pickerTarget === "flashSale" ? (
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFlashProduct(product._id)}
                          />
                        ) : (
                          <button
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                            onClick={() => handlePickSingleProduct(product)}
                          >
                            Use
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {(pickerTarget === "flashSale" || pickerTarget === "featuredReviews") && (
              <div className="pt-4 mt-4 border-t flex justify-end gap-2">
                <button onClick={closePicker} className="px-4 py-2 rounded border">
                  Cancel
                </button>
                <button
                  onClick={pickerTarget === "flashSale" ? applyFlashSelection : applyReviewSelection}
                  className="px-4 py-2 rounded bg-[#DB4444] text-white"
                >
                  Apply Selection ({pickerTarget === "flashSale" ? tempFlashSelection.length : tempReviewSelection.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
