// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import AddTask from './components/AddTask/AddTask';
import TasksList from './components/TasksList/TasksList';
import { FilterTasks } from './components/FilterTasks/FilterTasks';
import { addTask } from './actions/requests';
import { setFilter } from './actions/filters';
import './App.scss';

interface OwnProps { } // tslint:disable-line:no-empty-interface
// eslint-disable-next-line no-use-before-define
type Props = OwnProps & DispatchFromProps;

export class App extends PureComponent<Props> {
  render() {
    return (
      <div className="app__wrapper">
        <h3 className="app__title">Todo-list js</h3>
        <FilterTasks setFilter={this.props.setFilter} />
        <TasksList />
        <AddTask />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    addTask,
    setFilter,
  },
  dispatch,
);

type DispatchFromProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  null,
  mapDispatchToProps,
)(App);
