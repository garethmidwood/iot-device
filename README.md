# IoT Device Boilerplate

This is the boilerplate code for IoT devices running on node.js.

Devices will connect to a meteor.js server, with the URL and port defined in the config/default.json (or environment version) file 

Output devices will open a DDP connection to the server and continue running, waiting for the server to send data

Input devices will run a single cycle, collecting the input data and sending it to the server, then the process will end


# How do I run it?
## Output devices
Just run `node run_output.js [output device filename]`

e.g. `node run_output.js output_device_led.js`

## Input devices
Run `node run_input.js [input device filename] [device parameters ...]`

e.g. `node run_input.js input_device_heartrate.js 40`

## How do I connect to a different environment?
You can set the environment like so `NODE_ENV=uat70 node index.js` - the env name should match the filename in the `config` directory


# Where do I write my code?
## Output devices
Make a copy of the `output_device_template.js` file and name it `output_device_[devicename].js`, you must implement all of the functions in the template

## Input devices
Make a copy of the `input_device_template.js` file and name it `input_device_[devicename].js`, you must implement all of the functions in the template
