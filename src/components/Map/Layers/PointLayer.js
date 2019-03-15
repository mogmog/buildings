import DeckGL, {
  COORDINATE_SYSTEM,
  CompositeLayer,
  PointCloudLayer,
  OrbitView,
  LinearInterpolator,
} from 'deck.gl';

import GL from 'luma.gl/constants';

import loadLazFile from '../LAZLoaders/laslazloader';
import { normalize } from '../LAZLoaders/utils';

import * as d3 from 'd3';

// Data source: kaarta.com
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/point-cloud-laz/indoor.0.1.laz';

class _PointLayer extends PointCloudLayer {
  constructor(props) {
    let params = {
      id: 'laz-point-cloud-layer',
      data: props.data,
      getPosition: d => d,
      /*getPosition: d => [12 + d[0], 23 + d[1], d[2] * 100000],*/

      coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
      /*coordinateOrigin: [12, 23],*/
      getNormal: [0, 1, 0],
      getColor: [255, 255, 255],
      radiusPixels: 0.5,
    };

    super(params);
  }
}

export default class PointLayer extends CompositeLayer {
  _loadData() {
    const { points } = this.state;
    const skip = 1;

    loadLazFile(DATA_URL, skip, (decoder, progress) => {
      for (let i = 0; i < decoder.pointsCount; i++) {
        const { position } = decoder.getPoint(i);
        points.push(position);
      }

      if (progress >= 1) {
        normalize(points);
      }

      this.setState({ points, progress });
    });
  }

  initializeState() {
    let self = this;

    this.setState({
      points: [],
      progress: 0,
    });

    this._loadData();
  }

  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  renderLayers() {
    const { loaded, zoom, points, progress } = this.state;

    const point = new _PointLayer({ data: points });
    return progress >= 1 ? [point] : [];
  }
}
