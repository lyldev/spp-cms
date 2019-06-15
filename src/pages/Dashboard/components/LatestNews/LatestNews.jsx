import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import cx from 'classnames';

import './LatestNews.scss';
import styles from './index.module.scss';

import EvaluationService from '../../../../service/EvaluationService';
import NewsService from '../../../../service/NewsService';

const { Row, Col } = Grid;


export default class LatestNews extends Component {
  static displayName = 'LatestNews';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      latestNewsList: [],
      latestEvaluationList: [],
    };
    this.GenerateLatestNewsList();
    this.GenerateLatestEvaluationList();
  }

  GenerateLatestNewsList() {
    NewsService.getLatestNewsList()
      .then((response) => {
        this.setState({
          latestNewsList: response.data.latestNewsList,
        });
      });
  }

  GenerateLatestEvaluationList() {
    EvaluationService.getLatestEvaluationList()
      .then((response) => {
        this.setState({
          latestEvaluationList: response.data.latestEvaluationList,
        });
      });
  }

  render() {
    return (
      <div className={cx(styles.container, 'latest-news')}>
        <Row wrap gutter="20">
          <Col xxs="24" s="12" l="12">
            <IceContainer className={styles.cardContainer}>
              <h3 className={styles.cardTitle}>
                最新文章
                <a href="#" className={cx(styles.more, 'link')}>
                  更多
                </a>
              </h3>
              <div className={styles.items}>
                {this.state.latestNewsList.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx(styles.item, 'link')}>
                      <div className={styles.itemTitle}>{item.title}</div>
                      <div className={styles.itemTime}>{item.createTime.split('T')[0]}</div>
                    </a>
                  );
                })}
              </div>
            </IceContainer>
          </Col>
          <Col xxs="24" s="12" l="12">
            <IceContainer className={styles.cardContainer}>
              <h3 className={styles.cardTitle}>
                最新评论
                {/* <a href="#" className={cx(styles.more, 'link')}>
                  更多
                </a> */}
              </h3>
              <div className={styles.items}>
                {this.state.latestEvaluationList.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx(styles.item, 'link')}>
                      <div className={styles.itemComment}>
                        <div className={styles.commentTitle}>评分：{item.star}</div>
                        <div className={styles.commentTime}>评论内容：{item.review}</div>
                      </div>
                      {/* <div className={styles.commentNum}>{item.num}</div> */}
                    </a>
                  );
                })}
              </div>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
