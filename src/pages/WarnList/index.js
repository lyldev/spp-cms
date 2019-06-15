import React, { Component } from 'react';
import TabTable from './components/TabTable';

export default class WarnList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="warn-list-page">
        <TabTable />
      </div>
    );
  }
}
