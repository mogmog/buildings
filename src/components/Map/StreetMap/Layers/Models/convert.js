import * as OBJ from 'webgl-obj-loader';

try {

  OBJ.downloadMeshes(
    {'buildingModel': require('./Block_5_Office.obj')},
    (d) => console.log(d)
  );

} catch (e) {
  console.log(e);
}
