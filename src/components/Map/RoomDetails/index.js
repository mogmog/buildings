import React, { Fragment } from 'react';
import { Row, Col, Card, Icon, Button } from 'antd';

import TankIconSmall from '../TankIconSmall';
import TankIconLarge from '../TankIconLarge';

import styles from './index.less';

export default props => (
  <Card>

    <Row>

      <Col span={12}>

        <h1> Meeting room A </h1>

      </Col>
    </Row>

    <Row>

      <dl className={styles.tankdetailslist}>
        {[
          { title: 'Total Capacity', name: '50 people' },
        ].map(item => (
          <Fragment>
            {' '}
            <dd>{item.title}</dd> <dt> {item.name}</dt> <dd style={{ display: 'table-row' }} />
          </Fragment>
        ))}
      </dl>

      <a>show more</a>
    </Row>
  </Card>
);
