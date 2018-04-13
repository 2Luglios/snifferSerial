function DadosDAO(connection) {
    this._connection = connection;
}

DadosDAO.prototype.salva = function(dado,callback) {
    this._connection.query('INSERT INTO dados (data, dado, hash) values(?, ?, ?)', dado, callback);
}

DadosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from dados',callback);
}

DadosDAO.prototype.resetBanco = function(callback) {
    this._connection.query('delete * from dados', callback);
}

DadosDAO.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from dados where id = ?",[id],callback);
}

DadosDAO.prototype.buscar = function(dataInicial, dataFinal, callback){
    this._connection.query('', callback);
}

module.exports = function(){
    return DadosDAO;
};
