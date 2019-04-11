class Device {
    // this is the device type, it should return a string that
    // exactly matches the name of the meteor.js collection
    deviceType() {
        return 'options';
    }
    
    // this is called when a record is added to the collection
    recordAdded(_id) {
        console.log('added ' + _id);
    }

    // this is called when a record in the collection is updated
    recordChanged(_id, oldFields, clearedFields, newFields) {
        console.log('changed ' + _id);
    }

    // this is called when a record is removed from the collection
    recordRemoved(_id, oldValue) {
        console.log('removed ' + _id);
    }
}

module.exports = Device;
