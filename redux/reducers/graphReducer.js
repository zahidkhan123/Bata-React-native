import {
  GRAPH_SELECTION_REQUEST,
  GRAPH_SELECTION_SUCCESS,
  GRAPH_SELECTION_FAIL,
  GRAPH_CHART_REQUEST,
  GRAPH_CHART_SUCCESS,
  GRAPH_CHART_FAIL,
} from '../constants/graphConstants';

// GRAPH SELECTION REDUCER
export const graphSelectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GRAPH_SELECTION_REQUEST:
      return { loading: true };
    case GRAPH_SELECTION_SUCCESS:
      return {
        loading: false,
        graphSelection: action.payload,
      };
    case GRAPH_SELECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// GRAPH CHART REDUCER
export const graphChartReducer = (state = {}, action) => {
  switch (action.type) {
    case GRAPH_CHART_REQUEST:
      return { loading: true };
    case GRAPH_CHART_SUCCESS:
      return {
        loading: false,
        graphChart: action.payload,
      };
    case GRAPH_CHART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
