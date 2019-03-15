import { ScatterplotLayer, CompositeLayer, TextLayer, IconLayer } from 'deck.gl';
import tanklayersquare from "../Assets/TankLayer_BlueSquare.svg";
import tanklayercircles from "../Assets/TankLayer_Circles.svg";

import * as d3 from 'd3';

var zoomToOpacitySquare = d3.scaleLinear().domain([1, 20]).range([0, 120]);
var zoomToOpacityCircles = d3.scaleLinear().domain([1, 20]).range([0, 255]);

class TankLayerBlueSquare extends IconLayer {
  constructor(props) {
    let params = {
      transitions: {

        getColor: {
          easing: d3.easeCubicInOut,
          duration: 100,
        },
      },

      id: 'tank-layer-square',
      pickable: true,

      iconAtlas: tanklayersquare,
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          anchorY: 10,
          mask: false,
        },
      },

      data: props.data,

      sizeScale: 1,
      updateTriggers: { getColor: [props.zoom] },
      getPosition: d => [d.longitude, d.latitude],
      getIcon: d => 'marker',
      getSize: d => 60,
      getColor: d => {

        return [0, 166, 255, zoomToOpacitySquare(props.zoom)];
      }
    };

    super(params);
  }
}



class TankLayerCircles extends IconLayer {
  constructor(props) {
    let params = {
      transitions: {

        getColor: {
          easing: d3.easeCubicInOut,
          duration: 100,
        },
      },

      id: 'tank-layer-circles',
      pickable: true,

      iconAtlas: tanklayercircles,
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          anchorY: 10,
          mask: false,
        },
      },

      data: props.data,

      sizeScale: 1,
      updateTriggers: {  getColor: [props.zoom] },
      getPosition: d => [d.longitude, d.latitude],
      getIcon: d => 'marker',
      getSize: d => 60,
      getColor : d=> {

        return [1, 192, 170, zoomToOpacityCircles(props.zoom)]
      }

    };

    super(params);
  }
}



export default class TankLayer extends CompositeLayer {
  initializeState() {
    let self = this;

    this.setState({
      zoomedIn: false,
    });

  }

  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  updateState({ props, oldProps, changeFlags }) {
    const { viewport } = this.context;

    this.setState({
      zoom: Math.floor(viewport.zoom),
    });
  }

  renderLayers() {
    const { zoom } = this.state;
    const { data } = this.props;

    const tanksquare  = new TankLayerBlueSquare({ data: data, zoom: zoom });
    const tankcircles = new TankLayerCircles({ data: data, zoom: zoom });

    return [tanksquare, tankcircles];
  }
}
