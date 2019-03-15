import { ScatterplotLayer, COORDINATE_SYSTEM, CompositeLayer, TextLayer, IconLayer, PolygonLayer} from 'deck.gl';
import tanklayersquare from "../Assets/TankLayer_BlueSquare.svg";
import tanklayercircles from "../Assets/TankLayer_Circles.svg";

import * as d3 from 'd3';

var zoomToOpacitySquare = d3.scaleLinear().domain([1, 20]).range([0, 120]);
var zoomToOpacityCircles = d3.scaleLinear().domain([1, 20]).range([0, 255]);

class PolyLayer extends PolygonLayer {
  constructor(props) {
    let params = {
      id: 'polygon-layer',

      transitions: {
        getFillColor: 500,
      },

      coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
      data: [
        [[0, 0], [0, 0.1], [0.1, 0.1], [0.1, 0], [0,0] ],

      ],
      getPolygon: d => d,
      getFillColor: [255, 255, 0, props.clicked ? 80 : 0],
      updateTriggers : {getFillColor  : [ props.clicked ] },
      extruded: true,
      getElevation  : 0.2
    }

    super(params);
  }
}


export default class extends CompositeLayer {
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
    const { data, clicked } = this.props;

    const polygon  = new PolyLayer({ data: data, zoom: zoom, clicked });

    return [ polygon ];
  }
}
