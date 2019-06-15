

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';

import './UserList.scss';

export default class UserList extends Component {
  static displayName = 'UserList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '管理员管理', link: '' },
      { text: '管理员列表', link: '#/user/list' },
    ];
    return (
      <div className="user-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
