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

        
    });
});
