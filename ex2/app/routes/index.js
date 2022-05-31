var express = require('express');
var router = express.Router();
var fs = require('fs');
var axios = require('axios');

function getApiKey() {
    var key = String(fs.readFileSync('../.env', 'utf8'));
    return key
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/classes', function(req, res, next) {
    var key = getApiKey();
    console.log(key)
    axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + key)
        .then(function(response) {
            var data = response.data
            res.status(200).render('classes', {classes: data});
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).render('error',{error:err})
        })
});


router.get('/classes/:codigo', function(req, res, next) {
    var key = getApiKey();
    console.log(key)
    axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.codigo + '?info=completa&token=' + key)
        .then(function(response) {
            var data = response.data
            res.status(200).render('classe', {classe: data});
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).render('error',{error:err})
        })
});


router.get('/termosIndice', function(req, res, next) {
    var key = getApiKey();
    console.log(key)
    axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + key)
        .then(function(response) {
            var data = response.data
            res.status(200).render('termosIndice', {termos: data});
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).render('error',{error:err})
        })
})



module.exports = router;
