var client  = require('mariasql');

function createDBConnection() {
	return new client({
		host: 'localhost',
		user: 'root',
		password: 'root',
		db: 'sniffer'
	});
}

module.exports = function() {
	return createDBConnection;
}
