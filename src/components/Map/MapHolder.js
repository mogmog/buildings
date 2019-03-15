import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { FlyToInterpolator, OrbitView, LinearInterpolator } from 'deck.gl';
import WebMercatorViewport from 'viewport-mercator-project';
import * as d3 from 'd3';
import RegionLayer from './Layers/RegionLayer';
import TankLayer from './Layers/TankLayer';
import PointLayer from './Layers/PointLayer';


const INITIAL_VIEW_STATE = {
  lookAt: [0, 0, 0],
  distance: OrbitView.getDistance({boundingBox: [1, 1, 1], fov: 30}),
  rotationX: 0,
  rotationOrbit: 0,
  orbitAxis: 'Y',
  fov: 30,
  minDistance: 0.5,
  maxDistance: 3,
  zoom: 1
};

const transitionInterpolator = new LinearInterpolator(['rotationOrbit']);

class MapHolder extends Component {
  constructor(props) {
    super(props);

    let self = this;

    self.state = {
      viewState: INITIAL_VIEW_STATE
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flyTo !== this.props.flyTo) {
      this.performFlyTo(this.props.flyTo);
    }
  }

  _rotateCamera = () => {
    const {viewState} = this.state;
    this.setState({
      viewState: {
        ...viewState,
        rotationOrbit: viewState.rotationOrbit + 20,
        transitionDuration: 1000,
        transitionInterpolator,
        onTransitionEnd: this._rotateCamera
      }
    });
  }

  performFlyTo(flyTo) {
    const round = num => Math.round(num * 100000) / 100000;

    /*dereference what is passed in via props, using existing values if not passed in.*/
    let {
      transitionDuration = 2000,
      longitude = this.state.viewState.longitude,
      latitude = this.state.viewState.latitude,
      zoom = this.state.viewState.zoom,
    } = flyTo;

    const viewState = {
      ...this.state.viewState,
      longitude: round(longitude),
      latitude: round(latitude),
      height: window.innerHeight,
      width: window.innerWidth,
      zoom: zoom,
      transitionDuration: transitionDuration,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    };

    this.setState({ viewState });
  }

  _onLoad = () => {
    this._rotateCamera();
  }

  render() {
    const { regions, tanks, tankClick } = this.props;

    return (
      <div>
        <DeckGL
          views={[new OrbitView()]}
          width="100%"
          height="100%"
          controller={true}
          viewState={this.state.viewState}
          onViewStateChange={({ viewState }) => this.setState({ viewState })}
          pickingRadius={10}
          onLoad={this._onLoad}
          ref={deck => {
            this.deckGL = deck;
          }}
        >
        {/*  <StaticMap
            mapboxApiAccessToken="pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
            mapStyle="mapbox://styles/mogmog/cjsncqrw301w51fqcvlocqjdr"
          />*/}

          {/*<RegionLayer data={regions} />*/}
          <PointLayer data={regions} />
         {/* <TankLayer data={tanks} onClick={tankClick} />*/}
        </DeckGL>
      </div>
    );
  }
}

export default MapHolder;
