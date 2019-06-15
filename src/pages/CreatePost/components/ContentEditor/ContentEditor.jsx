import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

// import RichEditor from './RichEditor';

import NewsService from '../../../../service/NewsService';

const { Row, Col } = Grid;
const FormItem = Form.Item;

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        desc: '',
        author: '',
        body: null,
        cats: [],
      },
    };
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      NewsService.addNews(values)
        .then((response) => {
          if (response.data.success) {
            Message.success('提交成功');
          } else {
            Message.warning(response.data.errmsg);
          }
        });
    });
  };

  render() {
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer>
            <h2 style={styles.title}>添加资讯</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="标题" required>
                    <IceFormBinder name="title" required message="标题必填">
                      <Input placeholder="这里填写资讯标题" />
                    </IceFormBinder>
                    <IceFormError name="title" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="作者" required>
                    <IceFormBinder
                      name="author"
                      required
                      message="作者信息必填"
                    >
                      <Input placeholder="填写作者名称" />
                    </IceFormBinder>
                    <IceFormError name="author" />
                  </FormItem>
                </Col>

              </Row>
              <FormItem label="图片">
                <IceFormBinder name="picture">
                  <Input placeholder="这里填写图片地址" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="正文" required>
                <IceFormBinder name="content">
                  <Input.TextArea placeholder="填写资讯正文" style={{ height: '400em' }} />
                </IceFormBinder>
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  发布资讯
                </Button>
              </FormItem>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0px 0px 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
};
