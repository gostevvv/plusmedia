/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from './List';
import * as actions from './actions';
import Modal from './Modal';
import Loader from '../../components/Loader';

class ListPage extends React.Component {
  componentDidMount() {
    const nextPage = this.props.page + 1;
    this.props.setPage(nextPage);
    this.props.next(this.props.user, nextPage, this.props.perPage);
  }

  userInputOnKeyPress = (e) => {
    if (e.key === 'Enter') { // Нажали энтер
      this.props.setPage(1);
      this.props.search(this.props.user, 1, this.props.perPage);
    }
  }

  userInputOnChange = (e) => {
    this.props.setUser(e.target.value);
  }

  setCardRows = (e) => {
    this.props.setCardRows(e.target.value);
  }

  loadNextChunk = () => {
    const nextPage = this.props.page + 1;
    this.props.setPage(nextPage);
    this.props.next(this.props.user, nextPage, this.props.perPage);
  }

  render() {
    const { props } = this;
    const id = _.get(props.match, 'params.id');
    return (
      <div
        style={{
          padding: 100,
        }}
      >
        {
          id && <Modal id={parseInt(id)} user={props.user} />
        }
        <input
          value={props.user}
          onKeyPress={this.userInputOnKeyPress}
          onChange={this.userInputOnChange}
        />
        <div onChange={this.setCardRows}>
          <input type="radio" value={2} name="gender" defaultChecked={props.cardRows === 2} />В карточке две строчки
          <input type="radio" value={4} name="gender" defaultChecked={props.cardRows === 4} />В карточке четыре строчки
        </div>
        <List />
        {
          props.isLoading && <Loader />
        }
        {
          !props.isLoadedAll &&
          <button
            style={{
              display: 'block',
              marginTop: 15,
            }}
            onClick={this.loadNextChunk}
          >
            Показать еще
          </button>
        }
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
