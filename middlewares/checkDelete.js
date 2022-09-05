const Image = require("../db/models/Image");

const checkDelete = async (req, res, next) => {
    // Verificamos si existe la data
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            code: 400,
            msg: 'You must send an id'
        });
    }

    // Validamos si es un _id de moongose
    const idValidate = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)
    if (!idValidate) {
        return res.status(400).json({
            code: 400,
            msg: 'Only mongo id allowed'
        });
    }

    // Verificamos si existe en la db
    const image = await Image.findById(id)

    if (!image) {
        return res.status(400).json({
            code: 400,
            msg: 'There is no such element'
        });
    }


    next();
}

module.exports = checkDelete;