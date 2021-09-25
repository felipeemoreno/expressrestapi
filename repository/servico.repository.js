var mysql = require('mysql');
const util = require('util');

module.exports = () => {

    const repository = {}

    async function conectar() {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'posnodejs2021'
        });
        return connection;
    }

    repository.listar = async () => {
        const conn = await conectar();
        const query = util.promisify(conn.query).bind(conn);

        return query('SELECT S.ID, S.ID_USUARIO, U.LOGIN, S.DESCRICAO FROM SERVICO S LEFT JOIN USUARIO U ON U.ID = S.ID_USUARIO ');        
    }

    repository.salvar = (servico, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('INSERT INTO SERVICO SET ?', servico, function (err, res) {
                if (err) {
                    console.log(err)
                }

                servico.id = res.insertId

                connection.end();
                
                return callback(servico)
            })
        })
    }

    repository.excluir = (id) => {
        const connection = conectar()
        connection.query('DELETE FROM USUARIO WHERE ID = ?', [id], function (err, res) {
            if (err) {
                console.log(err)
                return;
            }

            console.log(`excluir... ${res.affectedRows}`)
        })
    }

    return repository

}

