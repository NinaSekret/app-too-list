// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { addTask } from "../../actions/requests";
import { Task } from "../../interfaces";

import "./AddTask.scss";

interface OwnProps {
  data: Task;
}
type Props = OwnProps & DispatchFromProps & StateFromProps;

interface State {
  day: string;
  text: string;
  title: string;
  label: string;
  isDone: boolean;
  isAddTask: boolean;
}

class AddTask extends PureComponent<Props, State> {
  state = {
    day: "",
    text: "",
    title: "",
    label: "",
    isDone: false,
    isAddTask: false
  };

  onBtnClickHandler = (e: any) => {
    e.preventDefault();
    const { day, title, text, label, isDone } = this.state;
    const id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

    this.props.addTask(id, day, title, text, label, isDone);

    this.setState({
      day: "",
      text: "",
      title: "",
      label: ""
    });
  };

  onBtnClickNewTask = () => {
    const { isAddTask } = this.state;
    this.setState({ isAddTask: !isAddTask });
  };

  handleDateChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ day: e.currentTarget.value });
  };

  handleTitleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ title: e.currentTarget.value });
  };

  handleTextChange = (e: SyntheticInputEvent<HTMLTextAreaElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  handleLabelChange = (e: SyntheticInputEvent<HTMLSelectElement>): void => {
    this.setState({ label: e.currentTarget.value });
  };

  validate = () => {
    const { text, title, label } = this.state;
    if (text.trim() && title.trim() && label.trim()) {
      return true;
    }
    return false;
  };

  render() {
    const { day, text, title, label, isAddTask } = this.state;

    return (
      <>
        <div className="add__newButton-wrapper">
          <button className="add__newButton" onClick={this.onBtnClickNewTask}>
            {isAddTask ? `Скрыть` : `+ Добавить таску`}
          </button>
        </div>
        <form className="add">
          <label className="add__label" htmlFor="day">
            Дата
          </label>
          <input
            type="datetime-local"
            onChange={this.handleDateChange}
            className="add__day"
            value={day}
          />
          <label className="add__label" htmlFor="title">
            Заголовок
          </label>
          <input
            type="text"
            onChange={this.handleTitleChange}
            className="add__title"
            value={title}
          />
          <label className="add__label" htmlFor="text">
            Текст заметки
          </label>
          <textarea
            onChange={this.handleTextChange}
            className="add__text"
            value={text}
          />
          <div className="add__selectorLabel">
            <h3 className="add__selectorLabel__title">
              Выберите статус задачи
            </h3>
            <select
              className="add__selectorlabel__select"
              value={label}
              onChange={this.handleLabelChange}
            >
              <option value="usally">Обычная</option>
              <option value="important">Важная</option>
              <option value="veryImportant">Очень важная</option>
            </select>
          </div>
          <button
            className="add__sentButton"
            suppressHydrationWarning
            onClick={this.onBtnClickHandler}
            disabled={!this.validate()}
          >
            Добавить
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addTask
    },
    dispatch
  );

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  null,
  mapDispatchToProps
)(AddTask);
