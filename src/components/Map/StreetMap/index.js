import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { FlyToInterpolator, OrbitView, LinearInterpolator } from 'deck.gl';
import WebMercatorViewport from 'viewport-mercator-project';
import * as d3 from 'd3';
import BuildingLayer from './Layers/BuildingLayer';
import BuildingLayer2 from './Layers/BuildingsLayer2';

const INITIAL_VIEW_STATE = {
  latitude:  51.539,
  longitude: 0.0,
  zoom: 11.5,
  minZoom: 1.5,
  pitch: 60,
  bearing: 0,

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
    /*this is not particularly clear what is going on*/
    let {
      transitionDuration = 500,
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

  onClickHandler = (event) => {
    const pickInfo = this.deckGL.pickObject({x: event.clientX, y: event.clientY });
    console.log(event.clientX);
  }

  render() {
    const { items, tanks, tankClick } = this.props;

    return (
      <div>
        <DeckGL
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

          <BuildingLayer2 data={items}/>

        </DeckGL>
      </div>
    );
  }
}


