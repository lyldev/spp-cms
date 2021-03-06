import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Message } from '@alifd/next';
import CellEditor from './CellEditor';
import './EditableTable.scss';
import MuseumService from '../../../../service/MuseumService';


export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    // this.generateData = this.generateData.bind(this);
    this.generateData();
  }
  generateData() {
    MuseumService.getList()
      .then((response) => {
        if (response.data.success) {
          console.log('---特色场馆列表查询成功---');
          // return response.data.museumList;
          this.setState({ dataSource: response.data.museumList });
        } else {
          console.log('---特色场馆列表查询失败---');
          this.setState(
            {
              dataSource: [
                {
                  id: '查询失败',
                  name: '查询失败',
                  picture: '查询失败',
                  introduction: '查询失败',
                },
              ],
            });
        }
      });
  }
  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  addNewItem = () => {
    MuseumService.addMuseum({
      name: '新场馆',
      picture: '暂无',
      introduction: '暂无',
    }).then((response) => {
      if (response.data.success) {
        Message.success('---添加成功---');
        this.state.dataSource.push({
          id: response.data.id,
          name: '新场馆',
          picture: '暂无',
          introduction: '暂无',
        });
        this.setState({
          dataSource: this.state.dataSource,
        });
      } else {
        Message.warning(response.data.errmsg);
      }
    });
  };

  deleteItem = (index) => {
    MuseumService.deleteMuseum(this.state.dataSource[index])
      .then((response) => {
        if (response.data.success) {
          this.state.dataSource.splice(index, 1);
          this.setState({
            dataSource: this.state.dataSource,
          });
          Message.success('---删除成功---');
        } else {
          Message.warning(response.data.errmsg);
        }
      });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} text>
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    MuseumService.updateMuseum(this.state.dataSource[index])
      .then((response) => {
        if (response.data.success) {
          // this.state.dataSource[index][valueKey] = value;
          this.setState({
            dataSource: this.state.dataSource,
          });
          Message.success('---更新成功---');
        } else {
          Message.warning(response.data.errmsg);
        }
      });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };


  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={40} title="id" cell={this.renderEditor.bind(this, 'id')} />
            <Table.Column
              width={140}
              title="name"
              cell={this.renderEditor.bind(this, 'name')}
            />
            <Table.Column
              width={220}
              title="picture"
              cell={this.renderEditor.bind(this, 'picture')}
            />
            <Table.Column
              width={280}
              title="introduction"
              cell={this.renderEditor.bind(this, 'introduction')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
};
