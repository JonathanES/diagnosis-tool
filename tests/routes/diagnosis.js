const assert = require('assert');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;



chai.use(chaiHttp);
let server = require('../../server')

describe('/GET /', () => {
    it('Should launch the server correctly and display Connected!', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Connected!');
            console.log(res.body.message);
            done();
        })
    });
})

describe('/GET /api/symptoms', () => {
    it('it should GET all the symptoms', (done) => {
        chai.request(server)
            .get('/api/symptoms')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                res.body.should.have.property('data').lengthOf(3)
                done();
            });
    });
});

describe('/GET /api/diagnosis/:symptom', () => {
    it('it should GET all the diagnosis of sore throat', (done) => {
        chai.request(server)
            .get('/api/diagnosis/sore throat')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data');
                res.body.should.have.property('data').lengthOf(9)
                expect(res.body.data).to.be.an('array').that.does.include('common cold');
                expect(res.body.data).to.be.an('array').that.does.not.include('commoncold');
                done();
            });
    });
});
describe('/POST, /report', () => {
    it('it should increase the frequency of the diagnosis', (done) => {
        let report = {
            "diagnosis": "seasonal allergies",
            "symptom": "sore throat"
        }
        chai.request(server)
            .post('/api/report')
            .type('form')
            .send(report)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(Object.values(res.body.data)).to.be.an('array').that.does.include(0);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.include(1);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(2);
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.include('common cold');
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('commoncold');
                res.should.have.status(200);
                res.body.should.have.property('data').should.be.a('object');
                res.body.should.have.property('data')
                done();
            });
    })
});