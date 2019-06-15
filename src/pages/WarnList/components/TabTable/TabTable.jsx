import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import CustomTable from './components/CustomTable';
// import EditDialog from './components/EditDialog';
// import DeleteBalloon from './components/DeleteBalloon';
// import data from './data';
import WarnService from '../../../../service/WarnService';

const TabPane = Tab.Item;

const tabs = [
  { tab: '待提醒', key: 'notwarned' },
  { tab: '已提醒', key: 'warned' },
  // { tab: '审核中', key: 'released' },
  // { tab: '已拒绝', key: 'rejected' },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      // warnedTeacherList: [],
      // notWarnedTeacherList: [],
      dataSource: {},
      tabKey: 'notwarned',
    };
    this.GenerateDataSource();
    // this.GenerateNotWarnedTeacherList();
    // this.GenerateWarnedTeacherList();

    this.columns = [
      {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
      },
      {
        title: '课程名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '上课时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '提醒发送时间',
        dataIndex: 'warnTime',
        key: 'warnTime',
      },
      // {
      //   title: '操作',
      //   key: 'action',
      //   render: (value, index, record) => {
      //     return (
      //       <span>
      //         <EditDialog
      //           index={index}
      //           record={record}
      //           getFormValues={this.getFormValues}
      //         />
      //         <DeleteBalloon
      //           handleRemove={() => this.handleRemove(value, index, record)}
      //         />
      //       </span>
      //     );
      //   },
      // },
    ];
  }
  GenerateDataSource() {
    // this.GenerateNotWarnedTeacherList();
    WarnService.getWarnList()
      .then((response) => {
        this.setState({
          dataSource: response.data,
        });
      });
  }

  // GenerateNotWarnedTeacherList() {
  //   WarnService.getNotWarnedTeacherList()
  //     .then((response) => {
  //       this.setState({
  //         notWarnedTeacherList: response.data,
  //       });
  //     });
  // }
  // GenerateWarnedTeacherList() {
  //   WarnService.getWarnedTeacherList()
  //     .then((response) => {
  //       this.setState({
  //         warnedTeacherList: response.data,
  //       });
  //     });
  // }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, 1);
    this.setState({
      dataSource,
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
        <IceContainer>
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
