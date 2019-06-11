//@flow

import { Dispatch } from "redux";
import { createStandardAction } from "typesafe-actions";
import { getTasksRequest, deleteTaskRequest, createTaskRequest } from "../api";
import { Task } from "../interfaces";

export const getTasksPending = createStandardAction(
  "GET_TASKS_REQUEST"
)<void>();
export const getTasksSuccess = createStandardAction("GET_TASKS_SUCCESS")<
  Task[]
>();
export const getTasksError = createStandardAction("GET_TASKS_ERROR")<string>();

export const deleteTaskPending = createStandardAction(
  "DELETE_TASK_REQUEST"
)<void>();
export const deleteTaskSuccess = createStandardAction(
  "DELETE_TASK_SUCCESS"
)<number>();
export const deleteTaskError = createStandardAction(
  "DELETE_TASK_ERROR"
)<string>();

export const addTaskPending = createStandardAction("ADD_TASK_REQUEST")<void>();
export const addTaskSuccess = createStandardAction("ADD_TASK_SUCCESS")<Task>();
export const addTaskError = createStandardAction("ADD_TASK_ERROR")<string>();

export const setEditTaskAction = createStandardAction("SET_EDIT_TASK")<Task>();
export const setСloseEditTaskAction = createStandardAction(
  "SET_CLOSE_EDIT_TASK"
)<Task>();

export function setEditTask(id: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setEditTaskAction(id));
  };
}

export function setCloseEditTask(id: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch(setСloseEditTaskAction(id));
  };
}

export function getTasks() {
  return (dispatch: Dispatch<any>) => {
    dispatch(getTasksPending());
    return getTasksRequest()
      .then(results => {
        dispatch(getTasksSuccess(results));
      })
      .catch((error: Error) => {
        dispatch(getTasksError(error.message));
        throw error;
      });
  };
}

export function deleteTask(id: number) {
  return (dispatch: Dispatch<any>) => {
    dispatch(deleteTaskPending());
    return deleteTaskRequest(id)
      .then(() => {
        dispatch(deleteTaskSuccess(id));
      })
      .catch((error: Error) => {
        dispatch(deleteTaskError(error.message));
        throw error;
      });
  };
}

export function addTask(id: number, day: string, text: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(addTaskPending());
    return createTaskRequest(id, day, text)
      .then(results => {
        dispatch(addTaskSuccess(results));
      })
      .catch((error: any) => {
        dispatch(addTaskError(error.message));
        throw error;
      });
  };
}
