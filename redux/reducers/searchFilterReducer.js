import {
  BRAND_FILTER_REQUEST,
  BRAND_FILTER_SUCCESS,
  BRAND_FILTER_FAIL,
  CATEGORY_FILTER_REQUEST,
  CATEGORY_FILTER_SUCCESS,
  CATEGORY_FILTER_FAIL,
} from '../constants/searchFilterConstants';

// SEARCH BY BRAND REDUCER
export const BrandFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_FILTER_REQUEST:
      return { loading: true };
    case BRAND_FILTER_SUCCESS:
      return {
        loading: false,
        brandFilter: action.payload,
      };
    case BRAND_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SEARCH BY CATEGORY REDUCER
export const CategoryFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_FILTER_REQUEST:
      return { loading: true };
    case CATEGORY_FILTER_SUCCESS:
      return {
        loading: false,
        categoryFilter: action.payload,
      };
    case CATEGORY_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
