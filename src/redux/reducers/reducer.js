import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
} from '../actionTypes/transactionActionTypes';

const initialState = {
  transactionRecord: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactionRecord: [...state.transactionRecord, action.data],
      };
    case UPDATE_TRANSACTION:
      let otherLast = state.transactionRecord.findIndex(
        (data, idx) => idx === action.index,
      );
      state.transactionRecord.splice(otherLast, 1, action.data);
      return {
        ...state,
        transactionRecord: state.transactionRecord,
      };
    default:
      return state;
  }
};

export {reducer};
