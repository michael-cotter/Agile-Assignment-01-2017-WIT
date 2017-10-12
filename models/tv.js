var mongoose = require('mongoose');

var TVSchema = new mongoose.Schema({
    name: {type: String, required:true},//, required: true},
    creator: {type: String, required:true},//, required: true},
    year: { type: Number, min: 1950, max: 2020, required:true},
    seasons: {type: Number,min:0, required:true},
    type: { type: String, enum: ['series', 'mini-series', 'tv movie'], default: 'series', required:true},//, required:true},
    rating: {type: Number, min: 0, max: 10, default: 5, required:true},
    content_rating: {type:String, enum:['TV-Y','TV-Y7','TV-G','TV-PG','TV-14','TV-MA'], required:true},
});

module.exports = mongoose.model('TVCollection', TVSchema);
