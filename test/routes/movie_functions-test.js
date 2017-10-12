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
    });
});
