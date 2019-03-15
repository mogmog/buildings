import * as OBJ from 'webgl-obj-loader';

try {

  OBJ.downloadMeshes(
    {'buildingModel': require('./building.obj')},
    (d) => console.log(d.building)
  );

} catch (e) {
  console.log(e);
}
