/*eslint no-unused-vars: "off" */
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');

var movie_functions = require('./routes/movie_functions.js');
var tv_functions = require('./routes/tv_functions.js');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//if(process.env.NODE_ENV == 'test'){
//console.log("process.env.NODE_ENV: "+process.env.NODE_ENV);
//app.use(logger('dev'));
//}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', routes);


/*
103 Requests{
49  Gets
18  Deletes
4   Posts
19  Puts
13  Patches
}
 */


app.get('/tv', tv_functions.tv_findAll); //tested
app.get('/tv/:id', tv_functions.tv_findOne); //tested
app.post('/tv', tv_functions.tv_addOne); //tested
app.delete('/tv/:id', tv_functions.tv_deleteOne); //tested

app.get('/tv/multiple/search', tv_functions.tv_findMany);//include comma-separated ids as request parameters //tested
app.post('/tv/:array_name', tv_functions.tv_addMany); //tested
app.delete('/tv',tv_functions.tv_deleteMany); //tested

app.get('/tv/fuzzy/name/:substring_input', tv_functions.tv_substringSearch);
app.get('/tv/fuzzy/creator/:substring_input', tv_functions.tv_substringSearch);
app.get('/tv/fuzzy/type/:substring_input', tv_functions.tv_substringSearch);
app.get('/tv/fuzzy/content_rating/:substring_input', tv_functions.tv_substringSearch);

app.delete('/tv/name/:name_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/creator/:creator_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/year/:year_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/seasons/:seasons_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/type/:type_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/rating/:rating_val', tv_functions.tv_deleteMany); //tested
app.delete('/tv/content_rating/:content_rating_val', tv_functions.tv_deleteMany);//tested

app.get('/tv/name/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/creator/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/year/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/seasons/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/type/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/rating/list/all', tv_functions.tv_getAttributeList);//tested
app.get('/tv/content_rating/list/all', tv_functions.tv_getAttributeList);//tested

app.get('/tv/:id/name', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/creator', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/year', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/seasons', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/type', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/rating', tv_functions.tv_getSpecificAttribute);//tested
app.get('/tv/:id/content_rating', tv_functions.tv_getSpecificAttribute);//tested

app.get('/tv/name/:name_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/creator/:creator_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/year/:year_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/seasons/:seasons_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/type/:type_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/rating/:rating_val', tv_functions.tv_getByAttribute);//tested
app.get('/tv/content_rating/:content_rating_val', tv_functions.tv_getByAttribute);//tested

app.put('/tv/:id/name/:new_value', tv_functions.tv_changeAttributeValue);//tested
app.put('/tv/:id/creator/:new_value', tv_functions.tv_changeAttributeValue);
app.put('/tv/:id/year/:new_value', tv_functions.tv_changeAttributeValue);
app.put('/tv/:id/seasons/:new_value', tv_functions.tv_changeAttributeValue);
app.put('/tv/:id/rating/:new_value', tv_functions.tv_changeAttributeValue);
app.put('/tv/:id/content_rating/:new_value', tv_functions.tv_changeAttributeValue);
app.put('/tv/:id/incrementRating', tv_functions.tv_incOrDecRating);
app.put('/tv/:id/decrementRating', tv_functions.tv_incOrDecRating);//tested

app.patch('/tv/:id/name/:new_value', tv_functions.tv_changeAttributeValue_patch);
app.patch('/tv/:id/creator/:new_value', tv_functions.tv_changeAttributeValue_patch);
app.patch('/tv/:id/year/:new_value', tv_functions.tv_changeAttributeValue_patch);
app.patch('/tv/:id/seasons/:new_value', tv_functions.tv_changeAttributeValue_patch);
app.patch('/tv/:id/rating/:new_value', tv_functions.tv_changeAttributeValue_patch);//tested
app.patch('/tv/:id/content_rating/:new_value', tv_functions.tv_changeAttributeValue_patch);//tested



app.get('/movies', movie_functions.movies_findAll); //tested
app.get('/movies/:id', movie_functions.movies_findOne); //tested
app.post('/movies/', movie_functions.movies_addOne); //tested
app.delete('/movies/:id', movie_functions.movies_deleteOne); //tested

app.get('/movies/multiple/search', movie_functions.movies_findMany);//include comma-separated ids as request parameters //tested
app.post('/movies/:array_name', movie_functions.movies_addMany); //add an array of movies to the request body; //tested
app.delete('/movies',movie_functions.movies_deleteMany); //tested

app.get('/movies/fuzzy/name/:substring_input', movie_functions.movies_substringSearch);
app.get('/movies/fuzzy/genre/:substring_input', movie_functions.movies_substringSearch);
app.get('/movies/fuzzy/type/:substring_input', movie_functions.movies_substringSearch);
app.get('/movies/fuzzy/content_rating/:substring_input', movie_functions.movies_substringSearch);

app.delete('/movies/name/:name_val', movie_functions.movies_deleteMany);//case sensitive //tested
app.delete('/movies/year/:year_val', movie_functions.movies_deleteMany);//case sensitive //tested
app.delete('/movies/genre/:genre_val', movie_functions.movies_deleteMany);//case sensitive //tested
app.delete('/movies/type/:type_val', movie_functions.movies_deleteMany);//case sensitive //tested
app.delete('/movies/rating/:rating_val', movie_functions.movies_deleteMany);//case sensitive //tested
app.delete('/movies/content_rating/:content_rating_val', movie_functions.movies_deleteMany);//case sensitive //tested

app.get('/movies/name/:name_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/year/:year_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/genre/:genre_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/type/:type_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/rating/:rating_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/content_rating/:content_rating_val', movie_functions.movies_getByAttribute);//case sensitive //tested
app.get('/movies/cast_and_crew/:cast_and_crew_member', movie_functions.movies_getByCastOrCrewMember); //tested

app.get('/movies/name/list/all', movie_functions.movies_getAttributeList);//tested
app.get('/movies/year/list/all', movie_functions.movies_getAttributeList); //tested
app.get('/movies/genre/list/all', movie_functions.movies_getAttributeList); //tested
app.get('/movies/type/list/all', movie_functions.movies_getAttributeList); //tested
app.get('/movies/rating/list/all', movie_functions.movies_getAttributeList); //tested
app.get('/movies/content_rating/list/all', movie_functions.movies_getAttributeList); //tested
app.get('/movies/cast_and_crew/list/all', movie_functions.movies_getAttributeList); //tested

app.get('/movies/:id/name', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/year', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/genre', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/type', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/rating', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/content_rating', movie_functions.movies_getSpecificAttribute);//tested
app.get('/movies/:id/cast_and_crew', movie_functions.movies_getSpecificAttribute);//tested

app.put('/movies/:id/name/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/year/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/genre/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/type/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/rating/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/content_rating/:new_val', movie_functions.movies_changeAttributeValue);
app.put('/movies/:id/replace_cast_and_crew/:array_name', movie_functions.movies_changeAttributeValue);//tested//include new cast and crew array in request body//tested

app.put('/movies/:id/add_cast_and_crew/:add_member', movie_functions.movies_addOrRemoveCastOrCrewMember);//tested
app.put('/movies/:id/del_cast_and_crew/:del_member', movie_functions.movies_addOrRemoveCastOrCrewMember);//tested
app.put('/movies/:id/incrementRating', movie_functions.movies_incOrDecRating);//tested
app.put('/movies/:id/decrementRating', movie_functions.movies_incOrDecRating);//tested

app.patch('/movies/:id/name/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/year/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/genre/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/type/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/rating/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/content_rating/:new_val', movie_functions.movies_changeAttributeValue_patch);
app.patch('/movies/:id/replace_cast_and_crew/:array_name', movie_functions.movies_changeAttributeValue_patch);//tested//include new cast and crew array in request body//tested



/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

module.exports = app;