import React, { Component, Suspense, Fragment } from 'react';
import { Card, List, Radio, Button } from 'antd';
import MapHolder from './MapHolder';
import MapOverlay from './MapOverlay/index';
import { Motion, spring } from 'react-motion';

import RegionList from './RegionList';
import TankDetails from './TankDetails';
import RoomDetails from './RoomDetails';
import IntervalChoice from './IntervalChoice';

const Blurrer = props => (
  <Motion defaultStyle={{ blur: 20 }} style={{ blur: spring(0) }}>
    {interpolatingStyle => (
      <div style={{ filter: `blur(${interpolatingStyle.blur}px)` }}>
        <Fragment>{props.children}</Fragment>
      </div>
    )}
  </Motion>
);

class MapCard extends Component {
  constructor(props) {
    super(props);

    let self = this;
  }

  state = {
    selectedRegion: null,
    selectedTank: null,
    clicked : false
  };

  regionSelect = region => {
    this.props.getTanks(region.id);
    this.setState({ selectedRegion: region });
  };

  tankSelect = tank => {
    this.setState({ selectedTank: e.object });
  };

  render() {
    const { regions, tanks } = this.props;
    const { selectedTank } = this.state;

    const getFlyTo = () =>
      this.state.selectedRegion
        ? {
            longitude: this.state.selectedRegion.longitude,
            latitude: this.state.selectedRegion.latitude,
            zoom: 18,
          }
        : null;

    return (
      <div>
        <Card style={{ height: '90vh' }} bodyStyle={{ padding: 0 }}>
          <div>
            <MapOverlay
              map={
                <div>
                  <MapHolder
                    tankSelect={this.tankSelect}
                    flyTo={getFlyTo()}
                    clicked={this.state.clicked}
                    regions={regions}
                    tanks={tanks}
                  />
                </div>
              }
              heading={
                <Blurrer>
                  <h1>Building A </h1>
                </Blurrer>
              }
              lhs={
                true && (
                  <Blurrer>
                    <TankDetails onClick={()=> {this.setState({clicked : true})}}/>
                  </Blurrer>
                )
              }
              rhs={
                this.state.clicked && <Fragment>
                <Blurrer>
                   <RoomDetails/>
                </Blurrer>
                </Fragment>}

            />
          </div>
        </Card>
      </div>
    );
  }
}

export default MapCard;
