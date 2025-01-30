export const  HOST=import.meta.env.BACKEND;

export const GET_PRODUCT_DATA='/Product/getProduct';

export const AUTH_ROUTES='/api/auth';
export const SIGNUP_ROUTES=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES=`${AUTH_ROUTES}/login`;

export const CART='cart';
export const UPDATE_QUANTITTY=`${CART}/updateQuantity`
export const ADD_TO_CART=`${CART}/addToCart`;
export const GET_CART=`${CART}/getCart`
export const DELETE_FROM_CART=`${CART}/deleteFromCart`

export const WISHLIST='wishList'
export const ADD_TO_WISHLIST=`${WISHLIST}/addToWishList`;
export const REMOVE_FROM_WISHLIST=`${WISHLIST}/deleteFromWishList`;
export const GET_WISHLIST=`${WISHLIST}/getWishList`;

export const BILLING='Billing/getBilling';

export const UPDATE_PROFILE=`Profile/updateProfile`

export const SEND_MESSAGE='Contect';

export const ORDER='order';
export const GET_ORDER=`${ORDER}/getorder`;
export const ADD_ORDER=`${ORDER}/addtoorder`;
export const CANCEL_ORDER=`${ORDER}/CancelOrder`;


