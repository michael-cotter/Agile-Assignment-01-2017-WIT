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
        describe('\n      GET   /tv/fuzzy/*attribute*/:substring_input   function:substringSearch', function(){
            describe('tv/fuzzy/name/r',function(){
                it('should return all TV objects, the names of which contain :substring_input as a substring, regardless of case', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/name/r')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/name/Breaking Bad',function(){
                it('should return a TV object, the name of which is the exactly the same as :substring_input, regardless of case', function(done) {
                    chai.request(server)
                        .get('/tv/fuzzy/name/Breaking Bad')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            //expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/name/Breaking%20Bad',function(){
                it('should return a TV object, the name of which is the exactly the same as :substring_input, and handle \'%20\'', function(done) {
                    chai.request(server)
                        .get('/tv/fuzzy/name/Breaking%20Bad')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            //expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/name/something_else',function(){
                it('should return an error message when :substring_input is not a substring of the names of any TV object', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/name/something_else')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any TV objects");
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/creator/ill',function(){
                it('should return all TV objects, the creators of which contain :substring_input as a substring, regardless of case', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/creator/ill')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/creator/Vince giLLigan',function(){
                it('should return TV object(s), the creator(s) of which is/are the exactly the same as :substring_input, regardless of case', function(done) {
                    chai.request(server)
                        .get('/tv/fuzzy/creator/Vince giLLigan')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            //expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/creator/wrong man',function(){
                it('should return an error message when :substring_input is not a substring of the creators of any TV object', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/creator/wrong man')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any TV objects");
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/type/s',function(){
                it('should return all TV objects, the types of which contain :substring_input as a substring, regardless of case', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/type/s')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/type/series',function(){
                it('should return a TV object, the creator of which is the exactly the same as :substring_input, regardless of case', function(done) {
                    chai.request(server)
                        .get('/tv/fuzzy/type/series')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/type/mini-series',function(){
                it('should return an error message when :substring_input is not a substring of the creators of any TV object', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/type/mini-series')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any TV objects");
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/content_rating/V',function(){
                it('should return all TV objects, the content_ratings of which contain :substring_input as a substring, regardless of case', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/content_rating/V')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/content_rating/TV-MA',function(){
                it('should return TV object(s), the content_rating(s) of which is/are exactly the same as :substring_input, regardless of case', function(done) {
                    chai.request(server)
                        .get('/tv/fuzzy/content_rating/TV-MA')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/fuzzy/content_rating/TV-Y',function(){
                it('should return an error message when :substring_input is not a substring of the content_rating of any TV object', function(done){
                    chai.request(server)
                        .get('/tv/fuzzy/content_rating/TV-Y')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The substring search failed to return any TV objects");
                            done();
                        });
                });
            });
        });
describe('\n      GET   /tv/*attribute*/list/all   function:getAttributeList', function(){
            describe('/tv/name/list/all',function(){
                it('should return an array containing the name attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/name/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("Mr. Robot");
                            expect(res.body).to.include("Breaking Bad");
                            done();
                        });
                });
            });
            describe('/tv/creator/list/all',function(){
                it('should return an array containing the creator attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/creator/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("Sam Esmail");
                            expect(res.body).to.include("Vince Gilligan");
                            done();
                        });
                });
            });
            describe('/tv/year/list/all',function(){
                it('should return an array containing the year attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/year/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include(2015);
                            expect(res.body).to.include(2009);
                            done();
                        });
                });
            });
            describe('/tv/seasons/list/all',function(){
                it('should return an array containing the seasons attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/seasons/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include(3);
                            expect(res.body).to.include(5);
                            done();
                        });
                });
            });
            describe('/tv/type/list/all',function(){
                it('should return an array containing the type attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/type/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("series");
                            expect(res.body).to.include("series");
                            done();
                        });
                });
            });
            describe('/tv/rating/list/all',function(){
                it('should return an array containing the rating attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/rating/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include(7);
                            expect(res.body).to.include(9);
                            done();
                        });
                });
            });
            describe('/tv/content_rating/list/all',function(){
                it('should return an array containing the content_rating attributes of the objects in the database',function(done){
                    chai.request(server)
                        .get('/tv/content_rating/list/all')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            expect(res.body).to.include("TV-MA");
                            expect(res.body).to.include("TV-MA");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /tv/*attribute*/:attribute_value   function:getByAttribute',function(){
            describe('/tv/name/Mr. Robot',function(){
                it('should return an array of TV Object(s), the name[s] of which correspond(s) to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/name/Mr. Robot')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            done();
                        });
                });
            });
            describe('/tv/creator/Sam Esmail',function(){
                it('should return an array of TV Object(s), the creator[s] of which correspond(s) to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/creator/Sam Esmail')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            done();
                        });
                });
            });
            describe('/tv/year/2015',function(){
                it('should return an array of TV Object(s), the years[s] of which correspond(s) to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/year/2015')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            done();
                        });
                });
            });
            describe('/tv/seasons/3',function(){
                it('should return an array of TV Object(s), the seasons[s] of which correspond(s) to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/seasons/3')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            done();
                        });
                });
            });
            describe('/tv/type/series',function(){
                it('should return an array of TV Object(s), the type(s) of which correspond[s] to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/type/series')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            expect(result).to.include( {name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/rating/9',function(){
                it('should return an array of TV Object(s), the rating(s) of which correspond[s] to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/rating/9')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(1);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include( {name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/content_rating/TV-MA',function(){
                it('should return an array of TV Object(s), the type(s) of which correspond[s] to the :attribute_value',function(done){
                    chai.request(server)
                        .get('/tv/content_rating/TV-MA')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(2);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mr. Robot",creator:"Sam Esmail",year:2015,seasons:3,type:"series",rating:7,content_rating:"TV-MA"})
                            expect(result).to.include( {name:"Breaking Bad",creator:"Vince Gilligan",year:2009,seasons:5,type:"series",rating:9,content_rating:"TV-MA"} );
                            done();
                        });
                });
            });
            describe('/tv/content_rating/M',function(){
                it('should return an error message when an invalid search attribute_value was entered',function(done){
                    chai.request(server)
                        .get('/tv/content_rating/M')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("There are no TV Shows with that attribute in the database.");
                            done();
                        });
                });
            });
            describe('/tv/content_rating/Mr. Robot?ids=1,2,3,4',function(){
                it('should return an error message when request parameters are added to the path',function(done){
                    chai.request(server)
                        .get('/tv/content_rating/Mr. Robot?ids=1,2,3,4')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("Request parameters were included, invalidating the search");
                            done();
                        });
                });
            });
            describe('/tv/content_rating/Fake Name',function(){
                it('should return an error message when the attribute value being searched for is not in the database.',function(done){
                    chai.request(server)
                        .get('/tv/content_rating/Fake Name')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).equal("There are no TV Shows with that attribute in the database.");
                            done();
                        });
                });
            });
        });
        describe('\n      GET   /tv/:id/*attribute*   function:getSpecificAttribute',function(){
            describe('/tv/59e903b7d6278514683fedcf/name',function(){
                it('should return an id-specified name attribute string',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/name')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("Breaking Bad");
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/creator',function(){
                it('should return an id-specified creator attribute string',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/creator')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("Vince Gilligan");
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/year',function(){
                it('should return an id-specified year attribute number',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/year')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('Number');
                            expect(res.body).equal(2009);
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/seasons',function(){
                it('should return an id-specified seasons attribute number',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/seasons')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('Number');
                            expect(res.body).equal(5);
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/type',function(){
                it('should return an id-specified type attribute string',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/type')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("series");
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/rating',function(){
                it('should return an id-specified rating attribute number',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/rating')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('Number');
                            expect(res.body).equal(9);
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedcf/content_rating',function(){
                it('should return an id-specified content_rating attribute string',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedcf/content_rating')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('String');
                            expect(res.body).equal("TV-MA");
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fed/content_rating',function(){
                it('should return an error message when invalid ID is entered',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fed/content_rating')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).equal('Invalid ID');
                            done();
                        });
                });
            });
            describe('/tv/59e903b7d6278514683fedc0/name',function(){
                it('should return an error message indicating that the ID sent is not present in the database',function(done){
                    chai.request(server)
                        .get('/tv/59e903b7d6278514683fedc0/name')
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).equal('This ID is not present in the database.');
                            done();
                        });
                });
            });
        });        
    });
    describe('\n\n    POST Functions', function(){
        describe('POST   /tv   function:addOne', function(){
            describe('/tv   [requires the inclusion of a valid document to the request body]',function(){
                it('should add valid document into database and return confirmation message', function(done){
                    var new_tv = {name:"True Detective",_id:"59eb77d48bef0021640102f5",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"}
                    chai.request(server)
                        .post('/tv')
                        .send(new_tv)
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message').equal('TV Show Added to Database!');
                            done();
                        });
                });
                after(function (done) {
                    chai.request(server)
                        .get('/tv/59eb77d48bef0021640102f5')
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body.name).equal("True Detective");
                            expect(res.body).to.include({name:"True Detective",_id:"59eb77d48bef0021640102f5",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv?ids=1,2,3,4',function(){
                it('should return an error message when request parameters are attached to the path', function(done){
                    var new_tv = {name:"True Detective",_id:"59eb77d48bef0021640102f5",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"}
                    chai.request(server)
                        .post('/tv?ids=1,2,3,4')
                        .send(new_tv)
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message').equal('There\'s a problem with the request path');
                            done();
                        });
                });
            });
            describe('/tv   [requires the inclusion of an invalid document to the request body]',function(){
                it('should return an error when an invalid document is sent',function(done){
                    var new_tv = {x:"True Detective",x:"59eb77d48bef0021640102f5",x:"Nic Pizzolatto",x:2014,x:2,x:"series",x:10,x:"TV-MA"}
                    chai.request(server)
                        .post('/tv')
                        .send(new_tv)
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('errors').to.have.property('name').to.have.property('message');
                            expect(res.body.errors.name.message).equal("Path `name` is required.");
                            done();
                        });
                });
            });
        });
        describe('\n      POST   /tv/:array_name   function:addMany',function(){
            describe('/tv/tv_array   [requires the inclusion of an array named tv_array in the request body]',function(){
                it('should add the contents of the :array_name array to the database, when it contains valid documents, and return a confirmation message',function(done){
                    var send_object = {
                        tv_array:
                            [
                                {name:"Mad Men",_id:"59eb77d48bef0021640102f5",creator:"Matthew Weiner",year:2007,seasons:7,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Sopranos",_id:"59eb77d48bef0021640102f6",creator:"David Chase",year:1999,seasons:6,type:"series",rating:8,content_rating:"TV-MA"},
                                {name:"True Detective",_id:"59eb77d48bef0021640102f7",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Shadow Line",_id:"59eb77d48bef0021640102f8",creator:"Hugo Blick",year:2015,seasons:1,type:"mini-series",rating:10,content_rating:"TV-MA"},
                                {name:"The Wire",_id:"59eb77d48bef0021640102f9",creator:"David Simon",year:2002,seasons:5,type:"series",rating:9,content_rating:"TV-MA"},
                                {name:"Show Me a Hero",_id:"59eb77d48bef0021640102fa",creator:"David Simon",year:2015,seasons:1,type:"mini-series",rating:8,content_rating:"TV-MA"}
                            ]
                    }
                    chai.request(server)
                        .post('/tv/tv_array')
                        .send(send_object)
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("TV Show(s) added to the database.");
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
                        .end(function(err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(8);
                            var result = _.map(res.body, function (tv) {
                                return { name: tv.name, _id:tv._id, creator: tv.creator, year: tv.year, seasons: tv.seasons, type: tv.type, rating: tv.rating, content_rating:tv.content_rating }
                            });
                            expect(result).to.include({name:"Mad Men",_id:"59eb77d48bef0021640102f5",creator:"Matthew Weiner",year:2007,seasons:7,type:"series",rating:10,content_rating:"TV-MA"});
                            expect(result).to.include({name:"The Sopranos",_id:"59eb77d48bef0021640102f6",creator:"David Chase",year:1999,seasons:6,type:"series",rating:8,content_rating:"TV-MA"});
                            expect(result).to.include({name:"True Detective",_id:"59eb77d48bef0021640102f7",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"});
                            expect(result).to.include({name:"The Shadow Line",_id:"59eb77d48bef0021640102f8",creator:"Hugo Blick",year:2015,seasons:1,type:"mini-series",rating:10,content_rating:"TV-MA"});
                            expect(result).to.include({name:"The Wire",_id:"59eb77d48bef0021640102f9",creator:"David Simon",year:2002,seasons:5,type:"series",rating:9,content_rating:"TV-MA"});
                            expect(result).to.include({name:"Show Me a Hero",_id:"59eb77d48bef0021640102fa",creator:"David Simon",year:2015,seasons:1,type:"mini-series",rating:8,content_rating:"TV-MA"});
                            done();
                        });
                });
            });
            describe('/tv/tv_array   [requires the inclusion of an array named tv_array in the request body]',function(){
                it('should return an error when at least one of the documents in the :array_name array are invalid',function(done){
                    var send_object = {
                        tv_array:
                            [
                                {x:"Mad Men",creator:"Matthew Weiner",year:2007,seasons:7,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Sopranos",creator:"David Chase",year:1999,seasons:6,type:"series",rating:8,content_rating:"TV-MA"},
                                {name:"True Detective",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Shadow Line",creator:"Hugo Blick",year:2015,seasons:1,type:"mini-series",rating:10,content_rating:"TV-MA"},
                                {name:"The Wire",creator:"David Simon",year:2002,seasons:5,type:"series",rating:9,content_rating:"TV-MA"},
                                {name:"Show Me a Hero",creator:"David Simon",year:2015,seasons:1,type:"mini-series",rating:8,content_rating:"TV-MA"}
                            ]
                    }
                    chai.request(server)
                        .post('/tv/tv_array')
                        .send(send_object)
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('errors').to.have.property('name').to.have.property('message');
                            expect(res.body.errors.name.message).equal("Path `name` is required.");
                            done();
                        });
                });
            });
            describe('/tv/wrong_name',function(){
                it('should return an error when :array_name is not the name of the array that is sent',function(done){
                    var send_object = {
                        tv_array:
                            [
                                {name:"Mad Men",creator:"Matthew Weiner",year:2007,seasons:7,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Sopranos",creator:"David Chase",year:1999,seasons:6,type:"series",rating:8,content_rating:"TV-MA"},
                                {name:"True Detective",creator:"Nic Pizzolatto",year:2014,seasons:2,type:"series",rating:10,content_rating:"TV-MA"},
                                {name:"The Shadow Line",creator:"Hugo Blick",year:2015,seasons:1,type:"mini-series",rating:10,content_rating:"TV-MA"},
                                {name:"The Wire",creator:"David Simon",year:2002,seasons:5,type:"series",rating:9,content_rating:"TV-MA"},
                                {name:"Show Me a Hero",creator:"David Simon",year:2015,seasons:1,type:"mini-series",rating:8,content_rating:"TV-MA"}
                            ]
                    }
                    chai.request(server)
                        .post('/tv/wrong_name')
                        .send(send_object)
                        .end(function(err,res){
                            expect(res).to.have.status(404);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("The name of the array in the request path does not match the name of the array that was sent.");
                            done();
                        });
                });
            });
        });
    });
    describe('\n\n    DELETE Functions', function(){
        describe('DELETE   /tv   function:deleteMany',function(){
            describe('/tv',function(){
                it('should delete all TV objects from the database, and return a confirmation message', function(done){
                    chai.request(server)
                        .delete('/tv')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal("All TV objects have been deleted from the database");
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(0);
                            done();
                        });
                });
            });
        });
        describe('\n      DELETE    /tv/*attribute*/:attribute_value   function:deleteMany',function(){
            describe('/tv/name/Breaking Bad',function(){
                it('should return a message confirming there are no TV objects in the database with the specified name value', function(done) {
                    chai.request(server)
                        .delete('/tv/name/Breaking Bad')
                        .end(function (err, res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have Breaking Bad for its name.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
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
            describe('/tv/creator/Vince Gilligan',function(){
                it('should return a message confirming there are no TV objects in the database with the specified creator value', function(done){
                    chai.request(server)
                        .delete('/tv/creator/Vince Gilligan')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have Vince Gilligan for its creator.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
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
            describe('/tv/year/2009',function(){
                it('should return a message confirming there are no TV objects in the database with the specified year value', function(done){
                    chai.request(server)
                        .delete('/tv/year/2009')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have 2009 for its year.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
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
            describe('/tv/seasons/5',function(){
                it('should return a message confirming there are no TV objects in the database with the specified seasons value', function(done){
                    chai.request(server)
                        .delete('/tv/seasons/5')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have 5 for its seasons.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
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
            describe('/tv/type/series',function(){
                it('should return a message confirming there are no TV objects in the database with the specified type value', function(done){
                    chai.request(server)
                        .delete('/tv/type/series')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have series for its type.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(0);
                            done();
                        });

                });
            });
            describe('/tv/rating/9',function(){
                it('should return a message confirming there are no TV objects in the database with the specified rating value', function(done){
                    chai.request(server)
                        .delete('/tv/rating/9')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have 9 for its rating.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
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
            describe('/tv/content_rating/TV-MA',function(){
                it('should return a message confirming there are no TV objects in the database with the specified content_rating value', function(done){
                    chai.request(server)
                        .delete('/tv/content_rating/TV-MA')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).equal('There are now no TV Objects in the database that have TV-MA for its content_rating.');
                            done();
                        });
                });
                after(function(done){
                    chai.request(server)
                        .get('/tv')
                        .end(function(err,res){
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).equal(0);
                            done();
                        });
                });
            });
        });

    
    });
});
