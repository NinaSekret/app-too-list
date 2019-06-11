// @flow
import * as React from "react";
import { Task } from "../../interfaces";
import AddTask from "../AddTask/AddTask";
import moment from "moment";
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
    const {
      day,
      title,
      label,
      text,
      isEdit,
      isDone,
      timeIsDone
    } = this.props.data;

    const isOverdueTask = moment(day).isBefore(
      moment().format("DD.MM.YYYY HH:mm")
    );

    return (
      <>
        {isEdit ? (
          <AddTask data={this.props.data} />
        ) : (
          <div className="task">
            <p className="task__day">{day}</p>
            <p className="task__title">{title}</p>
            <p className="task__text">{text}</p>
            <p className="task__label">{label}</p>
            <p className="task__timeIsDone">
              Время когда была сделана задача: {timeIsDone}
            </p>
            <button className="task__btn" onClick={this.onBtnClickDeleteTask}>
              Удалить
            </button>
            {!isDone && (
              <button className="task__btn" onClick={this.onBtnClickEditTask}>
                Редактировать
              </button>
            )}
          </div>
        )}
      </>
    );
  }
}
