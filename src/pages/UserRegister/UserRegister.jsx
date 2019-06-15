/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import AdminService from '../../service/AdminService';

@withRouter
class UserRegister extends Component {
  static displayName = 'UserRegister';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
      },
    };
  }

  checkPassword = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 4) {
      callback('密码必须大于4位');
    } else if (values.length > 10) {
      callback('密码必须小于10位');
    } else {
      callback();
    }
  };

  checkPassword2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.password) {
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

  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      AdminService.register(values.name, values.password)
        .then((response) => {
          if (response.data.success) {
            Message.success('---普通管理员注册成功，请登录---');
            this.props.history.push('/user/login');
          } else {
            Message.warning(response.data.errmsg);
          }
        });

      // Message.success('注册成功');
      //  package.json中默认的theme
      // "theme": "@icedesign/theme",
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>注 册</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="name" required message="请输入正确的用户名">
                <Input
                  size="large"
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="name" />
            </div>

            {/* <div style={styles.formItem}>
              <IceIcon type="mail" size="small" style={styles.inputIcon} />
              <IceFormBinder
                type="email"
                name="email"
                required
                message="请输入正确的邮箱"
              >
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="邮箱"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="email" />
            </div> */}

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder
                name="password"
                required
                validator={this.checkPassword}
              >
                <Input
                  htmlType="password"
                  size="large"
                  placeholder="至少4位密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder
                name="rePassword"
                required
                validator={(rule, values, callback) =>
                  this.checkPassword2(rule, values, callback, this.state.value)
                }
              >
                <Input
                  htmlType="password"
                  size="large"
                  placeholder="确认密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="rePassword" />
            </div>

            <div className="footer">
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
                size="large"
              >
                注 册
              </Button>
              <Link to="/user/login" style={styles.tips}>
                使用已有账户登录
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserRegister;
