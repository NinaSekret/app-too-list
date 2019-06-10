//@flow

import { Dispatch } from "redux";
import { createStandardAction } from "typesafe-actions";
import { Filter } from "../interfaces";

export const setFilterAction = createStandardAction("SET_FILTER")<Filter>();

console.log(123);
export function setFilter(filter: Filter) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setFilterAction(filter));
  };
}
