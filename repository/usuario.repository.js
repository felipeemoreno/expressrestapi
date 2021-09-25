var mysql = require('mysql');
const util = require('util');

module.exports = () => {

    const repository = {}

    async function conectar() {
        var connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'posnodejs2021'
        });

        return connection;
    }

    repository.listar = async (callback) => {
        var conn = await conectar();
        const query = util.promisify(conn.query).bind(conn);
        

        const rows = await query('SELECT * FROM USUARIO')    
        console.log(rows)   
        return rows
    }

    repository.salvar = (usuario, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR005'
                return callback(null, error)
            }
            connection.query('INSERT INTO USUARIO SET ?', usuario, function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir o usuário"
                    error.httpStatusCode = 500
                    error.code = 'ERR003'
                    return callback(null, error)
                }

                usuario.id = res.insertId

                connection.end();
                return callback(usuario, null)
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

