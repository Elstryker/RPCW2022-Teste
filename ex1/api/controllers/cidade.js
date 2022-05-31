var Cidade = require('../models/cidade')

module.exports.listar = () => {
    try
    {
        return Cidade
            .find({},{id:1,_id:0,nome:1,distrito:1})
            .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}

module.exports.consultar = (id) => {
    try {
        return Cidade
                .find({id : id})
                .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}

module.exports.listarNomes = () => {
    try
    {
        return Cidade
            .distinct("nome")
            .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}

module.exports.consultarDistrito = (distrito) => {
    try
    {
        return Cidade
            .find({distrito : distrito},{nome : 1, id: 1, _id : 0})
            .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}

module.exports.agrupaDistrito = () => {
    try
    {
        return Cidade
            .aggregate([
                {
                    $group : {
                        _id : "$distrito",
                        cidades : { $push : { id : "$id", nome : "$nome" }}
                    }
                },
                {
                    $project : {
                        distrito : "$_id",
                        cidades : 1,
                        _id : 0
                    }
                }
            ])
            .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}