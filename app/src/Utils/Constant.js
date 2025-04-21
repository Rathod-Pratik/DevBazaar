export const  HOST= import.meta.env.VITE_API_HOST;

export const GET_PRODUCT_DATA='/Product/getProduct';
export const CREATE_PRODUCT='Product/createproduct'
export const UPDATE_PRODUCT='Product/updateProduct'
export const DELETE_PRODUCT='Product/removeproduct'

export const UPDATE_PROFILE=`Profile/updateProfile`
export const AUTH_ROUTES='/api/auth';
export const SIGNUP_ROUTES=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES=`${AUTH_ROUTES}/login`;
export const GET_USER=`api/getUser`
export const DELETE_USER=`api/deleteUser`
export const BLOCK_USER=`api/blockUser`
export const UNBLOCK_USER=`api/UnblockUser`

export const CART='cart';
export const UPDATE_QUANTITTY=`${CART}/updateQuantity`
export const ADD_TO_CART=`${CART}/addToCart`;
export const GET_CART=`${CART}/getCart`
export const DELETE_FROM_CART=`${CART}/deleteFromCart`

export const WISHLIST='wishList'
export const ADD_TO_WISHLIST=`${WISHLIST}/addToWishList`;
export const REMOVE_FROM_WISHLIST=`${WISHLIST}/deleteFromWishList`;
export const GET_WISHLIST=`${WISHLIST}/getWishList`;

export const CREATE_CONTACT='Contect/createContact';
export const GET_CONTACT='Contect/getContact'
export const DELETE_CONTACT='Contect/deleteContact'

export const ORDER='order';
export const GET_ORDER=`${ORDER}/getorder`;
export const CREATE_ORDER=`${ORDER}/CreateOrder`;
export const CANCEL_ORDER=`${ORDER}/CancelOrder`;
export const GET_CANCEL_ORDER=`${ORDER}/GetCancelOrder`
export const GET_ALL_ORDER=`${ORDER}/getallorder`

export const REFUNDPAYMENT='payment/refund'

export const ADD_REVIEW='review/createreview'
export const GET_REVIEW='review/getreview'
export const GET_ALL_REVIEW='review/getallreview'
export const DELETE_REVIEW='review/DeleteReview'

export const GET_ALL_STATE='Admin/getstats'

export const CREATE_CATEGORY='category/CreateCategory'
export const DELETE_CATEGORY='category/deleteCategory'
export const UPDATE_CATEGORY='category/EditCategory'
export const GET_CATEGORY='category/GetCategory'