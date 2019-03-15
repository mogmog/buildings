import { ScatterplotLayer, CompositeLayer, TextLayer, IconLayer } from 'deck.gl';
import regionlayericon from '../Assets/RegionLayer_Dot.svg';
import * as d3 from 'd3';

var zoomToOpacityScale = d3
  .scaleLinear()
  .domain([20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  .range([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 120, 120, 255]);

class _RegionLayer extends IconLayer {
  constructor(props) {
    let params = {
      transitions: {
        getSize: {
          easing: d3.easeCubicInOut,
          duration: 250,
        },

        getColor: {
          easing: d3.easeCubicInOut,
          duration: 100,
        },
      },

      id: 'region-layer',
      pickable: true,

      iconAtlas: regionlayericon,
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 400,
          height: 400,
          anchorY: 200,
          mask: true,
        },
      },

      data: props.data,

      sizeScale: 60,
      updateTriggers: { getSize: [props.loaded], getColor: [props.loaded, props.zoom] },
      getPosition: d => [d.longitude, d.latitude],
      getIcon: d => 'marker',
      getSize: d => (props.loaded ? 1 : 80),
      getColor: d => {
        console.log([
          d.color[0],
          d.color[1],
          d.color[2],
          props.loaded ? zoomToOpacityScale(props.zoom) : 0,
        ]);
        return [
          d.color[0],
          d.color[1],
          d.color[2],
          props.loaded ? zoomToOpacityScale(props.zoom) - 25 : 0,
        ];
      },
    };

    super(params);
  }
}

export default class RegionLayer extends CompositeLayer {
  initializeState() {
    let self = this;

    this.setState({
      loaded: false,
    });

    window.setTimeout(function() {
      self.setState({ loaded: true });
    }, 500);
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
    const { loaded, zoom } = this.state;
    const { data } = this.props;

    const regionicon = new _RegionLayer({ data: data, zoom: zoom, loaded: loaded });

    return [regionicon];
  }
}
