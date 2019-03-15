import React, { Fragment, Component, Suspense } from 'react';
import { Card } from 'antd';
import MapHolder from '../MapHolder';
import styles from './index.less';

class MapTitle extends Component {
  constructor(props) {
    super(props);

    let self = this;
  }

  render() {
    return (
      <Fragment>
        <div className={styles.map}>{this.props.map}</div>

        <div className={styles.heading}>{this.props.heading}</div>

        <div className={styles.lhs}>{this.props.lhs}</div>

        <div className={styles.rhs}>{this.props.rhs}</div>
      </Fragment>
    );
  }
}

export default MapTitle;
