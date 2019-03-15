import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { FlyToInterpolator, OrbitView, LinearInterpolator } from 'deck.gl';
import WebMercatorViewport from 'viewport-mercator-project';
import * as d3 from 'd3';
import BuildingLayer from './Layers/BuildingLayer';

const INITIAL_VIEW_STATE = {
  latitude:  51.539,
  longitude: 0.0,
  zoom: 12.5,
  minZoom: 1.5,
  pitch: 40,
  bearing: 0
};

export default class extends Component {
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


  render() {
    const { regions, tanks, tankClick } = this.props;

    return (
      <div>
        <DeckGL
          width="100%"
          height="100%"
          controller={true}
          viewState={this.state.viewState}
          onViewStateChange={({ viewState }) => this.setState({ viewState })}
          pickingRadius={10}
          ref={deck => {
            this.deckGL = deck;
          }}
        >
          <StaticMap
            mapboxApiAccessToken="pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
            mapStyle="mapbox://styles/mogmog/cjsncqrw301w51fqcvlocqjdr"
          />

          <BuildingLayer onClick={e=> this.props.onClick(e) } data={[{longitude : 0, latitude : 51.539}, {longitude : -0.118092, latitude : 51.509}]}/>

        </DeckGL>
      </div>
    );
  }
}


