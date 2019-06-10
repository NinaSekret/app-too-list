// @flow

import { Task } from "./interfaces";

const requestUrl =
  "https://api.backendless.com/F6F74BDD-8418-BDB2-FF45-F0970046CD00/8CC32AE1-F8FE-8FAB-FF52-FBB2899E1300/data";

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error("Server error: " + response.statusText);
}

function request<object>(
  url: string,
  method: string,
  body?: object
): Promise<any> {
  const options: any = {
    method
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(requestUrl + url, options)
    .then(checkStatus)
    .then(response => response.json());
}

export function createTaskRequest(
  id: number,
  day: string,
  title: string,
  text: string,
  label: string,
  isDone: boolean
) {
  return request<Task>("/task", "POST", {
    id: id,
    day: day,
    title: title,
    text: text,
    label: label,
    isDone: isDone
  });
}

export function updateTaskRequest(
  id: number,
  day: string,
  title: string,
  text: string,
  isDone: boolean,
  label: string
) {
  return request<Task>(`/bulk/task?where=id=${id}`, "PUT", {
    id: id,
    day: day,
    title: title,
    text: text,
    label: label,
    isDone: isDone
  });
}

export function deleteTaskRequest(id: number) {
  return request(`/bulk/task?where=id=${id}`, "DELETE");
}

export function getTasksRequest() {
  return request<Task[]>("/task?sortBy=day%20desc", "GET");
}
