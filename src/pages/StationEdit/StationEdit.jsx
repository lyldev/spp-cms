

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EditableTable from './components/EditableTable';

// import './StationEdit.scss';

export default class StationEdit extends Component {
  static displayName = 'StationEdit';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '场馆管理', link: '' },
      { text: '教学管理站', link: '#/site/stationedit' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <EditableTable />
      </div>
    );
  }
}
