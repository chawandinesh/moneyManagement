import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
} from '../actionTypes/transactionActionTypes';

const atnAddTransaction = (data) => {
  return {
    type: ADD_TRANSACTION,
    data,
  };
};

const atnUpdateTransaction = (data, index) => {
  return {
    type: UPDATE_TRANSACTION,
    data,
    index,
  };
};

export {atnAddTransaction, atnUpdateTransaction};
