//@flow

import * as React from "react";
import { ToDo } from "../ToDo/ToDo";
import { Task } from "../../interfaces";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getTasks, deleteTask } from "../../actions/requests";
import "./TasksList.scss";

interface IOwnProps {}
type IProps = IOwnProps & StateFromProps & DispatchFromProps;

class TasksList extends React.Component<IProps> {
  componentDidMount() {
    this.props.getTasks();
  }

  getVisibleTasks() {
    const { filter, tasks } = this.props;

    switch (filter) {
      case "all":
        return tasks;
      case "usally":
        return tasks.filter((task: Task) => task.label === "usally");
      case "important":
        return tasks.filter((task: Task) => task.label === "important");
      case "veryImportant":
        return tasks.filter((task: Task) => task.label === "veryImportant");
    }
  }

  renderTasksList = () => {
    const { tasks } = this.props;

    if (tasks.length) {
      return this.getVisibleTasks().map((item: Task) => (
        <ToDo key={item.id} data={item} deleteTask={this.props.deleteTask} />
      ));
    }

    return <p>Нет задач</p>;
  };

  render() {
    const { tasks } = this.props;

    return (
      <div className="tasksList">
        {this.renderTasksList()}
        {tasks.length > 0 && (
          <strong className={"tasksList__count"}>
            Всего записей: {this.getVisibleTasks().length}
          </strong>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.requests.tasks,
    isloading: state.requests.isloading,
    filter: state.filters.filter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTasks,
      deleteTask
    },
    dispatch
  );

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;
type StateFromProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
