const routing = require('express').Router();
var usuarioController = require('../controller/usuario')()
var servicoController = require('../controller/servico')()

routing.get('/usuario', usuarioController.listar)
routing.post('/usuario', usuarioController.salvar)
routing.put('/usuario', usuarioController.alterar)
routing.delete('/usuario/:id', usuarioController.excluir)

routing.get('/servico', servicoController.listar)
routing.post('/servico', servicoController.salvar)
routing.put('/servico', servicoController.alterar)
routing.delete('/servico', servicoController.excluir)

module.exports = routing