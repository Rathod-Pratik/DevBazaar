export const createCartSlice=(set)=>({
    cartItems:[],
    setCartItems:(cartItems)=>set({cartItems}),
    addCartItem:(cartItem)=>set((state)=>({
        cartItems:[...state.cartItems,cartItem]
    })),
    removeCartItem:(cartItem)=>set((state)=>({
        cartItems:state.cartItems.filter((item)=>item.Product_name!==cartItem.Product_name)
    })),
    clearCartItems:()=>set({cartItems:[]})
})