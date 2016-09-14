var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function route(mediator) {
  var router = new express.Router();
  router.use(cors());
  router.use(bodyParser());

  router.get('/:vehicle', function(req, res) {
    console.log('user GET headers : ' + JSON.stringify(req.headers));
    var vehicle = req.params.vehicle;
    if (typeof vehicle === 'undefined' || vehicle == '') {
      res.status(400).json([]);
    }

    console.log('Looking for user with vehicle ' + vehicle);
    mediator.request('wfm:user:vehicle:read', vehicle)
    .then(function(user) {
      console.log('User found with vehicle ' + vehicle);
      res.json({
        status: 'ok',
        user: user
      });
    }, function(err) {
      console.log('Invalid user for vehicle ' + vehicle);
      res.status(400).json({message: 'Vehicle not found or not assigned'});
    });
  });

  return router;
}

module.exports = route;
