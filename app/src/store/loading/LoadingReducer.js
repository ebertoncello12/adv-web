import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  open: false,
};

export const isBusy = createAction('STATUS_LOADING');

export default createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(isBusy, (state, action) => {
    return { ...state, open: action.payload };
  });
});
