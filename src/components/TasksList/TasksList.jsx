// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { ToDo } from '../ToDo/ToDo';
import { Task } from '../../interfaces';
import { getTasks, deleteTask, setEditTask } from '../../actions/requests';
import './TasksList.scss';

interface OwnProps { }

interface State {
  isAddTask: boolean;
}
type Props = OwnProps & StateFromProps & DispatchFromProps;

class TasksList extends PureComponent<Props, State> {
  state = {
    isAddTask: false,
  };

  componentDidMount() {
    this.props.getTasks();
  }

  onBtnClickNewTask = () => {
    const { isAddTask } = this.state;
    this.setState({ isAddTask: !isAddTask });
  };

  getVisibleTasks(): any {
    const { filter, tasks } = this.props;

    switch (filter) {
      case 'all':
        return tasks;
      case 'usally':
        return tasks.filter((task: Task) => task.label === 'usally');
      case 'important':
        return tasks.filter((task: Task) => task.label === 'important');
      case 'veryImportant':
        return tasks.filter((task: Task) => task.label === 'veryImportant');
      default:
        return tasks;
    }
  }

  renderTasksList = () => {
    if (this.getVisibleTasks().length) {
      return this.getVisibleTasks().map((item: Task) => (
        <ToDo
          key={item.id}
          data={item}
          deleteTask={this.props.deleteTask}
          setEditTask={this.props.setEditTask}
        />
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
          <strong className="tasksList__count">
            Всего записей:
            {' '}
            {this.getVisibleTasks().length}
          </strong>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.requests.tasks,
  isloading: state.requests.isloading,
  filter: state.filters.filter,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    getTasks,
    deleteTask,
    setEditTask,
  },
  dispatch,
);

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;
type StateFromProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksList);
