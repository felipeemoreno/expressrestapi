var request = require('request')
var usuarioRep = require('../repository/usuario.repository')()
var ObjectID = require('mongodb').ObjectID;

var repository = require('../repository/repository')()

module.exports = () => {

    const controller = {}

    controller.listar = async (req, res) => {
        var filtro = {}

        var client = await repository.conectar();

        const collectionUsuarios = client.db("posnodejs").collection("usuario");

        const usuarios = await collectionUsuarios.find(filtro).toArray();

        return res.json(usuarios);

    }

    controller.salvar = async (req, res, callback) => {
        const user = req.body;

        if (!user.cep) {
            throw { httpStatusCode: 400, code: 'ERR001', message: 'cep é obrigatório' };
        }

        //var cep = user.cep
        //capturar o cep e fazer um request na api
        //de de endereços
        //https://viacep.com.br/ws/81050100/json/

        //request(`https://viacep.com.br/ws/${cep}/json/`, (error, response, body) => {
        //    user.endereco = JSON.parse(body)
        //
        //    usuarios.push(user)           
        //
        //    res.send('Usuário adicionado com sucesso!')
        //});
        /*usuarioRep.salvar(user, (usuario, err) => {      
            if (err) {
                return callback(err)
            }         
            res.json(usuario)
        });*/

        var client = await repository.conectar();

        const collectionUsuarios = client.db("posnodejs").collection("usuario");

        await collectionUsuarios.insertOne(user)

        res.json(user)
    }

    controller.alterar = async (req, res) => {
        const user = req.body;

        var client = await repository.conectar();

        const collectionUsuarios = client.db("posnodejs").collection("usuario");

        var userId = user._id;
        delete user._id;
       
        collectionUsuarios.updateOne({ _id: ObjectID(userId) }, { $set: user });
       
        
        res.json(user)
    }

    controller.excluir = async (req, res) => {
       const { id } = req.params;

       const client = await repository.conectar();

       const collectionUsuarios = client.db("posnodejs").collection("usuario");

       const usuarioDeletado = collectionUsuarios.deleteOne({ _id: ObjectID(id) });

       res.json(usuarioDeletado);
    }

    return controller
}




