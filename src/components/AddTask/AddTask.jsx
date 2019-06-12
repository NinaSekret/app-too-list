// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import moment from 'moment';
import { addTask, editTask } from '../../actions/requests';
import { Task } from '../../interfaces';

import './AddTask.scss';

interface OwnProps {
  data?: Task;
}
type Props = OwnProps & DispatchFromProps;

interface State {
  day: string;
  text: string;
  title: string;
  label: string;
  isDone: boolean;
  isAddTask: boolean;
}

class AddTask extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      text: '',
      title: '',
      label: 'usally',
      isDone: false,
      isAddTask: false,
    };
  }

  componentDidMount() {
    if (this.props.data) {
      const { day, text, title, label, isDone } = this.props.data;
      this.setState({
        day: moment(day, 'DD.MM.YYYY HH:mm').format(
          'YYYY-MM-DDTHH:mm',
        ),
        text,
        title,
        label,
        isDone,
      });
    }
  }

  onBtnClickEditTask = () => {
    if (this.props.data) {
      const { id } = this.props.data;
      const {
        day, title, text, label, isDone
      } = this.state;
      const timeIsDone = isDone ? moment().format('DD.MM.YYYY HH:mm') : '';
      const editDay = moment(day, 'YYYY-MM-DDTHH:mm').format(
        'DD.MM.YYYY HH:mm',
      );

      this.props.editTask(id, editDay, text, title, label, isDone, timeIsDone);
    }
  };

  onBtnClickAddTask = () => {
    const {
      day, title, text, label, isDone
    } = this.state;
    const id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

    const formatedDay = moment(day, 'YYYY-MM-DDTHH:mm').format(
      'DD.MM.YYYY HH:mm',
    );
    this.props.addTask(id, formatedDay, text, title, label, isDone);

    this.setState({
      day: '',
      text: '',
      title: '',
      label: '',
    });
  };

  onBtnClickNewTask = () => {
    const { isAddTask } = this.state;
    this.setState({ isAddTask: !isAddTask });
  };

  handleInputChange = (
    event: SyntheticInputEvent<HTMLInputElement & HTMLSelectElement>,
  ) => {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    const { text, title, label } = this.state;
    if (!text || !title || !label) return false;
    if (text.trim() && title.trim() && label.trim()) {
      return true;
    }
    return false;
  };

  render() {
    const { day, text, title, label, isAddTask, isDone } = this.state;
    const { data } = this.props;

    const isReallyEditing = Boolean(data && data.isEdit);
    const shouldRenderForm = isReallyEditing || isAddTask;
    return (
      <>
        {!isReallyEditing && (
          <div className="add__newButton-wrapper">
            <button type="submit" className="add__newButton" onClick={this.onBtnClickNewTask}>
              {isAddTask ? 'Скрыть' : '+ Добавить таску'}
            </button>
          </div>
        )}
        {shouldRenderForm && (
          <form className="add">
            <label className="add__label">Дата</label>
            <input
              type="datetime-local"
              name="day"
              onChange={this.handleInputChange}
              className="add__day"
              value={day}
            />
            <label className="add__label">Заголовок</label>
            <input
              type="text"
              name="title"
              onChange={this.handleInputChange}
              className="add__title"
              value={title}
            />
            <label className="add__label">Текст заметки</label>
            <textarea
              name="text"
              onChange={this.handleInputChange}
              className="add__text"
              value={text}
            />
            <div className="add__selectorLabel">
              <h3 className="add__selectorLabel__title">
                Выберите статус задачи
              </h3>
              <select
                name="label"
                className="add__selectorLabel__select"
                value={label}
                onChange={this.handleInputChange}
              >
                <option value="usally">Обычная</option>
                <option value="important">Важная</option>
                <option value="veryImportant">Очень важная</option>
              </select>
            </div>
            {isReallyEditing && (
              <>
                <label className="add__label">Отметить как выполнено: </label>
                <input
                  type="checkbox"
                  name="isDone"
                  checked={isDone}
                  onChange={this.handleInputChange}
                />
                <button
                  type="submit"
                  className="add__sentButton"
                  onClick={this.onBtnClickEditTask}
                  disabled={!this.validate()}
                >
                  Сохранить
                </button>
              </>
            )}
            {!isReallyEditing && (
              <button
                type="submit"
                className="add__sentButton"
                onClick={this.onBtnClickAddTask}
                disabled={!this.validate()}
              >
                Добавить
              </button>
            )}
          </form>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    addTask,
    editTask,
  },
  dispatch,
);

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  null,
  mapDispatchToProps,
)(AddTask);
