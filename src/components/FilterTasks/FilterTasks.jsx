// @flow
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import React, { PureComponent } from "react";
import type { Filter } from "../../interfaces/Filter";
import "./FilterTasks.scss";

interface Props {
  setFilter: (filter: Filter) => void;
  number: number;
}

export class FilterTasks extends PureComponent<Props> {
  setFilterAllHandler = () => {
    console.log(this.props.number);
    this.props.setFilter("all");
  };

  setFilterUsallyHandler = () => {
    this.props.setFilter("usally");
  };

  setFilterImportantHandler = () => {
    this.props.setFilter("important");
  };

  setFilterVeryImportantHandler = () => {
    this.props.setFilter("veryImportant");
  };

  render() {
    return (
      <>
        <h3>Фильтры</h3>
        <button onClick={this.setFilterAllHandler}>Все</button>
        <button onClick={this.setFilterUsallyHandler}>Обычные</button>
        <button onClick={this.setFilterImportantHandler}>Важные</button>
        <button onClick={this.setFilterVeryImportantHandler}>
          Очень важные
        </button>
      </>
    );
  }
}
