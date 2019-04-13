/**
 *
 * Example command: `node run_input.js input_device_heartrate.js 40`
 * - input_device_heartrate.js - the device class to run
 * - 40 - the input param for the heart rate sensor
 *
 **/
var config = require('config');
var ddp = require('ddp');
var player = require('play-sound')({"players": ["omxplayer", "afplay"]});




// strip the first 2 values from the arguments as they're `node` and this script
var args = process.argv.slice(2);

// args is already an array, so just return if it's not empty
if (args === undefined || args.length == 0) {
    console.log('This script must be called with an input device filename as the first argument');
    process.exit(1);
}

try {
  var deviceController = require('./' + args[0]);

  args = args.slice(1);
} catch(error) {
  console.log('Could not load file ' + args[0]);
  process.exit(1);
}

// a bit of logging so we know what we're connecting to
console.log('Connecting to ' + config.server.host + ":" + config.server.port);

// configure connection to server
var ddpclient = new ddp({ host: config.server.host, port: config.server.port, autoReconnect : true });

// Create an instance of your device
var device = new deviceController();
// get the values from it
var meteorCallName = device.meteorFunctionName();
var meteorCallParams = device.collectValues(args);

// connect to server
ddpclient.connect(function(error) {
    // console.log(this.ObjectID());
    if (error) {
        // bomb out and play a sound so humans know it didn't connect
        console.log('ah crap');
        player.play('./samples/connection_lost.mp3');
        process.exit(1);
        return;
    }

    // audio to inform human that it's connected
    console.log('connected');
    player.play('./samples/connected.mp3');

    ddpclient.call(
      meteorCallName, // name of Meteor Method being called
      meteorCallParams, // send the input value to the 
      function (err, result) { // callback which returns the method call results
        console.log(meteorCallName + ' result: ' + result);
      },
      function () { // callback which fires when server has finished
        console.log('done ' + meteorCallName);
        process.exit(0);
      }
    );
});

