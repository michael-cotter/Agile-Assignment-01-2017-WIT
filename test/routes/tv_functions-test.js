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
            

        });
    });
});
