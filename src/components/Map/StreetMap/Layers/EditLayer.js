import { CompositeLayer } from "deck.gl"
import { Geometry } from 'luma.gl';
import { EditableGeoJsonLayer } from 'nebula.gl';

const myFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    /* insert features here */
  ]
};

class EditLayer extends EditableGeoJsonLayer {

  constructor(props) {

    const defaultParams = {
      id: 'geojson-layer',
      data: this.state.data,
      mode: this.state.mode,
      selectedFeatureIndexes: this.state.selectedFeatureIndexes,

      onEdit: ({ updatedData }) => {
        this.setState({
          data: updatedData,
        });
      }
    };

    try {
      super(Object.assign(props, defaultParams));
    } catch (e) {
      console.error(e);
    }
  }
}

export default class extends CompositeLayer {

  initializeState() {
    this.setState({
      mode: 'modify',
      selectedFeatureIndexes: [0],
      data: myFeatureCollection
    });
  }

  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }

  updateState({props, oldProps, changeFlags}) {

    const {viewport} = this.context;

    this.setState({
      z: Math.floor(viewport.zoom),
    });

  }

  renderLayers() {

    const {z } = this.state;
    const {data } = this.props;

    const edit = new EditLayer();

    return [ edit ];
  }

}
