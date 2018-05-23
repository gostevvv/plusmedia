import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getCardNRows from '../../utils';
import { setCard } from './actions';

// Нет нужды в PureComponent или переопределении shouldComponentUpdate, потому что:

/* Similarly, React Redux tries to improve performance by doing shallow equality reference
   checks on incoming props in shouldComponentUpdate, and if all references are the same,
   shouldComponentUpdate returns false to skip actually updating your original component. (с) */

const Container = styled.div`
  margin-top: 15px;
  display: flex
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  margin-right: 15px;
`;

function List({ list, setCard, cardRows }) {
  return (
    <Container>
      {
        (_.isArray(list) ? list : []).map(e => (
          <StyledLink
            to={`/repoDetails/${e.id}`}
            onClick={() => {
                  setCard(e);
                }}
            key={e.id}
          >
            {
                  getCardNRows(e, cardRows)
                    .map((rowKey) => {
                      const rowValue = e[rowKey];
                      return (
                        <div key={rowKey}>
                          {`${rowKey}: ${rowValue}`}
                        </div>
                      );
                    })
                }
          </StyledLink>
            ))
      }
    </Container>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCard: PropTypes.func.isRequired,
  cardRows: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    list: state.list.list,
    cardRows: state.list.cardRows,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCard(value) {
      return dispatch(setCard(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
