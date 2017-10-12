var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    name: {type: String, required:true},
    year: {type: Number, min: 1900, max: 2040, required:true},
    genre: {type: String, required:true},
    type: {type: String, enum: ['short', 'feature'], required: true},
    rating: {type: Number, min: 0, max: 10, default: 5, required:true},
    content_rating: {type:String, enum:['G','PG','PG-13','R','NC-17'], required:true},
    cast_and_crew: {type:[String], required:true},
});

module.exports = mongoose.model('MovieCollection', MovieSchema);