var Movie_Collection = require('../models/movies');
var express = require('express');
var router = express.Router();

var db = require('../database.js');

//Start_of_Movie_Functions---------------------------------------------------------------------------------------------

router.movies_findAll = function(req, res) {
    if(req.originalUrl.split('/')[1] == 'movies'){
        Movie_Collection.find(function(err, movie_array) {            
            res.json(movie_array);
        });
    }
    else{
        res.status(404);
        res.json({message:"Probably sent request parameters by accident!"});
    }
}

router.movies_findOne = function(req, res) {
    Movie_Collection.findById(req.params.id, function(err, specific_movie) {
        if (err) {
            res.status(404);
            res.json({message: 'Invalid ID!', errmsg: err});
        }else {
            if(specific_movie === null){
                res.status(404);
                res.json({message: 'No movie with that ID is in the database.'});
            }
            else{
                res.json(specific_movie);
            }
        }
    });    
}

router.movies_findMany = function(req, res){
    if(req.originalUrl !== "/movies/multiple/search"){
        var url_array = req.originalUrl.split('/');
        var url_query = url_array[3].split('?');
        var url_values = url_query[1].split('=');

        if(url_values[0] == 'ids'){
            if(url_values[1]!==""){
                var ids_array = url_values[1].split('%2C');

                Movie_Collection.find(function(err,movie_array){
                    var matching_movies = [];
                    for(var i = 0; i < movie_array.length; i++) {
                        for(var j = 0; j < ids_array.length; j++){
                            if(movie_array[i]._id == ids_array[j]){
                                matching_movies.push(movie_array[i]);
                                j = ids_array.length;
                            }
                        }
                    }
                    if(matching_movies.length == 0){
                        res.status(404);
                        res.json({message:"No Movie Objects were found.",array:matching_movies});//empty array
                    }else{
                        res.status(200);
                        res.json(matching_movies);
                    }
                });
            }else{
                res.status(404);
                res.json({message:"No ID values were included as request parameters."});
            }
        }else{
            res.status(404);
            res.json({message: "The request parameters needs to be labelled ids."});
        }
    }
    else{
        res.status(404);
        res.json({message:"You forgot to include request parameters."});
        return;
    }
}

router.movies_substringSearch = function(req, res){
    var url_array = req.originalUrl.split('/');
    Movie_Collection.find(function(err,movie_array){            
        var matching_movie_substrings = [];
        for(var i = 0; i < movie_array.length; i++){
            if(movie_array[i][url_array[3]].toLowerCase().match(req.params.substring_input.toLowerCase()) !== null){
                matching_movie_substrings.push(movie_array[i]);
            }
        }
        if(matching_movie_substrings.length === 0){
            res.status(404);
            res.json({message:"The substring search failed to return any Movie objects"});
        }else{
            res.json(matching_movie_substrings);
        }
    });    
}

router.movies_addOne = function(req, res) {
    if(req.originalUrl == '/movies'){
        var new_movie = new Movie_Collection();
        new_movie.name = req.body.name;
        if(req.body._id){
            new_movie._id = req.body._id;
        }
        new_movie.year = req.body.year;
        new_movie.genre = req.body.genre;
        new_movie.type = req.body.type;
        new_movie.cast_and_crew = req.body.cast_and_crew;
        new_movie.rating = req.body.rating;
        new_movie.type = req.body.type;
        new_movie.content_rating = req.body.content_rating;
        new_movie.save(function(err) {
            if (err) {
                res.status(404);
                res.send(err);
            }else{
                res.json({ message: 'Movie Added to Database!'});
            }
        });
    }
    else{
        res.status(404);
        res.json({message:"There's a problem with the request path"});
    }
}

router.movies_addMany = function(req, res) {
    var url_array = req.originalUrl.split('/');
    if (req.body[req.params.array_name] !== undefined) {
        Movie_Collection.create(req.body[req.params.array_name], function (err) {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
                res.json({message: "Movie(s) added to the database."});
            }
        });
    } else {
        res.status(404);
        res.json({message:"The name of the array in the request path does not match the name of the array that was sent."})
    }        
}

router.movies_deleteOne = function(req, res) {
    Movie_Collection.findById(req.params.id, function (err, specific_movie) {
        if (err){
            res.status(404);
            res.json({message: 'Invalid ID!', errmsg: err});
        }
        else {
            if(specific_movie === null){
                res.status(404);
                res.json({message:"That ID is not present in the database."});
            }else {
                specific_movie.remove(function (err) {                        
                    res.json({message: 'Movie Deleted from Database!'});
                });
            }
        }
    });    
}

router.movies_deleteMany = function(req, res) {
    var url_array = req.originalUrl.split('/');
    var search_object = {};
    var message = "";
    var delete_everything = true;
    if(url_array.length != 2){
        var attribute = url_array[2];
        var attribute_value = '';
        var temp_array = url_array[3].split('%20');
        for(var i = 0; i < temp_array.length; i++){
            if(i != temp_array.length-1){
                attribute_value += (temp_array[i] + ' ');
            }else{
                attribute_value += temp_array[i];
            }
        }
        search_object[attribute] = attribute_value;
        delete_everything = false;
    }
    if(delete_everything){
        message = "All Movie objects have been deleted from the database";
    }else{
        message = 'There are now no Movie Objects in the database that have '+attribute_value+' for its '+attribute+'.';
    }
    Movie_Collection.remove(search_object ,function(err) {
        res.json({message: message});
    });    
}

router.movies_getByAttribute = function(req, res) {
    var request_parameter_test = req.originalUrl.split('?ids=');
    if(request_parameter_test[1] === undefined) {
        var url_array = req.originalUrl.split('/');
        var attribute = url_array[2];
        var search_object = {};

        var attribute_value = '';
        var temp_array = url_array[3].split('%20');
        for(var i = 0; i < temp_array.length; i++){
            if(i != temp_array.length-1){
                attribute_value += (temp_array[i] + ' ');
            }else{
                attribute_value += temp_array[i];
            }
        }
        search_object[attribute] = attribute_value;
        Movie_Collection.find(search_object ,function(err, movie_by_attr_array) {
            if(movie_by_attr_array.length===0){
                res.status(404);
                res.json({message:"There are no Movies with that attribute in the database."});
            }else{
                res.json(movie_by_attr_array);
            }
        });           
    }else{
        res.status(404);
        res.json({message:"Request parameters were included, invalidating the search"});
    }
}

router.movies_getAttributeList = function(req, res){
    var url_array = req.originalUrl.split('/');
    var result_array = [];
    Movie_Collection.find(function(err, movie_array) {
        for(var i = 0; i < movie_array.length; i++){
            result_array.push(movie_array[i][url_array[2]]);
        }
        res.json(result_array);
    });
}

router.movies_getSpecificAttribute = function(req,res){
    var url_array = req.originalUrl.split('/');
    Movie_Collection.findById(req.params.id, function(err, specific_movie) {
        if (err) {
            res.status(404);
            res.json({message: 'Invalid ID', error_message: err});
        }else {
            if(specific_movie==null){
                res.status(404);
                res.json({message: 'This ID is not present in the database.', error_message: err});
            }else{
                res.json(specific_movie[url_array[3]]);
            }
        }
    });    
}

router.movies_changeAttributeValue = function(req, res) {
    var url_array = req.originalUrl.split('/');

    var new_attribute = '';
    var temp_array = url_array[4].split('%20');
    for (var i = 0; i < temp_array.length; i++) {
        if (i != temp_array.length - 1) {
            new_attribute += (temp_array[i] + ' ');
        } else {
            new_attribute += temp_array[i];
        }
    }
    Movie_Collection.findById(req.params.id, function(err, specific_movie) {
        if (err) {
            res.status(404);
            res.json({message: 'That ID is invalid!', error_message: err});
        }else {
            if(specific_movie !== null){
                if(url_array[3] == 'replace_cast_and_crew'){
                    if(req.body[url_array[4]] !== undefined){
                        specific_movie.cast_and_crew = req.body[url_array[4]];
                        specific_movie.save(function (err) {
                            res.json({message: "New cast and crew array has replaced old cast and crew array.", data: specific_movie});
                        });
                    }else{
                        res.status(404);
                        res.json({message: "A new Cast and Crew array was not provided; add it to the request body!"});
                    }
                }else {
                    specific_movie[url_array[3]] = new_attribute;
                    specific_movie.save(function (err) {
                        if (err) {
                            res.status(404);
                            res.send(err);
                        } else {
                            res.json({message: "Movie attribute changed!", data: specific_movie});
                        }
                    });
                }
            }else{
                res.status(404);
                res.json({message:"That ID is not present in the database"});
            }
        }
    });
}

router.movies_changeAttributeValue_patch = function(req, res) {
    var url_array = req.originalUrl.split('/');

    var new_attribute = '';
    var temp_array = url_array[4].split('%20');
    for (var i = 0; i < temp_array.length; i++) {
        if (i != temp_array.length - 1) {
            new_attribute += (temp_array[i] + ' ');
        } else {
            new_attribute += temp_array[i];
        }
    }    
    if(url_array[3]==='replace_cast_and_crew'){
        if(req.body[url_array[4]]!== undefined){
            Movie_Collection.findOneAndUpdate({_id: req.params.id}, {cast_and_crew : req.body[url_array[4]]}, function(err, retrieved_object){
                if(err){
                    res.status(404);
                    res.send(err);
                }else{
                    if(retrieved_object === null){
                        res.status(404);
                        res.json({message: "A Movie Object with that ID could not be found."});
                    }else{
                        res.json({message: "The Movie Object was successfully patched!"});
                    }
                }
            });
        }
        else{
            res.status(404);
            res.json({message: "Either a new Cast and Crew array was not provided, or its name does not match the one in the request path!"});
        }
    }else{
        var search_object = {};
        search_object[url_array[3]] = new_attribute;
        Movie_Collection.findOneAndUpdate({_id: req.params.id}, search_object, function(err, retrieved_object){
            if(err){
                res.status(404);
                res.send(err);
            }else{
                if(retrieved_object === null){
                    res.status(404);
                    res.json({message: "A Movie Object with that ID could not be found."});
                }else{
                    res.json({message: "The Movie Object was successfully patched!"});
                }
            }
        });
    }    
}

router.movies_incOrDecRating = function(req, res){
    var url_array = req.originalUrl.split('/');

    Movie_Collection.findById(req.params.id, function(err, specific_movie) {
        if (err) {
            res.status(404);
            res.send(err);
        } else {
            if (url_array[3] == 'incrementRating') {
                if (specific_movie !== null) {
                    if (specific_movie.rating != 10) {
                        specific_movie.rating++;
                        specific_movie.save(function (err) {                            
                            res.json({message: "Movie rating incremented!", data: specific_movie});
                        });
                    } else {
                        res.json({message: "Movie already has highest possible rating!"});
                    }
                } else {
                    res.status(404);
                    res.json({message: "There is no Movie object with this ID in the database."});
                }
            }else{
                if(specific_movie !== null){
                    if(specific_movie.rating != 0){
                        specific_movie.rating--;
                        specific_movie.save(function(err){                            
							res.json({message: "Movie rating decremented!",data: specific_movie});
                        });
                    }else{
                        res.json({message: "Movie already has lowest possible rating!"});
                    }
                }else{
                    res.status(404);
                    res.json({message: "There is no Movie object with this ID in the database."});
                }
            }
        }
    });
}

router.movies_addOrRemoveCastOrCrewMember = function(req,res){
    var url_array = req.originalUrl.split('/');

    var cast_or_crew_member = '';
    var temp_array = url_array[4].split('%20');
    for(var i = 0; i < temp_array.length; i++){
        if(i != temp_array.length-1){
            cast_or_crew_member += (temp_array[i] + ' ');
        }else{
            cast_or_crew_member += temp_array[i];
        }
    }
    Movie_Collection.findById(req.params.id, function(err, specific_movie){
        if(err){
            res.status(404);
            res.send(err);
        }else{
            if(specific_movie !== null){
                var already_present = false;
                var removal_successful = false;
                if(url_array[3] == 'add_cast_and_crew'){
                    var new_array = [];
                    new_array = specific_movie.cast_and_crew;
                    for(var i = 0; i < new_array.length; i++){
                        if(cast_or_crew_member.toLowerCase() == new_array[i].toLowerCase()){
                            already_present = true;
                            i = new_array.length;
                        }
                    }
                    if(!already_present){
                        new_array.push(cast_or_crew_member);
                        specific_movie.cast_and_crew = new_array;
                    }
                }else{
                    var new_array = [];
                    for(var i = 0; i < specific_movie.cast_and_crew.length; i++){
                        if(cast_or_crew_member != specific_movie.cast_and_crew[i]){
                            new_array.push(specific_movie.cast_and_crew[i]);
                        }else{
                            removal_successful = true;
                        }
                    }
                    specific_movie.cast_and_crew = new_array;
                }
                specific_movie.save(function(err){                    
                    if(url_array[3] === 'add_cast_and_crew'){
                        if(already_present){
                            res.status(404);
                            res.json({message: 'Cast/Crew member already present.', data: specific_movie});
                        }
						else{
							res.status(200);
                            res.json({message: 'Cast/Crew member added!', data: specific_movie})
						}
					}
					else{
						if(removal_successful){
							res.status(200);
							res.json({message: 'Cast/Crew Updated.', data: specific_movie});
						}else{
							res.status(404);
							res.json({message: 'Cast/Crew could not be found; was not removed.', data: specific_movie});
						}
					}
                });
            }else{
                res.status(404);
                res.json({message:"That ID is not present in the database."});
            }
        }
    });
}

router.movies_getByCastOrCrewMember = function(req, res){
    var request_parameter_test = req.originalUrl.split('?ids=');
    if(request_parameter_test[1] === undefined) {
        Movie_Collection.find(function(err, movie_array) {            
			var array_of_movies_featuring_member = [];
			for(var i = 0; i < movie_array.length; i++){
				for(var j = 0; j < movie_array[i].cast_and_crew.length; j++){
					if(movie_array[i].cast_and_crew[j].toLowerCase() == req.params.cast_and_crew_member.toLowerCase()){
						array_of_movies_featuring_member.push(movie_array[i]);
						j = movie_array[i].cast_and_crew.length;
					}
				}
			}
			if(array_of_movies_featuring_member.length==0){
				res.status(404);
				res.json({message:"There are no Movie Object\'s featuring this cast/crew member."});
			}
			else{
				res.status(200);
				res.json(array_of_movies_featuring_member);
			}
        });
    }else{
        res.status(404);
        res.json({message:"Request parameters were included, invalidating the search"});
    }
}

//End_of_Movie_Functions-----------------------------------------------------------------------------------------------


module.exports = router;