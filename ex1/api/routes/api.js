var express = require('express');
var router = express.Router();

var Cidade = require('../controllers/cidade');
var Ligacao = require('../controllers/ligacao')

/* GET home page. */
router.get('/cidades', function(req, res, next) {
    if(Object.entries(req.query).length === 0)
        Cidade.listar()
            .then(dados => res.status(200).jsonp(dados))
            .catch(err => res.status(500).jsonp(err))
    else if(req.query.distrito != undefined) {
        console.log("Distrito: " + req.query.distrito)
        Cidade.consultarDistrito(req.query.distrito)
            .then(dados => res.status(200).jsonp(dados))
            .catch(err => res.status(500).jsonp(err))
    }
    else
        res.status(404).jsonp("Not found")
});


router.get('/cidades/nomes', function(req, res, next) {
    Cidade.listarNomes()
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
});


router.get('/cidades/:id', function(req, res, next) {
    Cidade.consultar(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
});

router.get('/distritos', function(req, res, next) {
    Cidade.agrupaDistrito()
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})

router.get('ligacoes', function(req, res, next) {
    if(req.query.origem != undefined)
        Ligacao.consultarOrigem(req.query.origem)
            .then(dados => res.status(200).jsonp(dados))
            .catch(err => res.status(500).jsonp(err))
    else if(req.query.dist != undefined)
        Ligacao.consultarOrigem(req.query.dist)
            .then(dados => res.status(200).jsonp(dados))
            .catch(err => res.status(500).jsonp(err))
    else
        res.status(404).jsonp("Not found")
})

module.exports = router;
