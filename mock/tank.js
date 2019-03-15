export default {
  'GET /api/tank': (req, res)=> {

        if(req.query.region_id === '1') res.status(200).send([{ id: 1, name: 'Tank 1', longitude: 12, latitude: 23 }, { id: 1, name: 'Tank 2', longitude: 12.0001, latitude: 23.0002}]);
        if(req.query.region_id === '2') res.status(200).send([]);
        if(req.query.region_id === '3') res.status(200).send([]);
  }
};


