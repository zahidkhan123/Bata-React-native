import {
  GRAPH_SELECTION_REQUEST,
  GRAPH_SELECTION_SUCCESS,
  GRAPH_SELECTION_FAIL,
  GRAPH_CHART_REQUEST,
  GRAPH_CHART_SUCCESS,
  GRAPH_CHART_FAIL,
} from '../constants/graphConstants';
import { SERVER_IP } from '../../config/env';
import axios from 'axios';

// GRAPH SELECTION
export const graphSelectionAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRAPH_SELECTION_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        //   Authorization: `${userInfo.data.Token}`,
      },
    };

    const { data } = await axios.get(
      `${SERVER_IP}/api/graph/selection`,
      config
    );
    dispatch({
      type: GRAPH_SELECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRAPH_SELECTION_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};

// GRAPH CHART
export const graphChartAction = (graph) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRAPH_CHART_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        //   Authorization: `${userInfo.data.Token}`,
      },
    };

    const { data } = await axios.post(
      `${SERVER_IP}/api/graph/chart`,
      graph,
      config
    );
    dispatch({
      type: GRAPH_CHART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRAPH_CHART_FAIL,
      payload:
        error.response && error.response.data.status.message
          ? error.response.data.status.message
          : error.message,
    });
  }
};
