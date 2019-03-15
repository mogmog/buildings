import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import MapCard   from '../../components/Map/MapCard';
import StreetMap from '../../components/Map/StreetMap';

@connect(namespaces => ({
  region: namespaces.region,
  tank: namespaces.tank,
  loading: namespaces.loading.effects['region/fetch'],
}))
class Analysis extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'region/fetch',
    });
  }

  getTanks = region_id => {
    const { dispatch } = this.props;

    dispatch({
      type: 'tank/fetch',
      payload: { region_id  },
    });
  };

  render() {
    const {} = this.state;
    const { region, tank, loading } = this.props;

    return (
      <GridContent>

          <StreetMap/>
          <MapCard regions={region.list} getTanks={(region_id) => this.getTanks(region_id)} tanks={ tank.list } />

      </GridContent>
    );
  }
}

export default Analysis;
