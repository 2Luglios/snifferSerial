module.exports = function(app) {

	app.post('/', function(req, res){
		var connection = app.infra.ConnectionFactory();
		var dao = new app.infra.DadosDAO(connection);
		var dado = req.body;

		dao.salva(dado, function(err, rows) {
			res.redirect('/');
		});

		connection.end();
	});

	app.get('/', function(req, res){
		var connection = app.infra.ConnectionFactory();
		var dao = new app.infra.DadosDAO(connection);

		temperatura(function(temperatura) {
			console.log(''+ temperatura);
		});

		dao.lista(function(erros, rows){
			res.format({
				html: function () {
					res.render('dados/lista', {lista: rows});
				},
				json: function () {
					res.json(rows);
				}
			});
		});

		connection.end();
	});

	app.get('/resetBanco', function(req, res) {
		var connection = app.infra.ConnectionFactory();
		var dao = new app.infra.DadosDAO(connection);

		dao.resetBanco(function(erros, resultado) {
			res.redirect('/');
		});

		connection.end();
	});

	app.get('/ajuda', function(req, res){
		res.render('dados/lista');
	});

	app.get('/geraRelatorio', function(req, res) {
		var dataInicio = req.body.dataInicio;
		var dataFinal = req.body.dataFinal;
		var formato = req.body.formato;

		var connection = app.infra/ConnectionFactory();
		var dao = new app.infra.DadosDAO(connection);

		dao.buscar(dataInicio, dataFinal, function(err, results) {

			if ( formato == 'pdf' ) {
				var pdf = require('pdfkit');
				var fs = require('fs');

				var doc = new pdf;

				var data = new Date();
				var arquivo = '';
				arquivo += data.getDay() <= 9 ? '0' + data.getDay() : data.getDay();
				arquivo += '/';
				arquivo += data.getMonth() <=9 ? '0' + data.getMonth() : data.getMonth();
				arquivo += '/';
				arquivo += data.getYear() <= 9 ? '0' + data.getYear() : data.getYear();
				arquivo += ' ';
				arquivo += data.getHours() <= 9 ? '0' + data.getHours() : data.getHours();
				arquivo += ':';
				arquivo += data.getMinutes() <= 9 ? '0' + data.getMinutes() : data.getMinutes();
				arquivo += ':';
				arquivo += data.getSeconds() <= 9 ? '0' + data.getSeconds() : data.getSeconds();
				arquivo += '.pdf';

				doc.pipe(fs.createWriteStream(arquivo));
				doc.font('Times-Roman').fontSize(24).text('Relatório', 100, 100);

				doc.end();

			} else if ( formato == 'excel' ) {
				var excel = require('excel-export');

				var conf = {};
				conf.styleXmlFile = 'styles.xml';
				conf.name = 'mysheet';
				conf.cols = [
					{ caption: 'string', type: 'string', width: 28.7109375},
					{ caption: 'date', type: 'date'},
					{ caption: 'bool', type: 'bool'},
					{ caption: 'number', type: 'number'}
				];
				conf.rows = [
					['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
					['e', new Date(Date.UTC(2012, 4, 1)), false, 2.7182],
					['M&M', new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
					['null date', null, true, 1.414]
				];
				var result = excel.execute(conf);

				var arquivo = "excel.xlsx";

				res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader('Content-Disposition', 'attachment; filename=' + arquivo);
				res.end(result, 'binary');

			}
			res.render('dados/lista', {lista: results});
		});

		connection.end();
	});

};

function temperatura(callback) {
	const exec = require('child_process').exec;
	const child = exec('vcgencmd measure_temp',
		function (error, stdout, stderr) {
		        callback(stdout.replace("temp=", ""));
		}
	);
};
