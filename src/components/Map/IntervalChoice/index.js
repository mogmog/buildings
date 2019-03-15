import { Radio } from 'antd';
import React from 'react';
import styles from './index.less'

export default (props) => (
  <div className={styles.intervalchoice}>
    <Radio.Group defaultValue="a" buttonStyle="outline">
    <Radio.Button value="a">1 day</Radio.Button>
    <Radio.Button value="b">1 mon</Radio.Button>
    <Radio.Button value="c">6 mon</Radio.Button>
    <Radio.Button value="d">1 year</Radio.Button>
  </Radio.Group>
  </div>
)
