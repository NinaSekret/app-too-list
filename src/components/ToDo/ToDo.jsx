// @flow
import * as React from "react";
import { Task } from "../../interfaces";
import "./ToDo.scss";

interface IProps {
  key: number;
  data: Task;
  deleteTask: (id: number) => void;
}

export class ToDo extends React.PureComponent<IProps> {
  onBtnClickHandler = () => {
    this.props.deleteTask(this.props.data.id);
  };

  render() {
    const { day, title, label, text } = this.props.data;
    return (
      <div className="task">
        <p className="task__day">{day}</p>
        <p className="task__title">{title}</p>
        <p className="task__text">{text}</p>
        <p className="task__label">{label}</p>
        <button className="task__btn" onClick={this.onBtnClickHandler}>
          Удалить
        </button>
        <button className="task__btn" onClick={this.onBtnClickHandler}>
          Редактировать
        </button>
      </div>
    );
  }
}
