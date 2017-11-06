# Assignment 1 - API testing and Source Control.

Name: Michael Cotter

Student ID: 20078933

## Overview.

This system is a RESTful node application that can create, retrieve, update, and delete documents stored in two collections in a MongoDB database. Each collection is represented by a unique Mongoose schema. One of the collections is designed to store information relating to Movies, the other is designed to store information relating to TV shows.

The system features 103 end points, including 49 GETs, 18 DELETEs, 4 POSTs, 19 PUTs, and 13 PATCHs.

There are 196 tests in the project. The file movie_functions-text.js contains 103 tests, the file tv_function-test.js contains 93 tests.

The following test principles are observed: the silent principle; expectations about the target state are checked when relevant; test are written for normal cases, relevant boundary cases, and relevant error cases; test case isolation.

To run the tests, run the command:

	$npm test

## API endpoints.
 ___
 ___ 
 + GET /tv — (Get all TV documents)
 + GET /tv/:id — (Get a specific TV document)
 + POST /tv — (Add a valid TV document to the database)
 + DELETE /tv/:id — (Delete a specific TV document)


 + GET /tv/multiple/search — (Send IDs as request parameters, get specific TV documents)
 + POST /tv/:array_name — (Add array of valid TV documents)
 + DELETE /tv — (Delete all the TV documents in the database)
  
 
 + GET /tv/fuzzy/name/:substring_input — (Get TV documents, the names of which feature :substring_input as a substring)
 + GET /tv/fuzzy/creator/:substring_input — (Get TV documents, the creators of which feature :substring_input as a substring)
 + GET /tv/fuzzy/type/:substring_input — (Get TV documents, the types of which feature :substring_input as a substring)
 + GET /tv/fuzzy/content_rating/:substring_input — (Get TV documents, the content_ratings of which feature :substring_input as a substring)
 

 + DELETE /tv/name/:name_val — (Delete TV documents, the names of which match :name_val)
 + DELETE /tv/creator/:creator_val — (Delete TV documents, the creators of which match :creator_val)
 + DELETE /tv/year/:year_val — (Delete TV documents, the years of which match :year_val)
 + DELETE /tv/seasons/:seasons_val — (Delete TV documents, the seasons of which match :seasons_val)
 + DELETE /tv/type/:type_val — (Delete TV documents, the types of which match :type_val)
 + DELETE /tv/rating/:rating_val — (Delete TV documents, the names of which match :rating_val)
 + DELETE /tv/content_rating/:content_rating_val — (Delete TV documents, the content_rating of which match :content_rating_val)
 

 + GET /tv/name/list/all — (List all the TV documents' name values)
 + GET /tv/creator/list/all — (List all the TV documents' creator values)
 + GET /tv/year/list/all — (List all the TV documents' year values)
 + GET /tv/seasons/list/all — (List all the TV documents' seasons values)
 + GET /tv/type/list/all — (List all the TV documents' type values)
 + GET /tv/rating/list/all — (List all the TV documents' rating values)
 + GET /tv/content_rating/list/all — (List all the TV documents' content_rating values)
 

 + GET /tv/:id/name — (Get the id-specified TV document's name value)
 + GET /tv/:id/creator — (Get the id-specified TV document's creator value)
 + GET /tv/:id/year — (Get the id-specified TV document's year value)
 + GET /tv/:id/seasons — (Get the id-specified TV document's seasons value)
 + GET /tv/:id/type — (Get the id-specified TV document's type value)
 + GET /tv/:id/rating — (Get the id-specified TV document's rating value)
 + GET /tv/:id/content_rating — (Get the id-specified TV document's content_rating value)
 

 + GET /tv/name/:name_val — (Get all the TV documents the names of which match :name_val)
 + GET /tv/creator/:creator_val — (Get all the TV documents the creators of which match :creator_val)
 + GET /tv/year/:year_val — (Get all the TV documents the years of which match :year_val)
 + GET /tv/seasons/:seasons_val — (Get all the TV documents the seasons of which match :seasons_val)
 + GET /tv/type/:type_val — (Get all the TV documents the types of which match :type_val)
 + GET /tv/rating/:rating_val — (Get all the TV documents the rating of which match :rating_val)
 + GET /tv/content_rating/:content_rating_val — (Get all the TV documents the content_rating of which match :content_rating_val)
 

 + PUT /tv/:id/name/:new_value — (Replace an id-specified TV document with a new document with a name value set to :new_value)
 + PUT /tv/:id/creator/:new_value — (Replace an id-specified TV document with a new document with a creator value set to :new_value)
 + PUT /tv/:id/year/:new_value — (Replace an id-specified TV document with a new document with a year value set to :new_value)
 + PUT /tv/:id/seasons/:new_value — (Replace an id-specified TV document with a new document with a seasons value set to :new_value)
 + PUT /tv/:id/rating/:new_value — (Replace an id-specified TV document with a new document with a rating value set to :new_value)
 + PUT /tv/:id/content_rating/:new_value — (Replace an id-specified TV document with a new document with a content_rating value set to :new_value)
 + PUT /tv/:id/incrementRating — (Replace an id-specified TV document with a new document with a rating value set to the old value plus one)
 + PUT /tv/:id/decrementRating — (Replace an id-specified TV document with a new document with a rating value set to the old value minus one)
 

 + PATCH /tv/:id/name/:new_value — (Update the name attribute of an id-specified TV document)
 + PATCH /tv/:id/creator/:new_value — (Update the creator attribute of an id-specified TV document)
 + PATCH /tv/:id/year/:new_value — (Update the year attribute of an id-specified TV document)
 + PATCH /tv/:id/seasons/:new_value — (Update the seasons attribute of an id-specified TV document)
 + PATCH /tv/:id/rating/:new_value — (Update the rating attribute of an id-specified TV document)
 + PATCH /tv/:id/content_rating/:new_value — (Update the content_rating attribute of an id-specified TV document)
 ---
 + GET /movies — (Get all Movie documents)
 + GET /movies/:id — (Get a specific Movie document)
 + POST /movies — (Add a valid Movie document to the database)
 + DELETE /movies/:id — (Delete a specific Movie document)
 

 + GET /movies/multiple/search — (Send IDs as request parameters, get specific Movie documents)
 + POST /movies/:array_name — (Add array of valid Movie documents)
 + DELETE /movies — (Delete all the Movie documents in the database)


 + GET /movies/fuzzy/name/:substring_input — (Get Movie documents, the names of which feature :substring_input as a substring)
 + GET /movies/fuzzy/genre/:substring_input — (Get Movie documents, the genres of which feature :substring_input as a substring)
 + GET /movies/fuzzy/type/:substring_input — (Get Movie documents, the types of which feature :substring_input as a substring)
 + GET /movies/fuzzy/content_rating/:substring_input — (Get Movie documents, the content_ratings of which feature :substring_input as a substring)


 + DELETE /movies/name/:name_val — (Delete Movie documents, the names of which match :name_val)
 + DELETE /movies/year/:year_val — (Delete Movie documents, the years of which match :year_val)
 + DELETE /movies/genre/:genre_val — (Delete Movie documents, the genres of which match :genre_val(
 + DELETE /movies/type/:type_val — (Delete Movie documents, the types of which match :type_val)
 + DELETE /movies/rating/:rating_val — (Delete Movie documents, the ratings of which match :rating_val)
 + DELETE /movies/content_rating/:content_rating_val — (Delete Movie documents, the content_ratings of which match :content_rating_val)


 + GET /movies/name/:name_val — (Get all the Movie documents the names of which match :name_val)
 + GET /movies/year/:year_val — (Get all the Movie documents the years of which match :year_val)
 + GET /movies/genre/:genre_val — (Get all the Movie documents the genres of which match :genre_val)
 + GET /movies/type/:type_val — (Get all the Movie documents the types of which match :type_val)
 + GET /movies/rating/:rating_val — (Get all the Movie documents the ratings of which match :rating_val)
 + GET /movies/content_rating/:content_rating_val — (Get all the Movie documents the content_rating of :content_rating_val)
 + GET /movies/cast_and_crew/:cast_and_crew_member — (Get all the Movie documents the cast_and_crews of which feature :cast_and_crew_member)


 + GET /movies/name/list/all — (List all the Movie documents' name values)
 + GET /movies/year/list/all — (List all the Movie documents' year values)
 + GET /movies/genre/list/all — (List all the Movie documents' genre values)
 + GET /movies/type/list/all — (List all the Movie documents' type values)
 + GET /movies/rating/list/all — (List all the Movie document's rating values)
 + GET /movies/content_rating/list/all — (List all the Movie documents' content_rating values)
 + GET /movies/cast_and_crew/list/all — (List all the Movie documents' cast_and_crew values)


 + GET /movies/:id/name — (Get the id-specified Movie document's name value)
 + GET /movies/:id/year — (Get the id-specified Movie document's year value)
 + GET /movies/:id/genre — (Get the id-specified Movie document's genre value)
 + GET /movies/:id/type — (Get the id-specified Movie document's type value)
 + GET /movies/:id/rating — (Get the id-specified Movie document's rating value)
 + GET /movies/:id/content_rating — (Get the id-specified Movie document's content_rating value)
 + GET /movies/:id/cast_and_crew — (Get the id-specified Movie document's cast_and_crew array)
 

 + PUT /movies/:id/name/:new_val — (Replace an id-specified Movie document with a new document with a name value set to :new_val)
 + PUT /movies/:id/year/:new_val — (Replace an id-specified Movie document with a new document with a year value set to :new_val)
 + PUT /movies/:id/genre/:new_val — (Replace an id-specified Movie document with a new document with a genre value set to :new_val)
 + PUT /movies/:id/type/:new_val — (Replace an id-specified Movie document with a new document with a type value set to :new_val)
 + PUT /movies/:id/rating/:new_val — (Replace an id-specified Movie document with a new document with a rating value set to :new_val)
 + PUT /movies/:id/content_rating/:new_val — (Replace an id-specified Movie document with a new document with a content_rating value set to :new_val)
 + PUT /movies/:id/replace_cast_and_crew/:array_name — (Replace an id-specified Movie document with a new document with a cast_and_crew array set to the valid array sent in the request body)


 + PUT /movies/:id/add_cast_and_crew/:add_member — (Replace an id-specified Movie document with a new document with a cast_and_crew array that now includes :add_member)
 + PUT /movies/:id/del_cast_and_crew/:del_member — (Replace an id-specified Movie document with a new document with a cast_and_crew array that no longer includes :del_member)
 + PUT /movies/:id/incrementRating — (Replace an id-specified Movie document with a new document with a rating value set to the old value plus one)
 + PUT /movies/:id/decrementRating — (Replace an id-specified Movie document with a new document with a rating value set to the old value plus one)
 

 + PATCH /movies/:id/name/:new_val — (Update the name attribute of an id-specified Movie document)
 + PATCH /movies/:id/year/:new_val — (Update the year attribute of an id-specified Movie document)
 + PATCH /movies/:id/genre/:new_val — (Update the genre attribute of an id-specified Movie document)
 + PATCH /movies/:id/type/:new_val — (Update the type attribute of an id-specified Movie document)
 + PATCH /movies/:id/rating/:new_val — (Update the rating attribute of an id-specified Movie document)
 + PATCH /movies/:id/content_rating/:new_val — (Update the content_rating attribute of an id-specified Movie document)
 + PATCH /movies/:id/replace_cast_and_crew/:array_name — (Update the cast_and_crew array an id-specified Movie document with a new array sent in the request body)
 ___
 ___

## Data storage.

Persistence is handled by the MongoDB database, which stores two mongoose schema-defined collections, one representing Movies, the other representing TV shows.

Movie Schema:

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

Example Movie document:

    {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]}

TV Schema:

    var mongoose = require('mongoose');

    var TVSchema = new mongoose.Schema({
        name: {type: String, required:true},//, required: true},
        creator: {type: String, required:true},//, required: true},
        year: { type: Number, min: 1950, max: 2020, required:true},
        seasons: {type: Number,min:0, required:true},
        type: { type: String, enum: ['series', 'mini-series', 'tv movie'], default: 'series', required:true},//, required:true},
        rating: {type: Number, min: 0, max: 10, default: 5, required:true},
        content_rating:{type:String,enum:['TV-Y','TV-Y7','TV-G','TV-PG','TV-14','TV-MA'], required:true},
    });

    module.exports = mongoose.model('TVCollection', TVSchema);


Example TV document:
    
    {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"}



## Sample Test execution.

    $npm test

    > donationweb-3.0@0.0.0 test C:\Users\Windows User\Desktop\CentralHub\Dropbox\Subjects\Semester 1\Agile Software Practice-91984-[2017-2018]\Assignments\Assignment 0\Solution\assignment_01
    > set NODE_ENV=test && mocha test/routes
        
    Movie Functions
      GET Functions
        GET   /movies   function:findAll
          /movies
            √ should return all the Movies in the Database (61ms)
          /movies?ids=1,2,3,4
            √ should return an error, when request parameters are attached to request path
    
        GET   /movies/:id   function:findOne
          /movies/59eb66125b06692facbcd438
            √ should return an id-specified Movie object
          /movies/59e903b
            √ should return an error message, when an invalid ID is entered
          /movies/59e903b7d6278514683fed11
            √ should return an error message, when an valid ID not found in the database is entered
    
        GET   /movies/multiple/search   function:findMany [requires the inclusion of request parameters]
          /movies/multiple/search?ids=59eb66125b06692facbcd437%2C59eb66125b06692facbcd438
            √ should return an array of Movie objects whose IDs match those sent as request parameters
          /movies/multiple/search?ids=59eb66125b06692facbcd437
            √ should return an array containing a single Movie object, the ID of which was sent as a request parameter
          /movies/multiple/search?ids=59eb66125b06692facbcd437%2C1234
            √ should return an array containing as many Movie objects as there were valid IDs sent as request parameters
          /movies/multiple/search?ids=59eb66125b06692facbcd437345345342C1234
            √ should return an empty array when no valid Movie Object IDs were sent as request parameters
          /movies/multiple/search?something=59eb66125b06692facbcd437345345342C1234
            √ should return an error when request parameters are incorrectly labelled
          /movies/multiple/search?ids=
            √ should return an error when no request parameters are are included after ids=
          /movies/multiple/search
            √ should return an error when request path is invalid
    
        GET   /movies/fuzzy/*attribute*/:substring_input   function:substringSearch
          /movies/fuzzy/name/r
            √ should return all Movie objects, the names of which contain :substring_input as a substring, regardless of case
          /movies/fuzzy/name/No Country for Old Men
            √ should return a Movie object, the name of which is the exactly the same as :substring_input, regardless of case
          /movies/fuzzy/name/No%20Country%20for%20Old%20Men
            √ should return a Movie object, the name of which is the exactly the same as :substring_input, regardless of case
          /movies/fuzzy/name/something_else
            √ should return an error message when :substring_input is not a substring of the names of any Movie object
          /movies/fuzzy/genre/West
            √ should return all Movie objects, the genres of which contain :substring_input as a substring, regardless of case
          /movies/fuzzy/genre/Western Drama
            √ should return Movie object(s), the genre(s) of which is/are the exactly the same as :substring_input, regardless of case
          /movies/fuzzy/genre/Incorrect Genre
            √ should return an error message when :substring_input is not a substring of the genres of any Movie object
          /movies/fuzzy/type/f
            √ should return all Movie objects, the types of which contain :substring_input as a substring, regardless of case
          /movies/fuzzy/type/feature
            √ should return (a) Movie object(s), the genre(s) of which is/are exactly the same as :substring_input, regardless of case
          /movies/fuzzy/type/Short
            √ should return an error message when :substring_input is not a substring of the genres of any Movie object
          /movies/fuzzy/content_rating/R
            √ should return all Movie objects, the content_ratings of which contain :substring_input as a substring, regardless of case
          /movies/fuzzy/content_rating/movies-Y
            √ should return an error message when :substring_input is not a substring of the content_rating of any Movie object
    
        GET   /movies/*attribute*/list/all   function:getAttributeList
          /movies/name/list/all
            √ should return an array containing the name attributes of the objects in the database
          /movies/genre/list/all
            √ should return an array containing the genre attributes of the objects in the database
          /movies/year/list/all
            √ should return an array containing the year attributes of the objects in the database
          /movies/cast_and_crew/list/all
            √ should return an array containing the cast_and_crew attributes of the objects in the database
          /movies/type/list/all
            √ should return an array containing the type attributes of the objects in the database
          /movies/rating/list/all
            √ should return an array containing the rating attributes of the objects in the database
          /movies/content_rating/list/all
            √ should return an array containing the content_rating attributes of the objects in the database
    
        GET   /movies/*attribute*/:attribute_value   function:getByAttribute
          /movies/name/Blade Runner
            √ should return an array of Movie Object(s), the name[s] of which correspond(s) to the :attribute_value
          /movies/genre/Sci-fi Detective
            √ should return an array of Movie Object(s), the genre[s] of which correspond(s) to the :attribute_value
          /movies/year/1982
            √ should return an array of Movie Object(s), the years[s] of which correspond(s) to the :attribute_value
          /movies/type/feature
            √ should return an array of Movie Object(s), the type(s) of which correspond[s] to the :attribute_value
          /movies/rating/9
            √ should return an array of Movie Object(s), the rating(s) of which correspond[s] to the :attribute_value
          /movies/content_rating/R
            √ should return an array of Movie Object(s), the type(s) of which correspond[s] to the :attribute_value
          /movies/content_rating/M
            √ should return an error message when an invalid search attribute_value was entered
          /movies/content_rating/Blade Runner?ids=1,2,3,4
            √ should return an error message when request parameters are added to the path
          /movies/content_rating/Fake Name
            √ should return an error message when the attribute value being searched for is not in the database.
    
        GET   /movies/cast_and_crew/:search_input   function:getByCastAndCrew
          /movies/cast_and_crew/Harrison Ford
            √ should return an array of Movie Objects in which the cast/crew member is featured
          /movies/cast_and_crew/John Smith
            √ should return an error message when a cast/crew member not featured in any Movie Objects is sent
          /movies/cast_and_crew/Harrison Ford?ids=1,2,3,4
            √ should return an error message, indicating that request parameters were erroneously included
    
        GET   /movies/:id/*attribute*   function:getSpecificAttribute
          /movies/59eb66125b06692facbcd438/name
            √ should return an id-specified name attribute string
          /movies/59eb66125b06692facbcd438/genre
            √ should return an id-specified genre attribute string
          /movies/59eb66125b06692facbcd438/year
            √ should return an id-specified year attribute number
          /movies/59eb66125b06692facbcd438/cast_and_crew
            √ should return an id-specified cast_and_crew attribute number
          /movies/59eb66125b06692facbcd438/type
            √ should return an id-specified type attribute string
          /movies/59eb66125b06692facbcd438/rating
            √ should return an id-specified rating attribute number
          /movies/59eb66125b06692facbcd438/content_rating
            √ should return an id-specified content_rating attribute string
          /movies/59e903b7d6278514683fed/content_rating
            √ should return an error message when invalid ID is entered
          /movies/59e903b7d6278514683fedc0/name
            √ should return an error message indicating that the ID sent is not present in the database
    
    
      POST Functions
        POST   /movies   function:addOne
          /movies   [requires the inclusion of a valid document to the request body]
            √ should add valid document into database and return confirmation message
          /movies?ids=1,2,3,4
            √ should return an error message when request parameters are attached to the path
          /movies   [requires the inclusion of an invalid document to the request body]
            √ should return an error when an invalid document is sent
    
        POST   /movies/:array_name   function:addMany
          /movies/movies_array   [requires the inclusion of an array named Movie_array in the request body]
            √ should add the contents of the :array_name array to the database, when it contains valid documents, and return a confirmation message
          /movies/movie_array   [requires the inclusion of an array named Movie_array in the request body]
            √ should return an error when at least one of the documents in the :array_name array are invalid
          /movies/wrong_name
            √ should return an error when :array_name is not the name of the array that is sent
    
    
      DELETE Functions
        DELETE   /movies   function:deleteMany
          /movies
            √ should delete all Movie objects from the database, and return a confirmation message
    
        DELETE    /movies/*attribute*/:attribute_value   function:deleteMany
          /movies/name/No Country for Old Men
            √ should return a message confirming there are no Movie objects in the database with the specified name value
          /movies/genre/Western Drama
            √ should return a message confirming there are no Movie objects in the database with the specified genre value
          /movies/year/2007
            √ should return a message confirming there are no Movie objects in the database with the specified year value
          /movies/type/feature
            √ should return a message confirming there are no Movie objects in the database with the specified type value
          /movies/rating/9
            √ should return a message confirming there are no Movie objects in the database with the specified rating value
          /movies/content_rating/R
            √ should return a message confirming there are no Movie objects in the database with the specified content_rating value
    
        DELETE    /movies/:id   function:deleteOne
          /movies/59eb66125b06692facbcd437
            √ should delete an id-specified Movie Object from the database, and return a confirmation message
          /movies/59e903b7d6e
            √ should return an error message when an invalid ID is sent
          /movies/59e903b7d6278514683faaaa
            √ should return an error message when a valid ID is sent that is not present in the database
    
    
      PUT Functions
        PUT   /movies/:id/*attribute*/:new_value   function:changeAttributeValue
          /movies/59eb66125b06692facbcd437/name/Do Androids Dream of Electric Sheep
            √ should return a confirmation message, and update the name attribute in the database
          /movies/59eb66125b06692facbcd437/genre/Sci-fi Noir
            √ should return a confirmation message, and update the genre attribute in the database
          /movies/59eb66125b06692facbcd437/year/2007
            √ should return a confirmation message, and update the year attribute in the database
          /movies/59eb66125b06692facbcd437/rating/2
            √ should return a confirmation message, and update the rating attribute in the database
          /movies/59eb66125b06692facbcd437/replace_cast_and_crew/new_crew
            √ should return a confirmation message, and update the cast_and_crew attribute in the database
          /movies/59eb66125b06692facbcd437/replace_cast_and_crew/new_crew   [a new array is not sent]
            √ should return an error message, indicating that a new cast_and_crew array was not sent
          /movies/59eb66125b06692facbcd437/content_rating/PG-13
            √ should return a confirmation message, and update the content_rating attribute in the database
          /movies/59eb66125b06692facbcd437/content_rating/K
            √ should return an error as K is not a valid content_rating
          /movies/59e903b4683fedc7d627851e/name/new
            √ should return a message indicating that the ID sent is not in the database
          /movies/59eb66125b06692facbcd4/name/new
            √ should return a message indicating that the ID sent is invalid
    
        PUT   /movies/:id/*instruction*   function:incOrDecRating
          /movies/59eb66125b06692facbcd437/incrementRating   [when rating is not equal to 10]
            √ should return a confirmation message, and increment the rating attribute value in the database.
          /movies/59e903b4683fedc7d627851e/incrementRating   [when rating IS equal to 10]
            √ should return a message indicating that the rating value is already the highest possible, and not update the database.
          /movies/59e903b4683fedc7d627851e/decrementRating   [when rating is not equal to 0]
            √ should return a confirmation message, and decrement the rating attribute value in the database.
          /movies/59e903b4683fedc7d627851e/decrementRating   [when rating IS equal to 0]
            √ should return a message indicating that the rating value is already the lowest possible, and not update the database.
          /movies/59e903b7d627851468fedce3/incrementRating   [regardless of rating's value]
            √ should return a message, indicating that the id specified is not present in the database
          /movies/59e903b7d627851468fedce3/decrementRating   [regardless of rating's value]
            √ should return a message, indicating that the id specified is not present in the database
          /movies/59e903b7d627851/incrementRating   [regardless of rating's value]
            √ should return a message indicating that the id sent is not valid.
    
        PUT   /movies/:id/*add_or_del_cast_member*/:add_member   function:addOrRemoveCastOrCrewMember
          /movies/59eb66125b06692facbcd437/add_cast_and_crew/Sean Young
            √ should add the new member to the Movie Object's cast_and_crew array
          /movies/59eb66125b06692facbcd437/add_cast_and_crew/Harrison Ford
            √ should return a message indicating that the new member is already present in the the cast_and_crew array
          /movies/59eb66125b06692facbcd437/del_cast_and_crew/Harrison Ford
            √ should remove the cast member from the Movie Object's cast_and_crew array
          /movies/59eb66125b06692facbcd437/del_cast_and_crew/John Smith
            √ should indicate that the cast member to be deleted is not present in the cast_and_crew array
          /movies/59eb66125b06692f7acbcd43/add_cast_and_crew/Sean Young
            √ should return an error message indicating that the ID that was sent is not in the database
          /movies/59eb66125b06692fac/add_cast_and_crew/Sean Young
            √ should return an error message indicating that the ID that was sent is invalid
    
    
      PATCH Functions
        PATCH   /movies/:id/*attribute*/:new_value   function:changeAttributeValue_patch
          /movies/59eb66125b06692facbcd437/name/Minority Report
            √ should return a confirmation message, and update the name attribute in the database
          /movies/59eb66125b06692facbcd437/genre/Rain-streaked Streets
            √ should return a confirmation message, and update the genre attribute in the database
          /movies/59eb66125b06692facbcd437/year/2008
            √ should return a confirmation message, and update the year attribute in the database
          /movies/59eb66125b06692facbcd437/rating/3
            √ should return a confirmation message, and update the rating attribute in the database
          /movies/59eb66125b06692facbcd437/replace_cast_and_crew/secret_weapon
            √ should return a confirmation message, and update the cast_and_crew attribute in the database
          /movies/59eb66125b06692facbcd437/replace_cast_and_crew/secret_weapon   [a new array is not sent]
            √ should return a confirmation message, and update the cast_and_crew attribute in the database
          /movies/59eb66125b06692facbcd437/replace_cast_and_crew/wrong_name   [array name doesn't match array name in search path]
            √ should return an error message, indicating that the name of the sent array is not the same as the name in the request path
          /movies/59eb66125b06692facbcd437/content_rating/NC-17
            √ should return a confirmation message, and update the content_rating attribute in the database
          /movies/59e903b7d627851468fedce3/name/whatever
            √ should return an error message, indicating that the id specified is not present in the database
          /movies/59e903b7d627851/name/something
            √ should return an error message, indicating that the id sent is invalid
          /movies/59e903b7d627851468fedce3/replace_cast_and/new_crew
            √ should return an error message, indicating that the id specified is not present in the database
          /movies/59e903b7d627851/replace_cast_and_crew/something
            √ should return an error message, indicating that the id sent is invalid
    
    TV Functions
      GET Functions
        GET   /tv   function:findAll
          /tv
            √ should return all the TV shows in the Database
          /tv?ids=1,2,3,4
            √ should return an error, when request parameters are attached to request path
    
        GET   /tv/:id   function:findOne
          /tv/59e903b7d6278514683fedcf
            √ should return an id-specified TV object
          /tv/59e903b
            √ should return an error message, when an invalid ID is entered
          /tv/59e903b7d6278514683fed11
            √ should return an error message, when an valid ID not found in the database is entered
    
        GET   /tv/multiple/search   function:findMany [requires the inclusion of request parameters]
          /tv/multiple/search?ids=59e903b7d6278514683fedce%2C59e903b7d6278514683fedcf
            √ should return an array of TV objects whose IDs match those sent as request parameters
          /tv/multiple/search?ids=59e903b7d6278514683fedce
            √ should return an array containing a single TV object, the ID of which was sent as a request parameter
          /tv/multiple/search?ids=59e903b7d6278514683fedce%2C1234
            √ should return an array containing as many TV objects as there were valid IDs sent as request parameters
          /tv/multiple/search?ids=59e903b7d6278514683fedce345345342C1234
            √ should return an empty array when no valid TV Object IDs were sent as request parameters
          /tv/multiple/search?something=59e903b7d6278514683fedce345345342C1234
            √ should return an error when request parameters are incorrectly labelled
          /tv/multiple/search?ids=
            √ should return an error when no request parameters are are included after ids=
          /tv/multiple/search
            √ should return an error when request path is invalid
    
        GET   /tv/fuzzy/*attribute*/:substring_input   function:substringSearch
          /tv/fuzzy/name/r
            √ should return all TV objects, the names of which contain :substring_input as a substring, regardless of case
          /tv/fuzzy/name/Breaking Bad
            √ should return a TV object, the name of which is the exactly the same as :substring_input, regardless of case
          /tv/fuzzy/name/Breaking%20Bad
            √ should return a TV object, the name of which is the exactly the same as :substring_input, and handle '%20'
          /tv/fuzzy/name/something_else
            √ should return an error message when :substring_input is not a substring of the names of any TV object
          /tv/fuzzy/creator/ill
            √ should return all TV objects, the creators of which contain :substring_input as a substring, regardless of case
          /tv/fuzzy/creator/Vince giLLigan
            √ should return TV object(s), the creator(s) of which is/are the exactly the same as :substring_input, regardless of case
          /tv/fuzzy/creator/wrong man
            √ should return an error message when :substring_input is not a substring of the creators of any TV object
          /tv/fuzzy/type/s
            √ should return all TV objects, the types of which contain :substring_input as a substring, regardless of case
          /tv/fuzzy/type/series
            √ should return a TV object, the creator of which is the exactly the same as :substring_input, regardless of case
          /tv/fuzzy/type/mini-series
            √ should return an error message when :substring_input is not a substring of the creators of any TV object
          /tv/fuzzy/content_rating/V
            √ should return all TV objects, the content_ratings of which contain :substring_input as a substring, regardless of case
          /tv/fuzzy/content_rating/TV-MA
            √ should return TV object(s), the content_rating(s) of which is/are exactly the same as :substring_input, regardless of case
          /tv/fuzzy/content_rating/TV-Y
            √ should return an error message when :substring_input is not a substring of the content_rating of any TV object
    
        GET   /tv/*attribute*/list/all   function:getAttributeList
          /tv/name/list/all
            √ should return an array containing the name attributes of the objects in the database
          /tv/creator/list/all
            √ should return an array containing the creator attributes of the objects in the database
          /tv/year/list/all
            √ should return an array containing the year attributes of the objects in the database
          /tv/seasons/list/all
            √ should return an array containing the seasons attributes of the objects in the database
          /tv/type/list/all
            √ should return an array containing the type attributes of the objects in the database
          /tv/rating/list/all
            √ should return an array containing the rating attributes of the objects in the database
          /tv/content_rating/list/all
            √ should return an array containing the content_rating attributes of the objects in the database
    
        GET   /tv/*attribute*/:attribute_value   function:getByAttribute
          /tv/name/Mr. Robot
            √ should return an array of TV Object(s), the name[s] of which correspond(s) to the :attribute_value
          /tv/creator/Sam Esmail
            √ should return an array of TV Object(s), the creator[s] of which correspond(s) to the :attribute_value
          /tv/year/2015
            √ should return an array of TV Object(s), the years[s] of which correspond(s) to the :attribute_value
          /tv/seasons/3
            √ should return an array of TV Object(s), the seasons[s] of which correspond(s) to the :attribute_value
          /tv/type/series
            √ should return an array of TV Object(s), the type(s) of which correspond[s] to the :attribute_value
          /tv/rating/9
            √ should return an array of TV Object(s), the rating(s) of which correspond[s] to the :attribute_value
          /tv/content_rating/TV-MA
            √ should return an array of TV Object(s), the type(s) of which correspond[s] to the :attribute_value
          /tv/content_rating/M
            √ should return an error message when an invalid search attribute_value was entered
          /tv/content_rating/Mr. Robot?ids=1,2,3,4
            √ should return an error message when request parameters are added to the path
          /tv/content_rating/Fake Name
            √ should return an error message when the attribute value being searched for is not in the database.
    
        GET   /tv/:id/*attribute*   function:getSpecificAttribute
          /tv/59e903b7d6278514683fedcf/name
            √ should return an id-specified name attribute string
          /tv/59e903b7d6278514683fedcf/creator
            √ should return an id-specified creator attribute string
          /tv/59e903b7d6278514683fedcf/year
            √ should return an id-specified year attribute number
          /tv/59e903b7d6278514683fedcf/seasons
            √ should return an id-specified seasons attribute number
          /tv/59e903b7d6278514683fedcf/type
            √ should return an id-specified type attribute string
          /tv/59e903b7d6278514683fedcf/rating
            √ should return an id-specified rating attribute number
          /tv/59e903b7d6278514683fedcf/content_rating
            √ should return an id-specified content_rating attribute string
          /tv/59e903b7d6278514683fed/content_rating
            √ should return an error message when invalid ID is entered
          /tv/59e903b7d6278514683fedc0/name
            √ should return an error message indicating that the ID sent is not present in the database
    
    
      POST Functions
        POST   /tv   function:addOne
          /tv   [requires the inclusion of a valid document to the request body]
            √ should add valid document into database and return confirmation message
          /tv?ids=1,2,3,4
            √ should return an error message when request parameters are attached to the path
          /tv   [requires the inclusion of an invalid document to the request body]
            √ should return an error when an invalid document is sent
    
        POST   /tv/:array_name   function:addMany
          /tv/tv_array   [requires the inclusion of an array named tv_array in the request body]
            √ should add the contents of the :array_name array to the database, when it contains valid documents, and return a confirmation message
          /tv/tv_array   [requires the inclusion of an array named tv_array in the request body]
            √ should return an error when at least one of the documents in the :array_name array are invalid
          /tv/wrong_name
            √ should return an error when :array_name is not the name of the array that is sent
    
    
      DELETE Functions
        DELETE   /tv   function:deleteMany
          /tv
            √ should delete all TV objects from the database, and return a confirmation message
    
        DELETE    /tv/*attribute*/:attribute_value   function:deleteMany
          /tv/name/Breaking Bad
            √ should return a message confirming there are no TV objects in the database with the specified name value
          /tv/creator/Vince Gilligan
            √ should return a message confirming there are no TV objects in the database with the specified creator value
          /tv/year/2009
            √ should return a message confirming there are no TV objects in the database with the specified year value
          /tv/seasons/5
            √ should return a message confirming there are no TV objects in the database with the specified seasons value
          /tv/type/series
            √ should return a message confirming there are no TV objects in the database with the specified type value
          /tv/rating/9
            √ should return a message confirming there are no TV objects in the database with the specified rating value
          /tv/content_rating/TV-MA
            √ should return a message confirming there are no TV objects in the database with the specified content_rating value
    
        DELETE    /tv/:id   function:deleteOne
          /tv/59e903b7d6278514683fedce
            √ should delete an id-specified TV Object from the database, and return a confirmation message
          /tv/59e903b7d6e
            √ should return an error message when an invalid ID is sent
          /tv/59e903b7d6278514683faaaa
            √ should return an error message when a valid ID is sent that is not present in the database
    
    
      PUT Functions
        PUT   /tv/:id/*attribute*/:new_value   function:changeAttributeValue
          /tv/59e903b7d6278514683fedce/name/robot man
            √ should return a confirmation message, and update the name attribute in the database
          /tv/59e903b7d6278514683fedce/creator/Bam Smesmail
            √ should return a confirmation message, and update the creator attribute in the database
          /tv/59e903b7d6278514683fedce/year/2008
            √ should return a confirmation message, and update the year attribute in the database
          /tv/59e903b7d6278514683fedce/rating/2
            √ should return a confirmation message, and update the rating attribute in the database
          /tv/59e903b7d6278514683fedce/seasons/8
            √ should return a confirmation message, and update the seasons attribute in the database
          /tv/59e903b7d6278514683fedce/content_rating/TV-Y
            √ should return a confirmation message, and update the content_rating attribute in the database
          /tv/59e903b7d6278514683fedce/content_rating/K
            √ should return an error as K is not a valid content_rating
          /tv/59e903b4683fedc7d627851e/name/new
            √ should return a message indicating that the ID sent is not in the database
          /tv/59eb66125b06692facbcd4/name/new
            √ should return a message indicating that the ID sent is invalid
    
        PUT   /tv/:id/*instruction*   function:incOrDecRating
          /tv/59e903b7d6278514683fedce/incrementRating   [when rating is not equal to 10]
            √ should return a confirmation message, and increment the rating attribute value in the database.
          /tv/59e903b4683fedc7d627851e/incrementRating   [when rating IS equal to 10]
            √ should return a message indicating that the rating value is already the highest possible, and not update the database.
          /tv/59e903b4683fedc7d627851e/decrementRating   [when rating is not equal to 0]
            √ should return a confirmation message, and decrement the rating attribute value in the database.
          /tv/59e903b7d6278514683fedce/decrementRating   [when rating IS equal to 0]
            √ should return a message indicating that the rating value is already the lowest possible, and not update the database.
          /tv/59e903b7d627851468fedce3/incrementRating   [regardless of rating's value]
            √ should return a message, indicating that the id specified is not present in the database
          /tv/59e903b7d627851468fedce3/decrementRating   [regardless of rating's value]
            √ should return a message, indicating that the id specified is not present in the database
          /tv/59e903b7d627851/incrementRating   [regardless of rating's value]
            √ should return a message indicating that the id sent is not valid.
          /tv/59e903b7d627851/decrementRating   [regardless of rating's value]
            √ should return a message indicating that the id sent is not valid.
    
    
      PATCH Functions
        PATCH   /tv/:id/*attribute*/:new_value   function:changeAttributeValue_patch
          /tv/59e903b7d6278514683fedce/name/robot man
            √ should return a confirmation message, and update the name attribute in the database
          /tv/59e903b7d6278514683fedce/creator/Bam Smesmail
            √ should return a confirmation message, and update the creator attribute in the database
          /tv/59e903b7d6278514683fedce/year/2008
            √ should return a confirmation message, and update the year attribute in the database
          /tv/59e903b7d6278514683fedce/rating/2
            √ should return a confirmation message, and update the rating attribute in the database
          /tv/59e903b7d6278514683fedce/seasons/8
            √ should return a confirmation message, and update the seasons attribute in the database
          /tv/59e903b7d6278514683fedce/content_rating/TV-Y
            √ should return a confirmation message, and update the content_rating attribute in the database
          /tv/59e903b7d627851468fedce3/name/whatever
            √ should return an error message, indicating that the id specified is not present in the database
          /tv/59e903b7d627851/name/something
            √ should return an error message, indicating that the id sent is invalid
    
    
    196 passing (5s)  


## Extra features.
SUPERTEST: The movie_functions-test.js file uses the supertest module.

