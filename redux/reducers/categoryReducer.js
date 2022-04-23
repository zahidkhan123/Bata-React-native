import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/categoryConstants';

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return { loading: true };
    case CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };

    case CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const catlogReducer = (state = { catlog: [] }, action) => {
  let newCatelog;

  if (action.type === 'PRODUCT_LIST_SUCCESS') {
    newCatelog =
      state.catlog !== undefined
        ? [...state.catlog, ...action.payload.data]
        : [...action.payload.data];
  }

  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // catlog: action?.payload?.data,
        catlog: [...newCatelog],
        paginData: action.payload.paging_data,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { loading: true };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        singleProduct: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
