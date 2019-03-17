import { HexagonCellLayer, CompositeLayer } from "deck.gl"
import {CylinderGeometry, Model} from 'luma.gl'
import {intervalService} from './../../../../services/intervalService';


class ExtrudedCircleLayer extends HexagonCellLayer {

  //onClick = d=> {alert(8)};

  getCylinderGeometry(radius) {
    return new CylinderGeometry({
      radius,
      topRadius: radius,
      bottomRadius: radius,
      topCap: true,
      bottomCap: true,
      height: 1,
      verticalAxis: 'z',
      nradial: 4,
      nvertical: 1
    });
  }

  _getModel(gl) {
    return new Model(gl, Object.assign({


    }, this.getShaders(), {
      id: this.props.id,

      geometry: this.getCylinderGeometry(1),
      isInstanced: true,
      shaderCache: this.context.shaderCache
    }));
  }


}

class RefineryLayerThing extends ExtrudedCircleLayer {

  constructor(props) {

    let params = ({

      transitions: {

        getElevation : {
          duration : 1000
        }
      },

      id: 'refinery-layerw',
      data: props.data,
      radius: d=>100,
      angle: 0,
      opacity : 0.2,

      updateTriggers : {getElevation   : [ props.fade  ] },
      getColor : (d) => [255, 0, 0],
      getCentroid : (d) =>  [d.longitude, d.latitude],
      elevationScale: 5,

      lightSettings: {
        ambientRatio: 0.4
      },

      getElevation : (d) => {
        return props.fade ? d.height : 0 },
    });

    super(params);
  }
}


export default class BuildingLayer2 extends CompositeLayer {

  initializeState() {

    let self = this;

    //self.onClick = d=> {alert(74)};

    self.setState({ fade : false});

    window.setTimeout(function() {
      self.setState({fade : true })
    }, 1000);

  }

  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }


  renderLayers() {

    const { data } = this.props;
    const self = this;



    return [new RefineryLayerThing({ data : data, fade : this.state.fade}) ];
  }

}


