/**
 *
 * Example command: `node run_output.js output_device_led.js`
 * - output_device_led.js - the device class to run
 *
 *
 **/
var config = require('config');
var ddp = require('ddp');
var player = require('play-sound')({"players": ["omxplayer", "afplay"]});




/// strip the first 2 values from the arguments as they're `node` and this script
var args = process.argv.slice(2);

// args is already an array, so just return if it's not empty
if (args === undefined || args.length == 0) {
    console.log('This script must be called with an output device filename as the first argument');
    process.exit(1);
}

try {
  var deviceController = require('./' + args[0]);
} catch(error) {
  console.log('Could not load file ' + args[0]);
  process.exit(1);
}

// a bit of logging so we know what we're connecting to
console.log('Connecting to ' + config.server.host + ":" + config.server.port);

// configure connection to server
var ddpclient = new ddp({ host: config.server.host, port: config.server.port, autoReconnect : true });

// Create an instance of your device
var device = new deviceController(ddpclient);
// the feed name (to subscribe to) should match the device type
var feedName = device.deviceType();
// if you setup the observer twice it'll start receiving messages twice
// we're going to use this var to make sure that doesn't happen
var observing = false;

// connect to server
ddpclient.connect(function(error) {
    // console.log(this.ObjectID());
    if (error) {
        // bomb out and play a sound so humans know it didn't connect
        console.log('ah crap');
        player.play('./samples/connection_lost.mp3');
        return;
    }

    // audio to inform human that it's connected
    console.log('connected');
    player.play('./samples/connected.mp3');

    // subscribe to the feed
    ddpclient.subscribe(
        feedName,
        [],
        function() {
            console.log(feedName + ' subscription complete');
            // console.log(ddpclient.collections);
        }
    );

    ddpclient.call(
      'device_online', // name of Meteor Method being called
      [device.deviceName(), device.deviceType()], // parameters to send to Meteor Method
      function (err, result) { // callback which returns the method call results
        console.log('called function, result: ' + result);
      },
      function () { // callback which fires when server has finished
        console.log('done');
      }
    );

    if (!observing) {
        // watch the feed for changes. 
        // the functions below handle the different events
        var observer = ddpclient.observe(feedName);

        // when a record is added
        observer.added = function(_id) {
            device.recordAdded(ddpclient.collections[feedName][_id]);
        }

        // when an existing record changes
        observer.changed = function(_id) {
            device.recordChanged(ddpclient.collections[feedName][_id]);
        }

        // when a record is removed
        observer.removed = function(_id) {
            device.recordRemoved(_id);
        }

        observing = true;
    }
});

