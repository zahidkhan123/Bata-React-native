import {
  CART_ADD_ITEM,
  CHECKOUT_ORDER_FAILURE,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
  CUSTOM_ORDER_ADD_TO_CART,
  CUSTOM_ORDER_REMOVE_FROM_CART,
  RESET_CART,
} from '../constants/cartConstants';
import { REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
    const { payload } = action;

 if (state.cartItem.length) {
   let data = state.cartItem.filter(
     (item) => item.article.articleNo !== payload.article.articleNo
   );

   return {
     ...state,
     cartItem: [...data, payload],
   };
 } else {
   return {
     ...state,
     cartItem: [...state.cartItem, payload],
   };
 }
   
   
    case REMOVE_ITEM:
      const articleId = action.payload;

      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item.article.articleNo !== articleId
        ),
      };
    case RESET_CART:
      return {
        ...state,
        cartItem: [],
      };

    default:
      return state;
  }
};
 

export const customOrderCartReducer = (
  state = { customCartItem: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_ORDER_ADD_TO_CART:
      const { payload } = action;

      if (state.customCartItem.length) {
        let data = state.customCartItem.filter(item => item.article.articleNo !== payload.article.articleNo )

        return {
          ...state,
          customCartItem: [...data, payload],
        };
      } else {
        return {
          ...state,
          customCartItem: [...state.customCartItem, payload],
        };
      }

    case CUSTOM_ORDER_REMOVE_FROM_CART:
      const articleId = action.payload;

      // const existItem=customCartItem.find((x) => x.is_checked === )

      return {
        ...state,
        customCartItem: state.customCartItem.filter(
          (item) => item.article.articleNo !== articleId
        ),
      };

    default:
      return state;
  }
};

export const checkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_ORDER_REQUEST:
      return { loading: true };
    case CHECKOUT_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case CHECKOUT_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
