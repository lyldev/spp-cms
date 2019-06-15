

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EditableTable from './components/EditableTable';
// import './MuseumEdit.scss';

export default class MuseumEdit extends Component {
  static displayName = 'MuseumEdit';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '场馆管理', link: '' },
      { text: '特色场馆', link: '#/site/museumedit' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <EditableTable />
      </div>
    );
  }
}
