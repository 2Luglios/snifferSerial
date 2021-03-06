var http = require('http');
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function () {
	var app = express();

	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	load('routes', {cwd: 'app', verbose: true}).then('infra').into(app);

	app.use(function(req, res, next){
		res.status(404).render('erros/404');
	});

	app.use(function(error, req, res, next) {
		res.status(500).render('erros/500');
	});

	return app;
};
