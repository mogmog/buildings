import React, { Component, Suspense, Fragment } from 'react';
import { Card } from 'antd';
import { Motion, spring } from 'react-motion';

import styles from './index.less';

class BalanceCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.balancecard}>
        <Card bordered={false} bodyStyle={{ padding: '20px' }}>
          <Motion
            defaultStyle={{ balance: 0 }}
            style={{ balance: spring(298000, { precision: 50 }) }}
          >
            {interpolatingStyle => (
              <div>
                <h4>Balance</h4>
                <h1>${Number.parseInt(interpolatingStyle.balance)}.00</h1>
                <h4>1120bl</h4>
              </div>
            )}
          </Motion>
        </Card>
      </div>
    );
  }
}

export default BalanceCard;
