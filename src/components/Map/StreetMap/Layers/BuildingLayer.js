import { CompositeLayer } from "deck.gl"
import { Geometry } from 'luma.gl';
import { MeshLayer } from '@deck.gl/experimental-layers';

import model from './Models/tug'





const CUBE_INDICES    = new Uint16Array(model.indices);
const CUBE_POSITIONS  = new Float32Array(model.vertices);
const CUBE_NORMALS    = new Float32Array(model.vertexNormals);
const CUBE_TEX_COORDS = new Float32Array(model.indicesPerMaterial[0]);

console.log(model);

class BuildingGeometry extends Geometry {
    constructor(opts = {}) {

        const _opts$id = opts.id,
            id = _opts$id === void 0 ? ('cube-geometry') + Math.random() : _opts$id;
        super(Object.assign({}, opts, {
            id,
            attributes: {
                indices: new Uint16Array(CUBE_INDICES),
                positions: new Float32Array(CUBE_POSITIONS),
                normals: new Float32Array(CUBE_NORMALS),
                texCoords: new Float32Array(CUBE_TEX_COORDS)
            }
        }));
    }
}

class Building3DLayer extends MeshLayer {

    constructor(props) {

        const defaultParams = {
            mesh: new BuildingGeometry(),
            id: 'building-3d-layer',

            parameters: {
                depthTest: false
            },
            pickable: true,
            data : props.data,
            sizeScale: 1,
            getColor: d=> [230,230,230, 80],
            getPosition: (d) => [d.longitude, d.latitude],
            getRoll: d => 90,
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
            z: -1,
            bearing : 0
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

        const building3d = new Building3DLayer({data:  data,  zoom : z});

        return [ building3d ];
    }

}
