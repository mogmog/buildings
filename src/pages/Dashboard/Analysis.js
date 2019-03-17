import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Menu, Dropdown, Carousel } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import MapCard   from '../../components/Map/MapCard';
import MapSwiper   from '../../components/Map/MapSwiper';
import StreetMap from '../../components/Map/StreetMap';

@connect(namespaces => ({
  building: namespaces.building,

  loading: namespaces.loading.effects['region/fetch'],
}))
class Analysis extends Component {
  state = {selectedIndex : 0 };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'building/fetch',
    });
  }



  render() {
    const {clickedOnBuilding} = this.state;
    const { building, tank, loading } = this.props;

    console.log(building);

    return (
      <GridContent>

        <MapSwiper
          map={
            <div>
              <StreetMap items={building.list} flyTo={ building.list.length ? {longitude : building.list[this.state.selectedIndex].longitude, latitude : building.list[this.state.selectedIndex].latitude} : null} />
            </div>
          }

          cards={
            <Carousel beforeChange={(e) => { this.setState({selectedIndex : e}) }}>
              {building.list.map(building => <Card><h3>{building.name}</h3></Card> ) }
            </Carousel>
          }

        />



        { clickedOnBuilding &&  <MapCard regions={region.list} getTanks={(region_id) => this.getTanks(region_id)} tanks={ tank.list } /> }

      </GridContent>
    );
  }
}

export default Analysis;
