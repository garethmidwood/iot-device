# Creode IoT Device Boilerplate

This is the boilerplate code for an IoT device running on node.js.

It will connect to a meteor.js server, with the URL and port defined in the config/default.json (or environment version) file

# How do I run it?
Just run `node index.js`

## How do I use a different environment?
You can set the environment like so `export NODE_ENV=uat70`, then run the script as normal

Note that this is set for the duration of your current terminal window, so if you want to switch back you'll either need to open a new shell or unset the environment variable - `unset NODE_ENV`

# Where do I write my code?
The `device.js` file is laid out with the functions you need to populate.

**Don't** overwrite the master branch for this, either fork the repository or create your own branch
