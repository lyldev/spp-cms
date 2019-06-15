/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './UserForm.scss';

import AdminService from '../../../../service/AdminService';

const { Row, Col } = Grid;
const Toast = Message;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        authority: null,
        password: '',
        rePassword: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 4) {
      callback('密码必须大于4位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      AdminService.addAdmin(values)
        .then((response) => {
          if (response.data.success) {
            Toast.success('添加成功');
          } else {
            Message.warning(`添加失败:${response.data.errmsg}`);
          }
        });
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加用户</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户名：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="name" required message="必填">
                    <Input placeholder="请输入用户名" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              {/* <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  昵称：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="displayName">
                    <Input placeholder="请输入昵称" />
                  </IceFormBinder>
                  <IceFormError name="displayName" />
                </Col>
              </Row> */}

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮箱"
                  >
                    <Input
                      placeholder="ice-admin@alibaba-inc.com"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              {/* <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  用户组：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="userGroup">
                    <Select
                      placeholder="请选择..."
                      dataSource={[
                        { label: '管理员', value: 'administrator' },
                        { label: '投稿者', value: 'contributor' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row> */}

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  权限：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder name="authority">
                    <Select
                      placeholder="请选择..."
                      dataSource={[
                        { label: '展教联盟管理员', value: 'alliance' },
                        { label: '特色场馆管理员', value: 'museum' },
                        { label: '教学管理站管理员', value: 'station' },
                        { label: '区科协（超级）管理员', value: 'super' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  密码：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="password"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col xxs="16" s="12" l="10">
                  <IceFormBinder
                    name="rePassword"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="rePassword" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
