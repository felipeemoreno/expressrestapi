var MongoClient = require('mongodb').MongoClient;

module.exports = () => {

    const repository = {}

    repository.conectar = async () => {

        var uri = "mongodb://positivo:123456ab@cluster0-shard-00-00.2bftd.mongodb.net:27017,cluster0-shard-00-01.2bftd.mongodb.net:27017,cluster0-shard-00-02.2bftd.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fbg0ts-shard-0&authSource=admin&retryWrites=true&w=majority";
        var client = MongoClient.connect(uri);

        return client;
    }

    return repository;
}