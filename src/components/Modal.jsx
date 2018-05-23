/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getCardNRows from '../utils';

const ModalContainer = styled.div`
  position: fixed;
  cursor: pointer;
  z-index: 1000;
  background: rgba(0,0,0,0.85);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

function Modal({ card }) {
  return (
    <ModalContainer>
      <div style={{ height: '100%', color: 'white' }}>
        <Link to="/list">
          ×
        </Link>
        {
          getCardNRows(card, 6)
            .map((rowKey) => {
              const rowValue = card[rowKey];
              return (
                <div key={rowKey}>
                  {`${rowKey}: ${rowValue}`}
                </div>
              );
            })
        }
      </div>
    </ModalContainer>
  );
}

Modal.propTypes = {
  card: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Modal;
