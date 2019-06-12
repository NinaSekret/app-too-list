// @flow
import * as React from 'react';
import moment from 'moment';
import { Task } from '../../interfaces';
import AddTask from '../AddTask/AddTask';
import './ToDo.scss';

interface IProps {
  key: number;
  data: Task;
  deleteTask: (id: number) => void;
  setEditTask: (id: number) => void;
}

// eslint-disable-next-line import/prefer-default-export
export class ToDo extends React.PureComponent<IProps> {
  onBtnClickDeleteTask = () => {
    const { deleteTask, data } = this.props;
    deleteTask(data.id);
  };

  onBtnClickEditTask = () => {
    const { setEditTask, data } = this.props;
    setEditTask(data.id);
  };

  render() {
    const {
      day,
      title,
      label,
      text,
      isEdit,
      isDone,
      timeIsDone,
    } = this.props.data;

    const isOverdueTask = moment(day).isBefore(
      moment().format('DD.MM.YYYY HH:mm'),
    );

    const stylesTask = [
      'task',
      isOverdueTask ? '_isOverdueTask' : null,
    ].filter(x => x).join(' ');

    return (
      <>
        {isEdit ? (
          <AddTask data={this.props.data} />
        ) : (
            <div className={stylesTask}>
              {day !== 'Invalid date' && <p className="task__day">{day}</p>}
              <p className="task__title">{title}</p>
              <p className="task__text">{text}</p>
              <p className="task__label">
                Важность:
              {' '}
                {label}
              </p>
              {isDone && (
                <p className="task__timeIsDone">
                  Задача была закрыта:
                {' '}
                  {timeIsDone}
                </p>
              )}
              <button type="submit" className="task__btn" onClick={this.onBtnClickDeleteTask}>
                Удалить
            </button>
              {!isDone && (
                <button type="submit" className="task__btn" onClick={this.onBtnClickEditTask}>
                  Редактировать
            </button>
              )}
            </div>
          )}
      </>
    );
  }
}
