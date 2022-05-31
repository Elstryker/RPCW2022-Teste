var Ligacao = require('../models/ligacao')

module.exports.consultarOrigem = (or) => {
    try {
        return Ligacao
                .aggregate([
                    {
                        $match : {
                            "origem": or
                        }
                    },
                    {
                        $lookup : {
                            "from": "cidades",
                            "localField": "origem",
                            "foreignField": "id",
                            "as": "origem"
                        }
                    },
                    {
                        $project : {
                            _id : 0,
                            id : 1,
                            "origem.id":1,
                            "origem.nome":1
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

module.exports.consultarDestino = (distancia) => {
    try {
        return Ligacao
                .find({distancia : { $ge : distancia }})
                .exec()
    }
    catch (err) {
        console.log(err)
        return undefined
    }
}