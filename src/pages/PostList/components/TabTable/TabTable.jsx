import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Message } from '@alifd/next';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import NewsService from '../../../../service/NewsService';

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
      latestNewsList: [],
      // dataSource: {},
      // tabKey: 'all',
    };
    this.GenerateLatestNewsList();
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        width: 150,
      },

      {
        title: '发布时间',
        dataIndex: 'createTime',
        key: 'createTime',
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

  GenerateLatestNewsList() {
    NewsService.getLatestNewsList()
      .then((response) => {
        this.setState({
          latestNewsList: response.data.latestNewsList,
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
    this.state.latestNewsList[dataIndex] = values;
    // news = values;
    NewsService.updateNews(this.state.latestNewsList[dataIndex])
      .then((response) => {
        if (response.data.success) {
          // this.state.latestNewsList.splice(index, 1);
          this.setState({
            latestNewsList: this.state.latestNewsList,
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
    NewsService.deleteNews(this.state.latestNewsList[index])
      .then((response) => {
        if (response.data.success) {
          this.state.latestNewsList.splice(index, 1);
          this.setState({
            latestNewsList: this.state.latestNewsList,
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
                    dataSource={this.state.latestNewsList}
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
