import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';
import SiteService from '../../../../service/SiteService';

// const MOCK_DATA = [
//   {
//     name: '展教联盟',
//     shortName: 'alliance',
//     unitNum: '2',
//   },
//   {
//     name: '特色场馆',
//     shortName: 'museum',
//     unitNum: '3',
//   },
//   {
//     name: '教学管理站',
//     shortName: 'station',
//     unitNum: '10',
//   },

// ];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
    this.generateData();
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '缩写名',
        dataIndex: 'shortName',
        key: 'shortName',
        width: 150,
      },
      {
        title: '单位数',
        width: 150,
        dataIndex: 'unitNum',
        key: 'unitNum',
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

  generateData = () => {
    // eslint-disable-next-line prefer-const
    let originData = [
      {
        name: '展教联盟',
        shortName: 'alliance',
        unitNum: '0',
      },
      {
        name: '特色场馆',
        shortName: 'museum',
        unitNum: '0',
      },
      {
        name: '教学管理站',
        shortName: 'station',
        unitNum: '0',
      },
    ];
    SiteService.getSiteCount()
      .then((response) => {
        console.log(response.data.allianceCount);
        console.log(response.data.museumCount);
        console.log(response.data.stationCount);
        originData[0].unitNum = response.data.allianceCount;
        originData[1].unitNum = response.data.museumCount;
        originData[2].unitNum = response.data.stationCount;

        this.setState({
          dataSource: originData,
        });
      });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource } = this.state;
    dataSource.splice(index, 1);
    this.setState({
      dataSource,
    });
  };

  render() {
    return (
      <div className="tab-table">
        <IceContainer>
          <CustomTable
            dataSource={this.state.dataSource}
            columns={this.columns}
            hasBorder={false}
          />
        </IceContainer>
      </div>
    );
  }
}
