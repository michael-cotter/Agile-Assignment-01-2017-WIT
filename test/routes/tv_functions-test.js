var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;

var database = require('../../database.js');

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );


describe('TV Functions', function (){
    beforeEach (function(done){
        database.resetTVCollection(done);
    });
    describe('GET Functions', function(){
        describe('GET   /tv   function:findAll', function(){
            describe('/tv', function(){
                it('should return all the TV shows in the Database', function(done){
                    chai.request(server)
                        .get('/tv')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.equal(2);
                            //expect(res.body.length).to.equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include( {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"} );
                            expect(result).to.include( {name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv?ids=1,2,3,4',function(){
                it('should return an error, when request parameters are attached to request path', function(done){
                    chai.request(server)
                        .get('/tv?ids=1,2,3,4')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body.message).equal("Probably sent request parameters by accident!");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /tv/:id   function:findOne', function(){
            describe('/tv/59e903b7d6278514683fedcf',function(){
                it('should return an id-specified TV object', function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body.name).equal("Breaking Bad");
                            done();
                        });
                });
            });
            describe('/tv/59e903b',function(){
                it('should return an error message, when an invalid ID is entered', function(done){
                    chai.request(server)
                        .get('/tv/59e903b')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body.message).equal('Invalid ID!');
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fed11',function(){
                it('should return an error message, when an valid ID not found in the database is entered', function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fed11')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body.message).equal('No TV Show with that ID is in the database.');
                            done();
                        });
                });
            });
        });
describe('\n      GET   /tv/multiple/search   function:findMany [requires the inclusion of request parameters]', function(){
            describe('/tv/multiple/search?ids=59e903b7d6278514683fedce%2C59e903b7d6278514683fedcf',function(){
                it('should return an array of TV objects whose IDs match those sent as request parameters',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?ids=59e903b7d6278514683fedce%2C59e903b7d6278514683fedcf')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include( {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"} );
                            expect(result).to.include( {name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/multiple/search?ids=59e903b7d6278514683fedce',function(){
                it('should return an array containing a single TV object, the ID of which was sent as a request parameter',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?ids=59e903b7d6278514683fedce')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include( {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/multiple/search?ids=59e903b7d6278514683fedce%2C1234',function(){
                it('should return an array containing as many TV objects as there were valid IDs sent as request parameters',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?ids=59e903b7d6278514683fedce%2C1234')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include( {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/multiple/search?ids=59e903b7d6278514683fedce345345342C1234',function(){
                it('should return an empty array when no valid TV Object IDs were sent as request parameters',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?ids=59e903b7d6278514683fedce345345342C1234')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').equal("No TV Objects were found.");
                            expect(res.body.array).to.be.a('array');
                            expect(res.body.array.length).equal(0);
                            //var result = _.map(res.body, function (tv) {
                            //return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            //});
                            //expect(result).to.include( {name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/multiple/search?something=59e903b7d6278514683fedce345345342C1234',function(){
                it('should return an error when request parameters are incorrectly labelled',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?something=59e903b7d6278514683fedce345345342C1234')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').equal("The request parameters needs to be labelled ids.");
                            done();
                        });
                });
            });
            describe('/tv/multiple/search?ids=',function(){
                it('should return an error when no request parameters are are included after ids=',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search?ids=')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').equal("No ID values were included as request parameters.");
                            done();
                        });
                });
            });
            describe('/tv/multiple/search',function(){
                it('should return an error when request path is invalid',function(done){
                    chai.request(server)
                        .get('/tv/multiple/search')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').equal("You forgot to include request parameters.");
                            //expect(res.body).to.have.property('message').equal('The request parameters needs to be labelled ids.');
                            done();
                        });
                });
            });
        });
        
    });
});
