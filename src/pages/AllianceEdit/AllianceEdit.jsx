

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EditableTable from './components/EditableTable';

// import './AllianceEdit.scss';

export default class AllianceEdit extends Component {
  static displayName = 'AllianceEdit';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '场馆管理', link: '' },
      { text: '展教联盟', link: '#/site/allianceedit' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <EditableTable />
      </div>
    );
  }
}
