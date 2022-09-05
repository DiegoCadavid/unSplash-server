const express = require('express');
const Image = require('../db/models/Image');
const imageRouter = express.Router();

// Middlewares
const checkBody = require('../middlewares/checkBody');
const checkDelete = require('../middlewares/checkDelete');


//CREATE
imageRouter.post('/', [checkBody], async (req, res) => {
    // Obtenemos los datos de la request
    const { label, url } = req.body;

    // Crear un modelo de la DB
    const image = new Image({
        label,
        url
    })

    // Guardar modelo en la DB
    await image.save();

    // Damos una response ^^
    res.status(200).json({
        url: image.url,
        label: image.label,
        id: image._id
    });
})

// READ
imageRouter.get('/', async(req, res) => {

    // Vemos si existe el query "search"
    const { search = "" } = req.query;

    // Vemos si existe el search
    const images = await Image.find({ 'label': { '$regex': search, '$options': 'i' } });

    // Formateamos la response
    const imagesFormat = images.map( e => {
        return {
            label: e.label, 
            url: e.url,
            id: e._id
        }
    })

    res.status(200).json(imagesFormat)
})

// DELETE
imageRouter.delete('/',[checkDelete], async(req, res) => {
    // Obtenemos datos
    const { id } = req.body;

    // Buscamos y eliminamos en la Db
    const imageRemove = await Image.findByIdAndDelete(id);;

    res.status(200).json({
        id : imageRemove._id
    });
})

module.exports = imageRouter;