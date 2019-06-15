import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

// import RichEditor from './RichEditor';

import CurriculumService from '../../../../service/CurriculumService';

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

      CurriculumService.addCurriculum(values)
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
            <h2 style={styles.title}>添加课程</h2>
            <Form labelAlign="top" style={styles.form}>
              <Row>
                <Col span="11">
                  <FormItem label="课程所属大学" required>
                    <IceFormBinder name="parentId" required message="课程所属大学必填">
                      <Input placeholder="这里填写课程所属大学" />
                    </IceFormBinder>
                    <IceFormError name="parentId" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="课程名称" required>
                    <IceFormBinder name="name" required message="课程名称必填">
                      <Input placeholder="这里填写课程名称" />
                    </IceFormBinder>
                    <IceFormError name="name" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="课程讲师" required>
                    <IceFormBinder
                      name="teacher"
                      required
                      message="讲师信息必填"
                    >
                      <Input placeholder="填写讲师姓名" />
                    </IceFormBinder>
                    <IceFormError name="teacher" />
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="上课时间" required>
                    <IceFormBinder name="time" required message="上课时间">
                      <Input placeholder="这里填写上课时间" />
                    </IceFormBinder>
                    <IceFormError name="time" />
                  </FormItem>
                </Col>
              </Row>

              <FormItem label="课程图片">
                <IceFormBinder name="picture">
                  <Input placeholder="这里填写图片地址" />
                </IceFormBinder>
              </FormItem>
              <FormItem label="课程介绍" required>
                <IceFormBinder name="introduction">
                  <Input.TextArea placeholder="填写课程介绍" style={{ height: '400em' }} />
                </IceFormBinder>
              </FormItem>
              <FormItem label=" ">
                <Button type="primary" onClick={this.handleSubmit}>
                  发布课程
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
