var config = require('config');
var ddp = require('ddp');
var player = require('play-sound')({"players": ["omxplayer", "afplay"]});
var deviceController = require('./device.js');

// Create an instance of your device
var device = new deviceController();
// the feed name (to subscribe to) should match the device type
var feedName = device.deviceType();

// a bit of logging so we know what we're connecting to
console.log('Connecting to ' + config.server.host + ":" + config.server.port);

// configure connection to server
var ddpclient = new ddp({ host: config.server.host, port: config.server.port, autoReconnect : true });

// connect to server
ddpclient.connect(function(error) {
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

    // subscribe to the feed
    ddpclient.subscribe(
        feedName,
        [],
        function() {
            console.log(feedName + ' subscription complete');
            // console.log(ddpclient.collections);
        }
    );

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
});

