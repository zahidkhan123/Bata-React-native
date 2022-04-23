import {
  META_DATA_FAIL,
  META_DATA_REQUEST,
  META_DATA_SUCCESS,
  SUGGESTED_PRODUCT_FAIL,
  SUGGESTED_PRODUCT_REQUEST,
  SUGGESTED_PRODUCT_SUCCESS,
} from '../constants/dashboardConstants';

export const bannerReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case META_DATA_REQUEST:
      return { loading: true, banners: [] };
    case META_DATA_SUCCESS:
      return { loading: false, banners: action.payload };
    case META_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const suggestedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SUGGESTED_PRODUCT_REQUEST:
      return { loading: true };
    case SUGGESTED_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case SUGGESTED_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
