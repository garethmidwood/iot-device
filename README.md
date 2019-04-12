# IoT Device Boilerplate

This is the boilerplate code for an IoT device running on node.js.

It will connect to a meteor.js server, with the URL and port defined in the config/default.json (or environment version) file

# How do I run it?
Just run `node index.js`

## How do I use a different environment?
You can set the environment like so `NODE_ENV=uat70 node index.js` - the env name should match the filename in the `config` directory

# Where do I write my code?
The `device.js` file is laid out with the functions you need to populate.

Either fork the repository or create your own branch (if you're a collaborator)
