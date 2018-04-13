var fs = require('fs');

function log(info) {
	var data = new Date();

	var log = fs.createWriteStream('./logs/' + 'snifferLOG' + '.txt', {flags: 'a'});

	log.write('['
	+ (data.getDay()<9?'0'+data.getDay():data.getDay()) + '/'
	+ (data.getMonth()<9?'0'+data.getMonth():data.getMonth()) + '/'
	+ data.getFullYear() + ' '
	+ (data.getHours()<9?'0'+data.getHours():data.getHours()) + ':'
	+ (data.getMinutes()<9?'0'+data.getMinutes():data.getMinutes()) + ':'
	+ (data.getSeconds()<9?'0'+data.getSeconds():data.getSeconds()) + '.'
	+ (data.getMilliseconds()<99?data.getMilliseconds()<9?'00'+data.getMilliseconds():'0'+data.getMilliseconds():data.getMilliseconds()) + '] - '
	+ info + '\n');

	log.end();
}


