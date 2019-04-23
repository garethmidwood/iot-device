class OutputDevice {
    // the device is constructed with the ddpclient, with this 
    // you can call the Meteor methods from the control centre
    constructor(ddpclient) {
        this.ddpclient = ddpclient;
        this.http = require('http');
    }

    // this is the device type, it should return a string that
    // exactly matches the name of the meteor.js collection
    deviceType() {
        return 'led1';
    }

    // this is the device name, it should be unique
    deviceName() {
        return 'LED #1';
    }
    
    // this is called when a record is added to the collection
    // item is a json object containing the values in the DB
    recordAdded(item) {
        this.sendData(
            item.led + '/' + 
            item.colours.r + '/' +
            item.colours.g + '/' +
            item.colours.b
        );
    }

    // this is called when a record in the collection is updated
    recordChanged(item) {
    }

    // this is called when a record is removed from the collection
    recordRemoved(_id) {
    }

    connectionFail() {
        this.sendData('fail');
    }

    connectionAccepted() {
        this.sendData('connected');
    }

    sendData(data) {
        this.http.get(
            'http://localhost:3000/' + data,
            (resp) => {
                resp.on('data', (chunk) => {});
                resp.on('end', () => {});
            }
        ).on('error', (err) => {});
    }
}

module.exports = OutputDevice;
