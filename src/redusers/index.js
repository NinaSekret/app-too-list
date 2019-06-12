// @flow

import { combineReducers } from 'redux';
import requests from './requests';
import filters from './filters';

export const rootReducer = combineReducers({
  requests: requests,
  filters: filters
});
