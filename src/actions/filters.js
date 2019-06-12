// @flow

import { Dispatch } from 'redux';
import { createStandardAction } from 'typesafe-actions';
import { Filter } from '../interfaces';

export const setFilterAction = createStandardAction('SET_FILTER')();

export function setFilter(filter: Filter) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setFilterAction(filter));
  };
}
