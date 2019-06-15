

import React, { Component } from 'react';
import ContentEditor from './components/ContentEditor';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

import './CreatePost.scss';

export default class CreatePost extends Component {
  static displayName = 'CreatePost';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '资讯管理', link: '' },
      { text: '添加资讯', link: '#/post/create' },
    ];
    return (
      <div className="create-post-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <ContentEditor />
      </div>
    );
  }
}
