//@flow

export interface Task {
  id: number;
  day: string;
  title: string;
  text: string;
  label: string;
  timeIsDone: string;
  isDone: boolean;
  isEdit: boolean;
}
