// @flow

import React, { PureComponent } from 'react';
import type { Filter } from '../../interfaces/Filter';
import './FilterTasks.scss';

interface Props {
  setFilter: (filter: Filter) => void;
}

interface State {
  selected: string;
}

// eslint-disable-next-line import/prefer-default-export
export class FilterTasks extends PureComponent<Props, State> {
  state = {
    selected: 'all',
  };

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const { setFilter } = this.props;
    switch (value) {
      case 'all':
        setFilter('all');
        break;
      case 'usally':
        setFilter('usally');
        break;
      case 'important':
        setFilter('important');
        break;
      case 'veryImportant':
        setFilter('veryImportant');
        break;
      default:
        setFilter('all');
    }

    this.setState({
      selected: value,
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <>
        <div className="filterTasks">
          <label className="filterTasks__label">
            <input
              type="radio"
              value="all"
              name="setFilter"
              checked={selected === 'all'}
              onClick={this.handleInputChange}
            />
            Все
          </label>
          <label className="filterTasks__label">
            <input
              type="radio"
              value="usally"
              name="setFilter"
              checked={selected === 'usally'}
              onClick={this.handleInputChange}
            />
            Обычные
          </label>
          <label className="filterTasks__label">
            <input
              type="radio"
              value="important"
              name="setFilter"
              checked={selected === 'important'}
              onClick={this.handleInputChange}
            />
            Важные
          </label>
          <label className="filterTasks__label">
            <input
              type="radio"
              value="veryImportant"
              name="setFilter"
              checked={selected === 'veryImportant'}
              onClick={this.handleInputChange}
            />
            Очень важные
          </label>
        </div>
      </>
    );
  }
}
