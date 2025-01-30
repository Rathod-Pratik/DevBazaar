export const createOrderSlice=(set)=>({
    orderItem:[],
    setOrderItem:(orderItem)=>set({orderItem}),
    addOrderItem:(orderItem)=>{
        set((state)=>({
            orderItem:[...state.orderItem,orderItem],
        }))
    },
    removeOrderItem:(orderItem)=>
        set((state)=>({
            orderItem:state.orderItem.filter((item)=>item._id !== orderItem._id)
        }))
})