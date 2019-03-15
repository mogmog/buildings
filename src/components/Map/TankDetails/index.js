import React, { Fragment } from 'react';
import { Row, Col, Card } from 'antd';

import TankIconSmall from '../TankIconSmall';
import TankIconLarge from '../TankIconLarge';

import styles from './index.less';

export default props => (
  <Card>

    <Row>
      <Col span={12}>
        <TankIconLarge />
      </Col>

      <Col span={12}>

      </Col>
    </Row>

    <Row>
      <h2>Building "A"</h2>

      <dl className={styles.tankdetailslist}>
        {[
          { title: 'Total Capacity', name: '100 people' },
          { title: 'Bought', name: '2017' },
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
