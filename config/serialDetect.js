var serial = require('serialport');
var hash = require('object-hash');
var port = new serial('/dev/ttyAMA0');

port.on('data', function() {
        console.log('Hash: ' + hash('{dado:' + data + '}'));
        console.log('Data: ' + data);
});
