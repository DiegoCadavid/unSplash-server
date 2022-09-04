const { Schema, model } = require('mongoose');

// Modelo : 
// Url string required - uniqued

const imageSchema = new Schema({ 
    'label' : { type: Schema.Types.String, default: 'Label' },
    'url' : { type: Schema.Types.String, unique: true,  required: true }
})

const Image = model('Image',imageSchema);
module.exports = Image;