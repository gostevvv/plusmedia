//import fetch from 'isomorphic-fetch' Если нужно, то воткнуть полифилл
import * as types from '../../constants/actionTypes'

function receiveNext (object) {
  return {
    type: types.RECEIVE_NEXT,
    object,
  }
}

function receiveSearch (object) {
  return {
    type: types.RECEIVE_SEARCH,
    object,
  }
}

function requestSearch (object) {
  return {
    type: types.REQUEST_SEARCH,
    object,
  }
}

function receiveSearchError (object) {
  return {
    type: types.RECEIVE_SEARCH_ERROR,
    object,
  }
}

export function setCardRows (object) {
  return {
    type: types.SET_CARD_ROWS,
    object,
  }
}

export function setUser (object) {
  return {
    type: types.SET_USER,
    object,
  }
}

export function setCard (object) {
  return {
    type: types.SET_CARD,
    object,
  }
}

export function setPage (object) {
  return {
    type: types.SET_PAGE,
    object,
  }
}

export function search (user, page, per_page) {
  return (dispatch) => {
    dispatch(requestSearch({ user, page, per_page }))
    return fetchList(user, page, per_page)
      .then(json => {
        dispatch(receiveSearch(json))
      })
  }
}

export function next (user, page, per_page) {
  return (dispatch) => {
    dispatch(requestSearch({ user, page, per_page }))
    return fetchList(user, page, per_page)
      .then(json => {
        dispatch(receiveNext(json))
      })
  }
}

function fetchList(user, page, per_page) {
  return fetch(`https://api.github.com/orgs/${user}/repos?page=${page}&per_page=${per_page}`)
      .then(response => {
        return response.json()
      })
}

