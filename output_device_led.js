class OutputDevice {
    // the device is constructed with the ddpclient, with this 
    // you can call the Meteor methods from the control centre
    constructor(ddpclient) {
        this.ddpclient = ddpclient;
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
        console.log('added item', item);
    }

    // this is called when a record in the collection is updated
    recordChanged(item) {
        console.log('changed item', item);
    }

    // this is called when a record is removed from the collection
    recordRemoved(_id) {
        console.log('removed item', _id);
    }
}

module.exports = OutputDevice;
