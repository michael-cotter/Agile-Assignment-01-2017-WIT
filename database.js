/*eslint no-unused-vars: "off" */
var mongoose = require ('mongoose');
var Movie_Collection = require('./models/movies');
var TV_Collection = require('./models/tv');

var TEST = 'movie_and_tv_database';
var DEMO = 'demonstration_database';

var current_database = TEST;

mongoose.connect ('mongodb://localhost:27017/'+current_database,{
    useMongoClient: true,
});
var mongoose_connection = mongoose.connection;
mongoose.Promise = require('bluebird');

mongoose_connection.on('open',function(){});

/*
mongoose_connection.on('error', function (err) {
    throw err;
});
*/

mongoose_connection.resetTVCollection = function(done){
    TV_Collection.remove({},function(err) {
        //if(!err){
            var new_tv0 = new TV_Collection();
            new_tv0.name = 'Mr. Robot';
            new_tv0._id = '59e903b7d6278514683fedce';
            new_tv0.creator = 'Sam Esmail';
            new_tv0.year = 2015;
            new_tv0.seasons = 3;
            new_tv0.type = 'series';
            new_tv0.rating = 7;
            new_tv0.content_rating = 'TV-MA';
            new_tv0.save(function (err) {
                //if(!err){
                    var new_tv1 = new TV_Collection();
                    new_tv1.name = 'Breaking Bad';
                    new_tv1.creator = 'Vince Gilligan';
                    new_tv1._id = '59e903b7d6278514683fedcf';
                    new_tv1.year = 2009;
                    new_tv1.seasons = 5;
                    new_tv1.type = 'series';
                    new_tv1.rating = 9;
                    new_tv1.content_rating = 'TV-MA';
                    new_tv1.save(function (err) {
                        //if(!err) {
                            done();
                        //}
                    });
                //}
            });
        //}
    });
};

mongoose_connection.resetMovieCollection = function(done){
    Movie_Collection.remove({},function(err) {
        //if(!err){
            var new_movie0 = new Movie_Collection();
            new_movie0.name = 'Blade Runner';
            new_movie0._id = '59eb66125b06692facbcd437';
            new_movie0.year = 1982;
            new_movie0.genre = 'Sci-fi Detective';
            new_movie0.type = 'feature';
            new_movie0.rating = 5;
            new_movie0.content_rating = 'R';
            new_movie0.cast_and_crew = ['Harrison Ford','Rutger Hauer','Ridley Scott','Vangelis','Hampton Fancher','Jordan Cronenweth'];
            new_movie0.save(function (err) {
                //if(!err){
                    var new_movie1 = new Movie_Collection();
                    new_movie1.name = 'No Country for Old Men';
                    new_movie1._id = '59eb66125b06692facbcd438';
                    new_movie1.year = 2007;
                    new_movie1.genre = 'Western Drama';
                    new_movie1.type = 'feature';
                    new_movie1.rating = 9;
                    new_movie1.content_rating = 'R';
                    new_movie1.cast_and_crew = ['Josh Brolin','Tommy Lee Jones','Javier Bardem','Kelly MacDonald','Woody Harrelson','Joel Coen','Ethan Coen','Roger Deakins'];
                    new_movie1.save(function (err) {
                        //if(!err) {
                            done();
                        //}
                    });
                //}
            });
        //}
    });
};

module.exports = mongoose_connection;