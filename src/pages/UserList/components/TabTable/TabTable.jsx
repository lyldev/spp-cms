import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Message } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

import AdminService from '../../../../service/AdminService';

const TabPane = Tab.Item;

const tabs = [{ tab: '全部', key: 'all' }];

export default class TabTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tabKey: 'all',
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 50,
      },
      {
        title: '管理员用户名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '权限',
        dataIndex: 'authority',
        key: 'authority',
        width: 120,
      },
      {
        title: '注册时间',
        dataIndex: 'regTime',
        key: 'regTime',
        width: 150,
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                getFormValues={this.getFormValues}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    AdminService.getAdminList()
      .then((response) => {
        if (response.data.success) {
          this.setState({
            dataSource: {
              all: response.data.adminList,
            },
          });
        } else {
          Message.warning(response.data.errmsg);
        }
      });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;

    dataSource[tabKey][dataIndex] = values;
    const newAdmin = dataSource[tabKey][dataIndex];
    AdminService.updateAdmin(newAdmin)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            dataSource,
          });
          Message.success('更新成功');
        } else {
          Message.warning('更新失败');
        }
      });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    const admin = dataSource[tabKey][index];
    AdminService.deleteAdmin(admin)
      .then((response) => {
        if (response.data.success) {
          dataSource[tabKey].splice(index, 1);
          this.setState({
            dataSource,
          });
          Message.success('删除成功');
        } else {
          Message.warning('删除失败');
        }
      });
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane title={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={dataSource[this.state.tabKey]}
                    columns={this.columns}
                    hasBorder={false}
                  />
                </TabPane>
              );
            })}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
