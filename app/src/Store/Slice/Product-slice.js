export const createProductDataSlice = (set, get) => ({
    productData: [],
    
    // Set entire product array
    setProductData: (productData) => set({ productData }),
    
    // Add new product
    addProduct: (newProduct) => 
      set((state) => ({ 
        productData: [...state.productData, newProduct] 
      })),
    
    // Edit existing product by ID
    editProduct: (productId, updatedData) =>
      set((state) => ({
        productData: state.productData.map(product =>
          product._id === productId ? { ...product, ...updatedData } : product
        )
      })),
    
    // Delete product by ID
    deleteProduct: (productId) =>
      set((state) => ({
        productData: state.productData.filter(product => 
          product._id !== productId
        )
      })),
    
    // Get product by ID (utility function)
    getProductById: (productId) => {
      return get().productData.find(product => product._id === productId);
    }
  });