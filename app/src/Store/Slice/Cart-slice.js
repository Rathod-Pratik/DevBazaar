export const createCartSlice = (set) => ({
  cartItems: [],

  // Replace entire cart safely
  setCartItems: (items) => 
    set({ cartItems: Array.isArray(items) ? items : [] }),

  // Add a new item safely
  addCartItem: (cartItem) =>
    set((state) => ({
      cartItems: Array.isArray(state.cartItems)
        ? [...state.cartItems, cartItem]
        : [cartItem],
    })),

  // Remove an item safely
  removeCartItem: (cartItem) =>
    set((state) => ({
      cartItems: Array.isArray(state.cartItems)
        ? state.cartItems.filter(
            (item) => item.Product_name !== cartItem.Product_name
          )
        : [],
    })),

  // Update a cart item by id
  updateCartItem: (id, updatedFields) =>
    set((state) => ({
      cartItems: Array.isArray(state.cartItems)
        ? state.cartItems.map((item) =>
            item._id === id ? { ...item, ...updatedFields } : item
          )
        : [],
    })),

  // Clear cart
  clearCartItems: () => set({ cartItems: [] }),
});