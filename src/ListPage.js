import React from 'react'
import {browserHistory} from 'react-router'
import {compose, withHandlers, withState} from 'recompose'
import Modal from './Modal'
import _ from 'lodash'

function ListPage({
                    routeParams,
                    search,
                    cardRows, setCardRows,
                    selectedCard, selectCard,
                    user, setUser,
                    page, setPage,
                    list, setList,
                  }) {
  const id = routeParams.id
  return (
    <div
      style={{
        padding: 100,
      }}
    >
      {
        id && selectedCard && <Modal card={selectedCard} />
      }
      <input
        value={user}
        onKeyPress={(e) => {
          if (e.key === 'Enter') { // Нажали энтер
            search().then(list => setList(list))
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
        <input type="radio" value={2} name="gender" checked={cardRows == 2}/>В карточке две строчки
        <input type="radio" value={4} name="gender" checked={cardRows == 4}/>В карточке четыре строчки
      </div>
      <div
        style={{
          marginTop: 15,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {
          list.map(e => {
              return (
                <div
                  style={{
                    cursor: 'pointer',
                    padding: 10,
                    border: '1px solid black',
                    marginRight: 15,
                  }}
                  onClick={() => {
                    browserHistory.push(`/repoDetails/${e.id}`)
                    selectCard(e)
                  }}
                  key={e.id}
                >
                  {
                    _.take(_.keys(e).sort(), cardRows)
                      .map((rowKey) => {
                        const rowValue = e[rowKey]
                        return (
                          <div>
                            {`${rowKey}: ${rowValue}`}
                          </div>
                        )
                      })
                  }
                </div>
              )
            }
          )
        }
      </div>
      <button
        style={{
          display: list && list.length > 0 ? 'block' : 'none',
          marginTop: 15,
        }}
        onClick={() => {
          setPage(page + 1)
          search(page + 1).then(chunk => setList([...list, ...chunk]))
        }}
      >
        Показать еще
      </button>
    </div>
  )
}

const enhance = compose(
  withState('per_page', 'setPerPage', 3),
  withState('cardRows', 'setCardRows', 2),
  withState('page', 'setPage', 0),
  withState('list', 'setList', []),
  withState('user', 'setUser', 'octokit'),
  withState('selectedCard', 'selectCard', null),

  withHandlers({
    search: ({user, page, per_page, setList}) => (pageParam) => {
      const pageFound = page || pageParam
      return fetch(`https://api.github.com/orgs/${user}/repos?page=${pageFound}&per_page=${per_page}`)
        .then(response => {
          return response.json()
        })
        .catch(e => {
          alert(`Что-то пошло не так. Подробности: ${e}`)
        })
    },
  }),
)

export default enhance(ListPage)
