import axios from 'axios';
import { SERVER_IP } from '../../config/env';
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

export const addToCart = (product, article) => async (dispatch, getState) => {
  const {
    cart: { cartItem },
  } = getState();

  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (article) => (dispatch, getState) => {
  const {
    cart: { cartItem },
  } = getState();
  // let items =  cartItem.filter(
  //   (item) => item.article.articleNo !== articleId
  // )
  dispatch({
    type: REMOVE_ITEM,
    payload: article,
  });

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const customOrderAddToCart =
  (product, navigation) => async (dispatch) => {
    dispatch({
      type: CUSTOM_ORDER_ADD_TO_CART,
      payload: product,
    });
    navigation.navigate('CustomOrder');
    //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

export const customOrderRemoveFromCart = (article) => (dispatch, getState) => {
  const {
    cart: { cartItem },
  } = getState();

  dispatch({
    type: CUSTOM_ORDER_REMOVE_FROM_CART,
    payload: article,
  });

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const resetCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_CART,
    });
  };
};

export const checkoutOrder =
  (order, navigation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHECKOUT_ORDER_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userInfo.data.Token}`,
        },
      };

      const { data } = await axios.post(
        `${SERVER_IP}/api/order/checkout_order`,
        order,
        config
      );
      dispatch({
        type: CHECKOUT_ORDER_SUCCESS,
        payload: data,
      });
      navigation.navigate('OrderSummaryCart');
    } catch (error) {
      dispatch({
        type: CHECKOUT_ORDER_FAILURE,
        payload:
          error.response && error.response.data.status.message
            ? error.response.data.status.message
            : error.message,
      });
    }
  };

// if (customCartItem.length > 0) {
//   let previousCart = [...customCartItem];

//   previousCart.map((item) => {

//     if (item.article.articleNo === product.article.articleNo) {
//
//       updatedProduct = { item: product };
//
//     } else {
//
//       updatedProduct = { item, product };
//
//     }
//     return updatedProduct;
//   });
// } else {
//   updatedProduct = product;
// }
