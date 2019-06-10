// @flow
import { Task } from "../interfaces";
import * as actions from "../actions/requests";

import { getType, ActionType } from "typesafe-actions";

type IAction = ActionType<typeof actions>;

type IInitialState = {
  tasks: Task[],
  isloading: boolean,
  error: string | null
};

const initialState: IInitialState = {
  tasks: [],
  isloading: false,
  error: null
};

export default function reducer(
  state: IInitialState = initialState,
  action: IAction
): IInitialState {
  switch (action.type) {
    case getType(actions.getTasksPending):
      return { ...state, isloading: true };
    case getType(actions.getTasksSuccess):
      return { ...state, tasks: action.payload, isloading: false };
    case getType(actions.getTasksError):
      return { ...state, isloading: false, error: action.payload };
    case getType(actions.deleteTaskPending):
      return { ...state, isloading: true };
    case getType(actions.deleteTaskSuccess):
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload),
        isloading: false
      };
    case getType(actions.deleteTaskError):
      return { ...state, isloading: false, error: action.payload };
    case getType(actions.addTaskPending):
      return { ...state, isloading: true };
    case getType(actions.addTaskSuccess):
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            day: action.payload.day,
            text: action.payload.text
          }
        ],
        isloading: false
      };
    case getType(actions.addTaskError):
      return { ...state, isloading: false, error: action.payload };
    default:
      return state;
  }
}
