import React from 'react'
import styled from 'styled-components'
import * as utils from '../utils'
import { Link } from 'react-router-dom'

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
        <Link to="/list">
          ×
        </Link>
        {
          utils.getCardNRows(card, 6)
            .map((rowKey,i) => {
              const rowValue = card[rowKey]
              return (
                <div key={i}>
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
