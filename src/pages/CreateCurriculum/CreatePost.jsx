

import React, { Component } from 'react';
import ContentEditor from './components/ContentEditor';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

import './CreatePost.scss';

export default class CreatePost extends Component {
  static displayName = 'CreateCurriculum';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '课程管理', link: '' },
      { text: '添加课程', link: '#/curriculum/create' },
    ];
    return (
      <div className="create-post-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ContentEditor />
      </div>
    );
  }
}
