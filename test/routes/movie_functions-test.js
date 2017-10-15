var supertest = require('supertest')(require('../../bin/www'));
var expect = require('chai').expect;
var database = require('../../database.js');
var _ = require('lodash' );


describe('Movie Functions', function (){
    beforeEach (function(done){
        database.resetMovieCollection(done);
    });
    describe('GET Functions', function(){
        describe('GET   /movies   function:findAll', function(){
            describe('/movies', function(){
                it('should return all the Movies in the Database', function(done){
                    supertest
                        .get('/movies')
                        .end(function(err,res){
                            if(err){
                                done(err);
                            }else {
                                expect(res.status).equal(200);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.equal(2);
                                var result = _.map(res.body, function (movie) {
                                    return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                                });
                                expect(result).to.include( {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]} );
                                expect(result).to.include( {name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]} );
                                done();
                            }
                        });
                });
            });
            describe('/movies?ids=1,2,3,4',function(){
                it('should return an error, when request parameters are attached to request path', function(done){
                    supertest
                        .get('/movies?ids=1,2,3,4')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body.message).equal("Probably sent request parameters by accident!");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/:id   function:findOne', function(){
            describe('/movies/59eb66125b06692facbcd438',function(){
                it('should return an id-specified Movie object', function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body.name).equal("No Country for Old Men");
                            done();
                        });
                });
            });
            describe('/movies/59e903b',function(){
                it('should return an error message, when an invalid ID is entered', function(done){
                    supertest
                        .get('/movies/59e903b')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body.message).equal('Invalid ID!');
                            done();
                        });
                });
            });
            describe('/movies/59e903b7d6278514683fed11',function(){
                it('should return an error message, when an valid ID not found in the database is entered', function(done){
                    supertest
                        .get('/movies/59e903b7d6278514683fed11')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body.message).equal('No movie with that ID is in the database.');
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/multiple/search   function:findMany [requires the inclusion of request parameters]', function(){
            describe('/movies/multiple/search?ids=59eb66125b06692facbcd437%2C59eb66125b06692facbcd438',function(){
                it('should return an array of Movie objects whose IDs match those sent as request parameters',function(done){
                    supertest
                        .get('/movies/multiple/search?ids=59eb66125b06692facbcd437%2C59eb66125b06692facbcd438')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include( {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]} );
                            expect(result).to.include( {name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]} );
                            done();
                        });
                });
            });
            describe('/movies/multiple/search?ids=59eb66125b06692facbcd437',function(){
                it('should return an array containing a single Movie object, the ID of which was sent as a request parameter',function(done){
                    supertest
                        .get('/movies/multiple/search?ids=59eb66125b06692facbcd437')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include( {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]} );
                            done();
                        });
                });
            });
            describe('/movies/multiple/search?ids=59eb66125b06692facbcd437%2C1234',function(){
                it('should return an array containing as many Movie objects as there were valid IDs sent as request parameters',function(done){
                    supertest
                        .get('/movies/multiple/search?ids=59eb66125b06692facbcd437%2C1234')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include( {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]} );
                            done();
                        });
                });
            });
            describe('/movies/multiple/search?ids=59eb66125b06692facbcd437345345342C1234',function(){
                it('should return an empty array when no valid Movie Object IDs were sent as request parameters',function(done){
                    supertest
                        .get('/movies/multiple/search?ids=59eb66125b06692facbcd437345345342C1234')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message').equal("No Movie Objects were found.");
                            expect(res.body.array).to.be.a('array');
                            expect(res.body.array.length).equal(0);
                            //var result = _.map(res.body, function (movie) {
                            //return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            //});
                            //expect(result).to.include( {name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]} );
                            done();
                        });
                });
            });
            describe('/movies/multiple/search?something=59eb66125b06692facbcd437345345342C1234',function(){
                it('should return an error when request parameters are incorrectly labelled',function(done){
                    supertest
                        .get('/movies/multiple/search?something=59eb66125b06692facbcd437345345342C1234')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message').equal("The request parameters needs to be labelled ids.");
                            done();
                        });
                });
            });
            describe('/movies/multiple/search?ids=',function(){
                it('should return an error when no request parameters are are included after ids=',function(done){
                    supertest
                        .get('/movies/multiple/search?ids=')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message').equal("No ID values were included as request parameters.");
                            done();
                        });
                });
            });
            describe('/movies/multiple/search',function(){
                it('should return an error when request path is invalid',function(done){
                    supertest
                        .get('/movies/multiple/search')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message').equal("You forgot to include request parameters.");
                            //expect(res.body).to.have.property('message').equal('The request parameters needs to be labelled ids.');
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/fuzzy/*attribute*/:substring_input   function:substringSearch', function(){
            describe('/movies/fuzzy/name/r',function(){
                it('should return all Movie objects, the names of which contain :substring_input as a substring, regardless of case', function(done){
                    supertest
                        .get('/movies/fuzzy/name/r')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/name/No Country for Old Men',function(){
                it('should return a Movie object, the name of which is the exactly the same as :substring_input, regardless of case', function(done) {
                    supertest
                        .get('/movies/fuzzy/name/No Country for Old Men')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            //expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/name/No%20Country%20for%20Old%20Men',function(){
                it('should return a Movie object, the name of which is the exactly the same as :substring_input, regardless of case', function(done) {
                    supertest
                        .get('/movies/fuzzy/name/No%20Country%20for%20Old%20Men')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            //expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/name/something_else',function(){
                it('should return an error message when :substring_input is not a substring of the names of any Movie object', function(done){
                    supertest
                        .get('/movies/fuzzy/name/something_else')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any Movie objects");
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/genre/West',function(){
                it('should return all Movie objects, the genres of which contain :substring_input as a substring, regardless of case', function(done){
                    supertest
                        .get('/movies/fuzzy/genre/West')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/genre/Western Drama',function(){
                it('should return Movie object(s), the genre(s) of which is/are the exactly the same as :substring_input, regardless of case', function(done) {
                    supertest
                        .get('/movies/fuzzy/genre/Western Drama')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            //expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/genre/Incorrect Genre',function(){
                it('should return an error message when :substring_input is not a substring of the genres of any Movie object', function(done){
                    supertest
                        .get('/movies/fuzzy/genre/Incorrect Genre')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any Movie objects");
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/type/f',function(){
                it('should return all Movie objects, the types of which contain :substring_input as a substring, regardless of case', function(done){
                    supertest
                        .get('/movies/fuzzy/type/f')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/type/feature',function(){
                it('should return (a) Movie object(s), the genre(s) of which is/are exactly the same as :substring_input, regardless of case', function(done) {
                    supertest
                        .get('/movies/fuzzy/type/feature')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/type/Short',function(){
                it('should return an error message when :substring_input is not a substring of the genres of any Movie object', function(done){
                    supertest
                        .get('/movies/fuzzy/type/Short')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any Movie objects");
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/content_rating/R',function(){
                it('should return all Movie objects, the content_ratings of which contain :substring_input as a substring, regardless of case', function(done){
                    supertest
                        .get('/movies/fuzzy/content_rating/R')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]});
                            expect(result).to.include({name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]});
                            done();
                        });
                });
            });
            describe('/movies/fuzzy/content_rating/movies-Y',function(){
                it('should return an error message when :substring_input is not a substring of the content_rating of any Movie object', function(done){
                    supertest
                        .get('/movies/fuzzy/content_rating/movies-Y')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any Movie objects");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/*attribute*/list/all   function:getAttributeList', function(){
            describe('/movies/name/list/all',function(){
                it('should return an array containing the name attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/name/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("Blade Runner");
                            expect(res.body).to.include("No Country for Old Men");
                            done();
                        });
                });
            });
            describe('/movies/genre/list/all',function(){
                it('should return an array containing the genre attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/genre/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("Sci-fi Detective");
                            expect(res.body).to.include("Western Drama");
                            done();
                        });
                });
            });
            describe('/movies/year/list/all',function(){
                it('should return an array containing the year attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/year/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include(1982);
                            expect(res.body).to.include(2007);
                            done();
                        });
                });
            });
            describe('/movies/cast_and_crew/list/all',function(){
                it('should return an array containing the cast_and_crew attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/cast_and_crew/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { cast_and_crew: movie.cast_and_crew }
                            });
                            var comparison = ["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"];
                            expect(res.body[0].length).equal(comparison.length);
                            for(var i = 0; i < res.body[0].length; i++){
                                expect(comparison[i] === res.body[0][i]);
                            }
                            comparison = ["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]
                            expect(res.body[1].length).equal(comparison.length);
                            for(var i = 0; i < res.body[1].length; i++){
                                expect(comparison[i] === res.body[1][i]);
                            }
                            done();
                        });
                });
            });
            describe('/movies/type/list/all',function(){
                it('should return an array containing the type attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/type/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("feature");
                            expect(res.body).to.include("feature");
                            done();
                        });
                });
            });
            describe('/movies/rating/list/all',function(){
                it('should return an array containing the rating attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/rating/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include(5);
                            expect(res.body).to.include(9);
                            done();
                        });
                });
            });
            describe('/movies/content_rating/list/all',function(){
                it('should return an array containing the content_rating attributes of the objects in the database',function(done){
                    supertest
                        .get('/movies/content_rating/list/all')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("R");
                            expect(res.body).to.include("R");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/*attribute*/:attribute_value   function:getByAttribute',function(){
            describe('/movies/name/Blade Runner',function(){
                it('should return an array of Movie Object(s), the name[s] of which correspond(s) to the :attribute_value',function(done){
                    supertest
                        .get('/movies/name/Blade Runner')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            done();
                        });
                });
            });
            describe('/movies/genre/Sci-fi Detective',function(){
                it('should return an array of Movie Object(s), the genre[s] of which correspond(s) to the :attribute_value',function(done){
                    supertest
                        .get('/movies/genre/Sci-fi Detective')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            done();
                        });
                });
            });
            describe('/movies/year/1982',function(){
                it('should return an array of Movie Object(s), the years[s] of which correspond(s) to the :attribute_value',function(done){
                    supertest
                        .get('/movies/year/1982')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            done();
                        });
                });
            });
            describe('/movies/type/feature',function(){
                it('should return an array of Movie Object(s), the type(s) of which correspond[s] to the :attribute_value',function(done){
                    supertest
                        .get('/movies/type/feature')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            expect(result).to.include( {name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]} );
                            done();
                        });
                });
            });
            describe('/movies/rating/9',function(){
                it('should return an array of Movie Object(s), the rating(s) of which correspond[s] to the :attribute_value',function(done){
                    supertest
                        .get('/movies/rating/9')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include( {name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]} );
                            done();
                        });
                });
            });
            describe('/movies/content_rating/R',function(){
                it('should return an array of Movie Object(s), the type(s) of which correspond[s] to the :attribute_value',function(done){
                    supertest
                        .get('/movies/content_rating/R')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            expect(result).to.include( {name:"No Country for Old Men",year:2007,genre:"Western Drama",type:"feature",rating:9,content_rating:"R",cast_and_crew:["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"]} );
                            done();
                        });
                });
            });
            describe('/movies/content_rating/M',function(){
                it('should return an error message when an invalid search attribute_value was entered',function(done){
                    supertest
                        .get('/movies/content_rating/M')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("There are no Movies with that attribute in the database.");
                            done();
                        });
                });
            });
            describe('/movies/content_rating/Blade Runner?ids=1,2,3,4',function(){
                it('should return an error message when request parameters are added to the path',function(done){
                    supertest
                        .get('/movies/content_rating/Blade Runner?ids=1,2,3,4')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("Request parameters were included, invalidating the search");
                            done();
                        });
                });
            });
            describe('/movies/content_rating/Fake Name',function(){
                it('should return an error message when the attribute value being searched for is not in the database.',function(done){
                    supertest
                        .get('/movies/content_rating/Fake Name')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("There are no Movies with that attribute in the database.");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /movies/cast_and_crew/:search_input   function:getByCastAndCrew',function(){
            describe('/movies/cast_and_crew/Harrison Ford',function(){
                it('should return an array of Movie Objects in which the cast/crew member is featured',function(done){
                    supertest
                        .get('/movies/cast_and_crew/Harrison Ford')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            var result = _.map(res.body, function (movie) {
                                return { name: movie.name, year: movie.year, genre: movie.genre, type: movie.type, rating: movie.rating, content_rating: movie.content_rating, cast_and_crew: movie.cast_and_crew }
                            });
                            expect(result).to.include({name:"Blade Runner",year:1982,genre:"Sci-fi Detective",type:"feature",rating:5,content_rating:"R",cast_and_crew:["Harrison Ford","Rutger Hauer","Ridley Scott","Vangelis","Hampton Fancher","Jordan Cronenweth"]})
                            done();
                        });
                });
            });
            describe('/movies/cast_and_crew/John Smith',function(){
                it('should return an error message when a cast/crew member not featured in any Movie Objects is sent',function(done){
                    supertest
                        .get('/movies/cast_and_crew/John Smith')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("There are no Movie Object\'s featuring this cast/crew member.");
                            done();
                        });
                });
            });
            describe('movies/cast_and_crew/Harrison Ford?ids=1,2,3,4',function(){
                it('should return an error message, indicating that request parameters were erroneously included',function(done){
                    supertest
                        .get('/movies/cast_and_crew/Harrison Ford?ids=1,2,3,4')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("Request parameters were included, invalidating the search");
                            done();
                        });
                })
            });
        });
        describe('\n      GET   /movies/:id/*attribute*   function:getSpecificAttribute',function(){
            describe('/movies/59eb66125b06692facbcd438/name',function(){
                it('should return an id-specified name attribute string',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/name')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("No Country for Old Men");
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/genre',function(){
                it('should return an id-specified genre attribute string',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/genre')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("Western Drama");
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/year',function(){
                it('should return an id-specified year attribute number',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/year')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('Number');
                            expect(res.body).equal(2007);
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/cast_and_crew',function(){
                it('should return an id-specified cast_and_crew attribute number',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/cast_and_crew')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('array');
                            var result = _.map(res.body, function (movie) {
                                return { cast_and_crew: movie.cast_and_crew }
                            });
                            var comparison = ["Josh Brolin","Tommy Lee Jones","Javier Bardem","Kelly MacDonald","Woody Harrelson","Joel Coen","Ethan Coen","Roger Deakins"];
                            expect(res.body.length).equal(comparison.length);
                            for(var i = 0; i < res.body[0].length; i++){
                                expect(comparison[i] === res.body[0][i]);
                            }
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/type',function(){
                it('should return an id-specified type attribute string',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/type')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("feature");
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/rating',function(){
                it('should return an id-specified rating attribute number',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/rating')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('Number');
                            expect(res.body).equal(9);
                            done();
                        });
                });
            });
            describe('/movies/59eb66125b06692facbcd438/content_rating',function(){
                it('should return an id-specified content_rating attribute string',function(done){
                    supertest
                        .get('/movies/59eb66125b06692facbcd438/content_rating')
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("R");
                            done();
                        });
                });
            });
            describe('/movies/59e903b7d6278514683fed/content_rating',function(){
                it('should return an error message when invalid ID is entered',function(done){
                    supertest
                        .get('/movies/59e903b7d6278514683fed/content_rating')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).equal('Invalid ID');
                            done();
                        });
                });
            });
            describe('/movies/59e903b7d6278514683fedc0/name',function(){
                it('should return an error message indicating that the ID sent is not present in the database',function(done){
                    supertest
                        .get('/movies/59e903b7d6278514683fedc0/name')
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).equal('This ID is not present in the database.');
                            done();
                        });
                });
            });
        });
    });
    describe('\n\n    POST Functions', function(){
        describe('POST   /movies   function:addOne', function(){
            describe('/movies   [requires the inclusion of a valid document to the request body]',function(){
                it('should add valid document into database and return confirmation message', function(done){
                    var new_Movie = {name:"There Will be Blood",_id:"59eb66125b06692facbcd439",year:2007,genre:"Western Drama",type:"feature",rating:8,content_rating:"R",cast_and_crew:["Daniel Day-Lewis","Paul Dano","Dillon Freasier","Paul Thomas Anderson","Robert Elswit","Dylan Tichenor","Johnny Greenwood"]}
                    supertest
                        .post('/movies')
                        .send(new_Movie)
                        .end(function(err,res){
                            expect(res.status).equal(200);
                            expect(res.body).to.have.property('message').equal('Movie Added to Database!');
                            done();
                        });
                });
                after(function (done) {
                    supertest
                        .get('/movies/59eb66125b06692facbcd439')
                        .end(function(err, res) {
                            expect(res.status).equal(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body.name).equal("There Will be Blood");
                            expect(res.body.year).equal(2007);
                            expect(res.body.genre).equal("Western Drama");
                            expect(res.body.type).equal("feature");
                            expect(res.body.rating).equal(8);
                            expect(res.body.content_rating).equal("R");
                            var comparison = ["Daniel Day-Lewis","Paul Dano","Dillon Freasier","Paul Thomas Anderson","Robert Elswit","Dylan Tichenor","Johnny Greenwood"];
                            for(var i = 0; i < res.body.cast_and_crew; i++){
                                expect(comparison[i] === res.body.cast_and_crew[i]);
                            }
                            done();
                        });
                });
            });
            describe('/movies?ids=1,2,3,4',function(){
                it('should return an error message when request parameters are attached to the path', function(done){
                    var new_Movie = {name:"There Will be Blood",_id:"59eb66125b06692facbcd439",year:2007,genre:"Western Drama",type:"feature",rating:8,content_rating:"R",cast_and_crew:["Daniel Day-Lewis","Paul Dano","Dillon Freasier","Paul Thomas Anderson","Robert Elswit","Dylan Tichenor","Johnny Greenwood"]}
                    supertest
                        .post('/movies?ids=1,2,3,4')
                        .send(new_Movie)
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('message').equal('There\'s a problem with the request path');
                            done();
                        });
                });
            });
            describe('/movies   [requires the inclusion of an invalid document to the request body]',function(){
                it('should return an error when an invalid document is sent',function(done){
                    var new_Movie = {x:"There Will be Blood",year:2007,genre:"Western Drama",type:"feature",rating:8,content_rating:"R",cast_and_crew:["Daniel Day-Lewis","Paul Dano","Dillon Freasier","Paul Thomas Anderson","Robert Elswit","Dylan Tichenor","Johnny Greenwood"]}
                    supertest
                        .post('/movies')
                        .send(new_Movie)
                        .end(function(err,res){
                            expect(res.status).equal(404);
                            expect(res.body).to.have.property('errors');
                            done();
                        });
                });
            });
        });
    });

});
