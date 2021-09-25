var servicoRep = require('../repository/servico.repository')()

module.exports = () => {

    var servicos = Array();

    const servicosController = {}

    servicosController.listar = async (req, res, next) => {
        try {
            console.log(req.ip)
            console.log(req.headers)
            const servicos = await servicoRep.listar();

            res.status(200).json(servicos)
        } catch (e) {            
            console.log(e)
            next({httpStatusCode: 400, code: 'ERR001', message: 'Não foi possivel listar os serviços'});
        }
    }

    servicosController.totalhoras = (req, res) => {
        const totalhoras = servicos.reduce(function (valorhoras, item) {
            return parseInt(valorhoras) + parseInt(item.horas);
        }, 0);

        res.status(200).send("Valor horas: " + totalhoras);
    }

    /**
     * Inserir
     */
    servicosController.salvar = (req, res) => {
        const service = req.body;

        servicoRep.salvar(service, (servico) => {
            res.json(servico)
        });
    }

    servicosController.alterar = (req, res) => {
        res.send('Serviço alterado com sucesso!')
    }

    servicosController.excluir = (req, res) => {
        res.send('Serviço excluído com sucesso!')
    }

    return servicosController;

}