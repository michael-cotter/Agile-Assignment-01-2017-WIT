var TV_Collection = require('../models/tv');
var express = require('express');

var router = express.Router();

var db = require('../database.js');
//db.connect('demonstration_database');

//Start_of_TV_Functions----------------------------------------------------------------------------------------------

router.tv_findAll = function(req, res) {
    if(req.originalUrl.split('/')[1] == 'tv'){
        TV_Collection.find(function(err, tv_array) {
            //if (err){
                //res.send(err);
            //}else{
                res.json(tv_array);
            //}
        });
    }else{
        res.status(404);
        res.json({message:"Probably sent request parameters by accident!"});
    }
}

router.tv_findOne = function(req, res) {
    //if(req.originalUrl.split('/')[1] == 'tv'){
        TV_Collection.findById(req.params.id, function(err, specific_tv) {
            if (err) {
                res.status(404);
                res.json({message: 'Invalid ID!', errmsg: err});
            }else{
                if(specific_tv === null){
                    res.status(404);
                    res.json({message: 'No TV Show with that ID is in the database.'});
                }
                else{
                    res.json(specific_tv);
                }
            }
        });
    //}
    //else{
        //res.status(404);
        //res.json({message:"Wrong URL request path entered"});
    //}
}

router.tv_findMany = function(req, res){
    if(req.originalUrl !== "/tv/multiple/search"){
        var url_array = req.originalUrl.split('/');
        //if(url_array.length != 4){
            //res.status(404);
            //res.json({message:"Invalid request path!"});
        //}
        //else if(url_array[3] === "search"){
            //res.status(404);
            //res.json({message:"Nothing appended to /search in the request path."});
        //}
        //else{
            var url_query = url_array[3].split('?');
            var url_values = url_query[1].split('=');

            if(url_values[0] == 'ids'){
                if(url_values[1]!==""){
                    var ids_array = url_values[1].split('%2C');

                    //if(url_array[1] == 'tv'){
                        TV_Collection.find(function(err,tv_array){
                            //if(err){
                                //error handling json
                                //res.status(404);
                                //res.json({message:"The find function threw an error!"});
                            //}
                            //else{
                                var matching_tvs = [];
                                //if(ids_array!=null) {
                                    for (var i = 0; i < tv_array.length; i++) {
                                        for (var j = 0; j < ids_array.length; j++) {
                                            if (tv_array[i]._id == ids_array[j]) {
                                                matching_tvs.push(tv_array[i]);
                                                j = ids_array.length;
                                            }
                                        }
                                    }
                                    if (matching_tvs.length == 0) {
                                        res.status(404);
                                        res.json({message: "No TV Objects were found.", array: matching_tvs});//empty array
                                    } else {
                                        res.status(200);
                                        res.json(matching_tvs);
                                    }
                                //}
                                //else{
                                    //res.status(404);
                                    //res.json("Ids_array is equal to null.");
                                //}
                            //}
                        });
                    //}
                    //else{
                        //res.json({message:"There's a problem with your request path!"});
                    //}
                }else{
                    res.status(404);
                    res.json({message:"No ID values were included as request parameters."});
                    //return;
                }
            }else{
                res.status(404);
                res.json({message: "The request parameters needs to be labelled ids."});
                //return;
            }
        //}
    }
    else{
        //put in else:
        res.status(404);
        res.json({message:"You forgot to include request parameters."});
        return;//this is just a kind of hack to prevent a warning!
    }
}

router.tv_substringSearch = function(req, res){
    var url_array = req.originalUrl.split('/');
    /*
    if(req.params.substring_input.match('%20')){

        console.log("Inside Substring if-block");
        var temp_array = [];
        var temp_string = "";
        temp_array = req.params.substring_input.split('%20');
        for(var i = 0; i < temp_array.length; i++){
            if(i === 0){
                temp_string += temp_array[i];
            }else{
                temp_string += (" "+temp_array[i]);
            }
        }
        req.params.substring_input = temp_string;
    }
    */
    //if(url_array[1] === 'tv'){
        TV_Collection.find(function(err,tv_array){
            //if(err){
                //res.status(404);
                //res.send(err);
            //}
            //else{
                var matching_tv_substrings = [];
                for(var i = 0; i < tv_array.length; i++){
                    if(tv_array[i][url_array[3]].toLowerCase().match(req.params.substring_input.toLowerCase()) !== null){
                        matching_tv_substrings.push(tv_array[i]);
                    }
                }
                if(matching_tv_substrings.length === 0){
                    res.status(404);
                    res.json({message:"The substring search failed to return any TV objects"});
                }else{
                    res.json(matching_tv_substrings);
                }
            //}
        });
    //}
    //else{
        //res.status(404);
        //res.json({err:"There's a problem with the search path."});
    //}
}

router.tv_addOne = function(req, res) {
    if(req.originalUrl == '/tv'){
        var new_tv = new TV_Collection();
        new_tv.name = req.body.name;
        if(req.body._id){
            new_tv._id = req.body._id;
        }
        new_tv.creator = req.body.creator;
        new_tv.year = req.body.year;
        new_tv.seasons = req.body.seasons;
        new_tv.type = req.body.type;
        new_tv.rating = req.body.rating;
        new_tv.content_rating = req.body.content_rating;

        new_tv.save(function(err) {
            if (err) {
                res.status(404);
                res.send(err);
            }else{
                res.json({ message: 'TV Show Added to Database!'});
            }
        });
    }
    else{
        res.status(404);
        res.json({message:"There's a problem with the request path"});
    }
}

router.tv_addMany = function(req, res) {
    var url_array = req.originalUrl.split('/');
    //if (url_array[1] == 'tv') {
        if (req.body[req.params.array_name] !== undefined) {
            TV_Collection.create(req.body[req.params.array_name], function (err) {
                if (err) {
                    res.status(404);
                    res.send(err);
                } else {
                    //res.json(req.body[req.params.array_name]);
                    res.json({message: "TV Show(s) added to the database."});
                }
            });
        }else {
            res.status(404);
            res.json({message:"The name of the array in the request path does not match the name of the array that was sent."})
        }
    //} else {
        //res.status(404);
        //res.json({message: 'Request PATH is invalid!'});
    //}
}

router.tv_deleteOne = function(req, res) {
    //if(req.originalUrl.split('/')[1] == 'tv'){
        TV_Collection.findById(req.params.id, function(err, specific_tv) {
            if (err) {
                res.status(404);//invalid id object entered, failed to cast to ObjectID
                res.json({message: 'Invalid ID!', errmsg: err});
            }
            else {
                if(specific_tv === null){
                    res.status(404);
                    res.json({message:"That ID is not present in the database."});
                }else {
                    specific_tv.remove(function (err) {
                        //if (err) {
                            //res.send(err);
                        //} else {
                            res.json({message: 'TV Show Deleted from Database!'});
                        //}
                    });
                }
            }
        });
    //}
    //else{
        //res.status(404);
        //res.json({message: 'Request PATH is invalid!'});
    //}
}

router.tv_deleteMany = function(req, res) {
    var url_array = req.originalUrl.split('/');
    var search_object = {};
    var message = "";
    var delete_everything = true;
    if(url_array.length != 2){ //if url_array.length == 1, delete everything in the collection
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
        search_object[attribute] = attribute_value; //search_object={attribute:attribute_value};
        delete_everything = false;
    }
    //if(url_array[1] == 'tv'){
        if(delete_everything){
            message = "All TV objects have been deleted from the database";
        }else{
            message = 'There are now no TV Objects in the database that have '+attribute_value+' for its '+attribute+'.';
        }
        TV_Collection.remove(search_object,function(err) {
            //if (err) {
                //res.status(404);
                //res.json({message: 'TV Show(s) NOT Found!', error_message: err});
            //}else {
                //res.json({ message: 'TV Show(s) Deleted from Database!'});
                res.json({message: message});
            //}
        });
    //}else{
        //res.status(404);
        //res.json({message: 'Request PATH is invalid!'});
    //}
}

router.tv_getByAttribute = function(req, res) {
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
        //if(url_array[1] == 'tv'){
            TV_Collection.find(search_object,function(err, tv_by_attr_array) {
                //if (err) {
                    //res.json({message: 'TV Show NOT Found!', error_message: err});
                //}else {
                    if(tv_by_attr_array.length==0){
                        res.status(404);
                        res.json({message:"There are no TV Shows with that attribute in the database."});
                    }else{
                        res.json(tv_by_attr_array);
                    }
                //}
            });
        //}else{
            //res.status(404);
            //res.json({message: 'Request PATH is invalid'});
        //}
    }else{
        res.status(404);
        res.json({message:"Request parameters were included, invalidating the search"});
    }
}

router.tv_getAttributeList = function(req, res){
    var url_array = req.originalUrl.split('/');
    var result_array = [];
    //if(url_array[1] == 'tv'){
        TV_Collection.find(function(err, tv_array) {
            //if (err){
                //res.send(err);
            //}else{
                for(var i = 0; i < tv_array.length; i++){
                    result_array.push(tv_array[i][url_array[2]]);
                }
                res.json(result_array);
            //}
        });
    //}
}

router.tv_getSpecificAttribute = function(req,res){
    var url_array = req.originalUrl.split('/');
    //if(url_array[1] == 'tv'){
        TV_Collection.findById(req.params.id, function(err, specific_tv) {
            if (err) {
                res.status(404);
                res.json({message: 'Invalid ID', error_message: err});
            }else {
                if(specific_tv==null){
                    res.status(404);
                    res.json({message: 'This ID is not present in the database.', error_message: err});
                }else{
                    res.json(specific_tv[url_array[3]]);
                }
            }
        });
    //}else{
        //res.status(404);
        //res.json({message:"Invalid request path for this function."});
    //}
}

router.tv_changeAttributeValue = function(req, res) {
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
    //if(url_array[1] == 'tv'){
        TV_Collection.findById(req.params.id, function(err, specific_tv) {
            if (err) {
                res.status(404);
                res.json({message: 'That ID is invalid', error_message: err});
            }else {
                if(specific_tv !== null){
                    specific_tv[url_array[3]] = new_attribute;
                    specific_tv.save(function(err){
                        if(err){
                            res.send(err);
                        }else{
                            res.json({message: "TV Show attribute changed!",data: specific_tv});
                        }
                    });
                }else{
                    res.status(404);
                    res.json({message:"That ID is not present in the database"});
                }
            }
        });
    //}
}

router.tv_changeAttributeValue_patch = function(req, res) {
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
    //if(url_array[1] == 'tv'){
        var search_object = {};
        search_object[url_array[3]] = new_attribute;
        TV_Collection.findOneAndUpdate({_id: req.params.id}, search_object, function(err, retrieved_object){
            if(err){
                res.status(404);
                res.send(err);
            }else{
                if(retrieved_object === null){
                    res.status(404);
                    res.json({message: "A TV Object with that ID could not be found."});
                }else{
                    res.json({message: "The TV Object was successfully patched!"});
                }

            }
        });
    //}else{
        //error handling
        //res.status(404);
        //res.json({error_message:"There's a mistake in your request path, probably!"});
    //}
}

router.tv_incOrDecRating = function(req, res){
    var url_array = req.originalUrl.split('/');
    //if (url_array[1] == 'tv'){
        TV_Collection.findById(req.params.id, function(err, specific_tv) {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
                if (url_array[3] == 'incrementRating') {
                    if (specific_tv !== null) {
                        if (specific_tv.rating != 10) {
                            specific_tv.rating++;
                            specific_tv.save(function (err) {
                                //if(err){
                                //res.send(err);
                                //}else{
                                res.json({message: "TV Show rating incremented!", data: specific_tv});
                                //}
                            });
                        } else {
                            res.json({message: "TV Show already has highest possible rating!"});
                        }
                    } else {
                        res.status(404);
                        res.json({message: "There is no TV Show object with this ID in the database."});
                    }
                //} else if (url_array[3] == 'decrementRating') {
                }else{ //url_array[3] === 'decrementRating'
                    if(specific_tv !== null){
                        if(specific_tv.rating != 0){
                            specific_tv.rating--;
                            specific_tv.save(function(err){
                                //if(err){
                                    //res.send(err);
                                //}else{
                                    res.json({message: "TV Show rating decremented!",data: specific_tv});
                                //}
                            });
                        }else{
                            res.json({message: "TV Show already has lowest possible rating!"});
                        }
                    }else{
                        res.status(404);
                        res.json({message: "There is no TV Show object with this ID in the database."});
                    }
                }
            }
        });
    //}
}

//End_of_TV_Functions------------------------------------------------------------------------------------------------


module.exports = router;