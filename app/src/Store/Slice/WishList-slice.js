export const createWishListSlice = (set) => ({
    wishListItems: [],
    setWishListItems: (wishListItems) => set({ wishListItems }),
    addWishListItem: (wishListItem) => {
      set((state) => ({
        wishListItems: [...state.wishListItems, wishListItem],
      }));
    },
    removeWishListItem: (wishListItem) =>
      set((state) => ({
        wishListItems: state.wishListItems.filter(
          (item) => item.Product_name !== wishListItem.Product_name
        ),
      })),
    clearWishListItems: () => set({ wishListItems: [] }),
  });
  