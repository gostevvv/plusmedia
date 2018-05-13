import React from 'react'
import Modal from '../../components/Modal'
import * as utils from '../../utils'
import Loader from '../../components/Loader'
import _ from 'lodash'
import {connect} from 'react-redux';
import {search, next, setCardRows, setUser, setCard, setPage, } from './actions'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'

function ListPage({
                    match,
                    search, next,
                    per_page,
                    cardRows, setCardRows,
                    card, setCard,
                    user, setUser,
                    page, setPage,
                    list,
                    isLoading, isLoadedAll
                  }) {
  const id = _.get(match, 'params.id')
  return (
    <div
      style={{
        padding: 100,
      }}
    >
      {
        id && card && <Modal card={card} />
      }
      <input
        value={user}
        onKeyPress={(e) => {
          if (e.key === 'Enter') { // Нажали энтер
            setPage(1)
            search(user, 1, per_page)
          }
        }}
        onChange={(e) => {
          setUser(e.target.value)
        }}
      />
      <div
        onChange={(e) => {
          setCardRows(e.target.value)
        }}
      >
        <input type="radio" value={2} name="gender" defaultChecked={cardRows == 2}/>В карточке две строчки
        <input type="radio" value={4} name="gender" defaultChecked={cardRows == 4}/>В карточке четыре строчки
      </div>
      <div
        style={{
          marginTop: 15,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {
          (_.isArray(list) ? list : []).map(e => {
              return (
                <Link
                  style={{
                    cursor: 'pointer',
                    padding: 10,
                    border: '1px solid black',
                    marginRight: 15,
                  }}
                  to={`/repoDetails/${e.id}`}
                  onClick={() => {
                    setCard(e)
                  }}
                  key={e.id}
                >
                  {
                    utils.getCardNRows(e, cardRows)
                      .map((rowKey, i) => {
                        const rowValue = e[rowKey]
                        return (
                          <div key={i}>
                            {`${rowKey}: ${rowValue}`}
                          </div>
                        )
                      })
                  }
                </Link>
              )
            }
          )
        }
      </div>
      {
        isLoading && <Loader />
      }
      <button
        style={{
          display: !isLoadedAll && list && list.length > 0 ? 'block' : 'none',
          marginTop: 15,
        }}
        onClick={() => {
          const nextPage = page + 1
          setPage(nextPage)
          next(user, nextPage, per_page)
        }}
      >
        Показать еще
      </button>
    </div>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    list: state.list.list,
    isLoading: state.list.isLoading,
    isLoadedAll: state.list.isLoadedAll,
    per_page: state.list.per_page,
    cardRows: state.list.cardRows,
    user: state.list.user,
    page: state.list.page,
    card: state.list.card,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    search: function (user, page, per_page) {
      return dispatch(search(user, page, per_page))
    },
    next: function (user, page, per_page) {
      return dispatch(next(user, page, per_page))
    },
    setCardRows: function (values) {
      return dispatch(setCardRows(values))
    },
    setUser: function (value) {
      return dispatch(setUser(value))
    },
    setCard: function (value) {
      return dispatch(setCard(value))
    },
    setPage: function (value) {
      return dispatch(setPage(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
