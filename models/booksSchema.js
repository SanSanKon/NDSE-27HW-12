const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        // required: true,
        // default: ''
    },
    description: {
        type: String,
        // default: '',
    },
    authors: {
        type: String,
        // required: true,
    },
    favorite: {
        type: String,
    },
    fileCover: {
        type: String,
    },
    fileName: {
        type: String,
    }
});

module.exports = model('Books', bookSchema); 