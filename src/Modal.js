import React from 'react'
import {browserHistory} from 'react-router'
import {compose, withHandlers, withState, lifecycle} from 'recompose'
import styled from 'styled-components'
import _ from 'lodash'

const Cross = styled.div`
  color: rgba(255,255,255,0.8);
  text-align: right;
  height: 25px;
  font-size: 24px;
  &:hover {
    color: white;
  }
`

function Modal ({ card }) {
  return (
    <div
      style={{
        position: 'fixed',
        cursor: 'pointer',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ height: '100%', color: 'white' }}>
        <Cross
          onClick={() => {
            browserHistory.push('/list')
          }}
        >
          ×
        </Cross>
        {
          _.take(_.keys(card).sort(), 6)
            .map((rowKey) => {
              const rowValue = card[rowKey]
              return (
                <div>
                  {`${rowKey}: ${rowValue}`}
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default Modal
