const Image = require("../db/models/Image");

const checkBody = async (req, res, next) => {



    // Comprobar 
    const { label, url } = req.body;

    // Verificamos si existen
    if(!label || !url) {
        return res.status(400).json({
            code: 400,
            msg : 'missing fields'
        })
    }

    // Validamos texto
    if(label.trim().length <= 0){
        return res.status(400).json({
            code: 400,
            msg: 'invalid label'
        });
    }

    // validamos url
    const urlValidate = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    if(!urlValidate) {
        return res.status(400).json({
            code: 400,
            msg: 'invalid url'
        });
    }

    // Vemos si la url no se encuentra en la DB
    image = await Image.findOne({ url });
    if(image) {
        return res.status(409).json({
            code: 409,
            msg: 'That url already exists'
        });
    }

    // Formateamos texto
    req.body.label = label.trim();


    // Fin del middleware :)
    next();
}

module.exports = checkBody;