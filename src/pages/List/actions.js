/* global fetch */
// import fetch from 'isomorphic-fetch' Если нужно, то воткнуть полифилл
import * as types from '../../constants/actionTypes';

function receiveNext(object) {
  return {
    type: types.RECEIVE_NEXT,
    object,
  };
}

function receiveSearch(object) {
  return {
    type: types.RECEIVE_SEARCH,
    object,
  };
}

function requestSearch(object) {
  return {
    type: types.REQUEST_SEARCH,
    object,
  };
}

function requestCard(object) {
  return {
    type: types.REQUEST_CARD,
    object,
  };
}

function receiveCard(object) {
  return {
    type: types.RECEIVE_CARD,
    object,
  };
}


export function setCardRows(object) {
  return {
    type: types.SET_CARD_ROWS,
    object,
  };
}

export function setUser(object) {
  return {
    type: types.SET_USER,
    object,
  };
}

export function setPage(object) {
  return {
    type: types.SET_PAGE,
    object,
  };
}

function fetchList(user, page, perPage) {
  return fetch(`https://api.github.com/orgs/${user}/repos?page=${page}&per_page=${perPage}`)
    .then(response => response.json());
}

export function search(user, page, perPage) {
  return (dispatch) => {
    dispatch(requestSearch({ user, page, perPage }));
    return fetchList(user, page, perPage)
      .then((json) => {
        dispatch(receiveSearch(json));
      });
  };
}

export function next(user, page, perPage) {
  return (dispatch) => {
    dispatch(requestSearch({ user, page, perPage }));
    return fetchList(user, page, perPage)
      .then((json) => {
        dispatch(receiveNext(json));
      });
  };
}

export function getCard({ id, user }) {
  return (dispatch) => {
    dispatch(requestCard({ id, user }));
    fetch(`https://api.github.com/orgs/${user}/repos?page=0&per_page=10`)
      .then(response => response.json())
      .then((json) => {
        const card = (json || []).find(e => e.id === id);
        dispatch(receiveCard(card));
      });
  };
}
