class InputDevice {
    // this is the meteor function that will be called
    meteorFunctionName() {
        return 'set_beat';
    }

    // this should collect and return the input values
    // it must always return the values in an array
    collectValues() {
        // EXAMPLE: fixed value return
        return [40];

        // EXAMPLE: value from command line
        // the first 2 args will be node itself and the script name, 
        // so we remove those
        var args = process.argv.slice(2);

        // args is already an array, so just return if it's not empty
        if (args === undefined || args.length == 0) {
            console.log('This script must be called with arguments');
            process.exit(1);
        }

        return args;
    }
}

module.exports = InputDevice;
