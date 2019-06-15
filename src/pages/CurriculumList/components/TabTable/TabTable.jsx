import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Message } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import CurriculumService from '../../../../service/CurriculumService';

const TabPane = Tab.Item;

const tabs = [
  { tab: '全部', key: 'all' },
  // { tab: '已发布', key: 'released' },
  // { tab: '审核中', key: 'review' },
  // { tab: '已拒绝', key: 'rejected' },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      latestCurriculumList: [],
      // dataSource: {},
      // tabKey: 'all',
    };
    this.GenerateLatestCurriculumList();
    this.columns = [
      {
        title: '课程名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '讲师',
        dataIndex: 'teacher',
        key: 'teacher',
        width: 150,
      },

      {
        title: '上课时间',
        dataIndex: 'time',
        key: 'time',
        width: 150,
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
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

  GenerateLatestCurriculumList() {
    CurriculumService.getLatestCurriculumList()
      .then((response) => {
        this.setState({
          latestCurriculumList: response.data.latestCurriculumList,
        });
      });
  }

  // componentDidMount() {
  //   axios
  //     .get('/mock/tab-table.json')
  //     .then((response) => {
  //       this.setState({
  //         dataSource: response.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  getFormValues = (dataIndex, values) => {
    // const { dataSource, tabKey } = this.state;
    // dataSource[tabKey][dataIndex] = values;
    // this.setState({
    //   dataSource,
    // });
    this.state.latestCurriculumList[dataIndex] = values;
    // curriculum = values;
    CurriculumService.updateCurriculum(this.state.latestCurriculumList[dataIndex])
      .then((response) => {
        if (response.data.success) {
          // this.state.latestCurriculumList.splice(index, 1);
          this.setState({
            latestCurriculumList: this.state.latestCurriculumList,
          });
          Message.success('---更新成功---');
        } else {
          Message.warning(response.data.errmsg);
        }
      });
  };

  handleRemove = (value, index) => {
    // const { dataSource, tabKey } = this.state;
    // dataSource[tabKey].splice(index, 1);
    // this.setState({
    //   dataSource,
    // });
    CurriculumService.deleteCurriculum(this.state.latestCurriculumList[index])
      .then((response) => {
        if (response.data.success) {
          this.state.latestCurriculumList.splice(index, 1);
          this.setState({
            latestCurriculumList: this.state.latestCurriculumList,
          });
          Message.success('---删除成功---');
        } else {
          Message.warning(response.data.errmsg);
        }
      });
  };

  handleTabChange = (key) => {
    // this.setState({
    //   tabKey: key,
    // });
    return key; // 随便加的
  };

  render() {
    // const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer style={{ padding: '0 20px 20px' }}>
          <Tab onChange={this.handleTabChange}>
            {tabs.map((item) => {
              return (
                <TabPane title={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={this.state.latestCurriculumList}
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
