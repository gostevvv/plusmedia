import _ from 'lodash';
import * as types from '../../constants/actionTypes';

const initialState = {
  perPage: 3,
  cardRows: 2,
  page: 1,
  list: [],
  user: 'octokit',
  card: null,
  isLoading: false,
  isLoadingCard: false,
  isLoadedAll: false,
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_SEARCH: {
      return {
        ...state,
        list: action.object,
        isLoading: false,
        isLoadedAll: _.isEmpty(action.object),
      };
    }
    case types.RECEIVE_NEXT: {
      return {
        ...state,
        list: [...state.list, ...action.object],
        isLoading: false,
        isLoadedAll: _.isEmpty(action.object),
      };
    }
    case types.REQUEST_SEARCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.RECEIVE_SEARCH_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.SET_CARD_ROWS: {
      return {
        ...state,
        cardRows: action.object,
      };
    }
    case types.SET_PAGE: {
      return {
        ...state,
        page: action.object,
      };
    }
    case types.SET_USER: {
      return {
        ...state,
        user: action.object,
      };
    }
    case types.REQUEST_CARD: {
      return {
        ...state,
        isLoadingCard: true,
      };
    }
    case types.RECEIVE_CARD: {
      return {
        ...state,
        card: action.object,
        isLoadingCard: false,
      };
    }
    default: {
      return state;
    }
  }
}
