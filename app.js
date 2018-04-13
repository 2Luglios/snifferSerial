// Iniciando o servidor
var app = require('./config/express')();

// Verificacao do HardLock do sistema
require('./config/hardLock');

// Recebimento de dados da porta SERIAL para o banco
require('./config/serialDetect');

// Detecaco do USB - via refresh da web
require('./config/usbDetect');

// Início do código para web
app.listen(8000, function(){
	console.log('Servidor rodando na porta 8000');
});

