export const createCategorySlice = (set) => ({
    categoryData: [],
    category: undefined,
    
    setCategoryData: (categoryData) => {
      if (!Array.isArray(categoryData)) {
        console.error('categoryData must be an array');
        return;
      }
      set({ categoryData });
    },
    
    setCategory: (category) => {
      if (typeof category !== 'string' && category !== undefined) {
        console.error('category must be a string or undefined');
        return;
      }
      set({ category });
    }
  });