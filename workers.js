var http = require('http'),
	conf = require('./conf'),
	expressServer = require('./server/expressServer');

var Workers = function(config){
	config = config || {}

	
	console.log('Inicia conexión');

	var app = new expressServer({parameters : conf });

	this.server = http.createServer(app.expressServer);

}

Workers.prototype.run = function(){
	this.server.listen(conf.port,"0.0.0.0");
}

if(module.parent){
	module.exports = Workers;
} else {
	var workers = new Workers();
	workers.run();
	console.log('Modo debug');
}