const express = require('express')
const yaml = require('js-yaml');
const fs = require('fs');

var env = process.env.NODE_ENV || 'dev';


/*function testar() {  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("foi")
      return resolve()
    }, 2000);
  });  
}
async function testarAsync() {
  await testar();  

  console.log('continuou');
}
testarAsync();*/

//var repository = require('./repository/repository')()

/*async function testarMongoDb() {

    var client = await repository.conectar();

    const usuarios = client.db("posnodejs").collection("usuario");

    await usuarios.insertOne({ nome: 'cleverson', idade: 40 })

}*/

//testarMongoDb();



try {
  let fileContents = fs.readFileSync(`./configs/${env}.yaml`, 'utf8');
  data = yaml.load(fileContents);
} catch (e) {
  console.log(e);
}

const app = express()
const port = data['port']

app.use(express.json())

const routing = require('./router/routing')

app.use(routing)

app.use(function (err, req, res, next) {
  res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})