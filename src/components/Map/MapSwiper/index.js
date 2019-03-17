import React, { Fragment, Component, Suspense } from 'react';
import { Card, Carousel } from 'antd';
import MapHolder from '../MapHolder';
import styles from './index.less';

class MapSwiper extends Component {
  constructor(props) {
    super(props);

    let self = this;
  }

  render() {
    return (
      <Fragment>
        <div className={styles.map}>{this.props.map}</div>


        <div className={styles.cards}>

          {this.props.cards}

        </div>


      </Fragment>
    );
  }
}

export default MapSwiper;
