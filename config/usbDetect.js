var usb = require('usb');
var devicelist = require('drivelist');

usb.on('attach', function(device){
        console.log('Conectou um usb...');
	listarUSB();
});

usb.on('detach', function(device){
        console.log('Desconectou um usb...');
});

function listarUSB() {
        devicelist.list(function(erro, drives) {
                for ( var i = 0 ; i < drives.length ; i++ ) {
                        for ( var j = 0 ; j < drives[i].mountpoints.length ; j++ ) {
                                var m = drives[i].mountpoints[j].path;
                                if (m.startsWith('/media')) console.log('Conectado: ' + m);
                        }
                }
        });
}
