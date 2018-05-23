import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getCardNRows from '../../utils';

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

class List extends React.Component {
  render() {
    const { list, cardRows } = this.props
    return (
      <Container>
        {
          (_.isArray(list) ? list : []).map(e => (
            <StyledLink
              to={`/repoDetails/${e.id}`}
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
}

List.propTypes = {
  list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  cardRows: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    list: state.list.list,
    cardRows: state.list.cardRows,
  };
}

export default connect(mapStateToProps)(List);
