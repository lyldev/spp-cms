/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Checkbox, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import AdminService from '../../service/AdminService';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';


@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log(values);
      AdminService.login(values.name, values.password)
        .then((response) => {
          if (response.data.success) {
            const authority = response.data.admin.authority;
            switch (authority) {
              case 'alliance':
                Message.success('--- 展教联盟管理员 登录成功 ---');
                break;
              case 'museum':
                Message.success('--- 特色场馆管理员 登录成功 ---');
                break;
              case 'station':
                Message.success('--- 教学管理站管理员 登录成功 ---');
                break;
              case 'super':
                Message.success('--- 超级管理员 登录成功 ---');
                break;
              default:
                break;
            }
            if (authority === 'alliance') {
              Message.success('--- 展教联盟管理员 登录成功 ---');
            } else {
              Message.success('--- 超级管理员 登录成功 ---');
            }
            window.adminName = response.data.admin.name;
            // 设置管理员权限
            setAuthority(response.data.admin.authority);
            // 重新渲染页面
            reloadAuthorized();
            this.props.history.push('/dashboard/monitor');
          } else {
            console.log('errmsg', response.data.errmsg);
            Message.warning(response.data.errmsg);
          }
        });
      // Message.success('登录成功');
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="name" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="name" />
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox style={styles.checkbox}>记住账号</Checkbox>
              </IceFormBinder>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" style={styles.tips}>
                立即注册
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

export default UserLogin;
