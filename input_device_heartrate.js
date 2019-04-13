class InputDevice {
    // this is the meteor function that will be called
    meteorFunctionName() {
        return 'set_beat';
    }

    // this should collect and return the input values
    // it must always return the values in an array.
    // This is where you want to read the value from your device
    // but if that's not possible (maybe there's no js library)
    // then you can use the command line params the script was called with
    // these are automatically passed into the function
    collectValues(args) {
        // EXAMPLE: fixed value return
        // return [40];

        // EXAMPLE: Read from your device
        // ... sorry, I don't know this one

        // EXAMPLE: value from command line
        // args is already an array, so just return if it's not empty
        if (args === undefined || args.length == 0) {
            console.log('This script must be called with arguments');
            process.exit(1);
        }

        return args;
    }
}

module.exports = InputDevice;
