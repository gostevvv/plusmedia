/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCardNRows from '../../utils/index';
import * as actions from './actions';
import Loader from '../../components/Loader';

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

class Modal extends React.Component {
  componentDidMount() {
    this.props.getCard(this.props.id, this.props.user);
  }

  render() {
    const { card, isLoadingCard } = this.props
    return (
      <ModalContainer>
        <div style={{ height: '100%', color: 'white' }}>
          <Link to="/list">
            ×
          </Link>
          {
            isLoadingCard && <Loader />
          }
          {
            !isLoadingCard &&
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
}


Modal.propTypes = {
  card: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  getCard: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  isLoadingCard: PropTypes.bool.isRequired, // eslint-disable-line react/forbid-prop-types
};

Modal.defaultProps = {
  card: {},
}

function mapStateToProps(state) {
  return {
    card: state.list.card,
    isLoadingCard: state.list.isLoadingCard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCard(id, user) {
      return dispatch(actions.getCard({ id, user }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
