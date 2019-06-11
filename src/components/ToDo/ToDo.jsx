// @flow
import * as React from "react";
import { Task } from "../../interfaces";
import AddTask from "../AddTask/AddTask";
import "./ToDo.scss";

interface IProps {
  key: number;
  data: Task;
  deleteTask: (id: number) => void;
  setEditTask: (id: number) => void;
}

export class ToDo extends React.PureComponent<IProps> {
  onBtnClickDeleteTask = () => {
    this.props.deleteTask(this.props.data.id);
  };

  onBtnClickEditTask = () => {
    this.props.setEditTask(this.props.data.id);
  };

  render() {
    const { day, title, label, text, isEdit, isDone } = this.props.data;
    return (
      <>
        {/* {isEdit ? (
          <AddTask data={this.props.data} />
        ) : ( */}
        <div className="task">
          <p className="task__day">{day}</p>
          <p className="task__title">{title}</p>
          <p className="task__text">{text}</p>
          <p className="task__label">{label}</p>
          <button className="task__btn" onClick={this.onBtnClickDeleteTask}>
            Удалить
          </button>
          <button className="task__btn" onClick={this.onBtnClickEditTask}>
            Редактировать
          </button>
        </div>
      </>
    );
  }
}
