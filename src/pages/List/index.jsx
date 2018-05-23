import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';
import PropTypes from 'prop-types';
import List from './List';
import * as actions from './actions';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

function ListPage({
  match,
  search, next,
  perPage,
  cardRows, setCardRows,
  card,
  user, setUser,
  page, setPage,
  isLoading, isLoadedAll
}) {
  const id = _.get(match, 'params.id');
  return (
    <div
      style={{
        padding: 100,
      }}
    >
      {
        id && <Modal card={card} />
      }
      <input
        value={user}
        onKeyPress={(e) => {
          if (e.key === 'Enter') { // Нажали энтер
            setPage(1);
            search(user, 1, perPage);
          }
        }}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <div
        onChange={(e) => {
          setCardRows(e.target.value);
        }}
      >
        <input type="radio" value={2} name="gender" defaultChecked={cardRows === 2} />В карточке две строчки
        <input type="radio" value={4} name="gender" defaultChecked={cardRows === 4} />В карточке четыре строчки
      </div>
      <List />
      {
        isLoading && <Loader />
      }
      {
        !isLoadedAll &&
        <button
          style={{
            display: 'block',
            marginTop: 15,
          }}
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            next(user, nextPage, perPage);
          }}
        >
          Показать еще
        </button>
      }
    </div>
  );
}

ListPage.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  card: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  cardRows: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setCardRows: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadedAll: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoading: state.list.isLoading,
    isLoadedAll: state.list.isLoadedAll,
    perPage: state.list.perPage,
    cardRows: state.list.cardRows,
    user: state.list.user,
    page: state.list.page,
    card: state.list.card,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    search(user, page, perPage) {
      return dispatch(actions.search(user, page, perPage));
    },
    next(user, page, perPage) {
      return dispatch(actions.next(user, page, perPage));
    },
    setCardRows(values) {
      return dispatch(actions.setCardRows(values));
    },
    setUser(value) {
      return dispatch(actions.setUser(value));
    },
    setPage(value) {
      return dispatch(actions.setPage(value));
    },
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const nextPage = this.props.page + 1;
      this.props.setPage(nextPage);
      this.props.next(this.props.user, nextPage, this.props.perPage);
    }
  })
);

export default enhance(ListPage);
