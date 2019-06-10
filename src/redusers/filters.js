// @flow

import { Filter } from "../interfaces";
import * as actions from "../actions/filters";

import { getType, ActionType } from "typesafe-actions";

type IAction = ActionType<typeof actions>;

type IInitialState = {
  filter: Filter
};

const initialState: IInitialState = {
  filter: "all"
};

export default function reducer(
  state: IInitialState = initialState,
  action: IAction
): IInitialState {
  switch (action.type) {
    case getType(actions.setFilterAction):
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}
