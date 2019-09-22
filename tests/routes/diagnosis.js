const assert = require('assert');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

const constant = require('../../constant/constant');



chai.use(chaiHttp);
let server = require('../../server')
/**
 * check if we can launch the server without any bugs.
 * if we get the message Connected!, the server can be launched.
 */
describe('/GET /', () => {
    it('Should launch the server correctly and display Connected!', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(constant.SUCCESS_STATUS_NUM);
            res.body.should.have.property('message').eql('Connected!');
            console.log(res.body.message);
            done();
        })
    });
})

/**
 * check if we can get all the symptoms through our API.
 * We check if we get a status 200 and that we don't get an error.
 * Then we check if our data is an array and that it has a length of 3 since we know that there are only 3 symptoms.
 * Then we check if we have all the expected value and that we don't have any unexpected ones.
 */
describe('/GET /api/symptoms', () => {
    it('it should GET all the symptoms', (done) => {
        chai.request(server)
            .get('/api/symptoms')
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(constant.SUCCESS_STATUS_NUM);
                res.body.should.have.property('status').eql(constant.SUCCESS_STATUS);
                res.body.should.have.property('data');
                res.body.should.be.a('object');
                res.body.should.have.property('data').lengthOf(3)
                expect(res.body.data).to.be.an('array').that.does.include('sore throat');
                expect(res.body.data).to.be.an('array').that.does.include('itchy rash');
                expect(res.body.data).to.be.an('array').that.does.include('runny nose');
                expect(res.body.data).to.be.an('array').that.does.not.include('sorethroat');
                done();
            });
    });
});

/**
 * check if we can get all the diagnosis for a specific symptom, which it is here through our API.
 * We check if we get a status 200 and that we don't get an error.
 * Then we check if our data is an array and that it has a length of 9 since we know that there are only 9 diagnosises.
 * Then we check if we have all the expected value and that we don't have any unexpected ones.
 */
const symptom = 'sore throat';
describe('/GET /api/diagnosis/:symptom', () => {
    it('it should GET all the diagnosis of sore throat', (done) => {
        chai.request(server)
            .get('/api/diagnosis/' + symptom)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(constant.SUCCESS_STATUS_NUM);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(constant.SUCCESS_STATUS);
                res.body.should.have.property('data');
                res.body.should.have.property('data').lengthOf(9)
                expect(res.body.data).to.be.an('array').that.does.include('common cold');
                expect(res.body.data).to.be.an('array').that.does.not.include('commoncold');
                done();
            });
    });
});


/**
 * check if we correctly fail without crashing the server
 * give a wrong symptom name, should get a status 404/not found 
 */
const fail_symptom = 'sorethroat';
describe('/GET /api/diagnosis/:symptom with WRONG SYMPTOM NAME', () => {
    it('it should not get any diagonis', (done) => {
        chai.request(server)
            .get('/api/diagnosis/' + fail_symptom)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(constant.NOT_FOUND_STATUS_NUM);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(constant.REFUSED_STATUS);
                res.body.should.have.property('data');
                res.body.should.have.property('data').lengthOf(0)
                done();
            });
    });
});

/**
 * check if we can get increase the frequency of a diagnosis and if we can get all the diagnosise + frequency back for a specific symptom.
 * We check if we get a status 200 and that we don't get an error.
 * Then we check if our data is an object and that we have some values of 0 and 1.
 * Then we check if we have an expected key and that we don't have an unexpected ones.
 */
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
                res.should.have.status(constant.SUCCESS_STATUS_NUM);
                res.body.should.have.property('status').eql(constant.SUCCESS_STATUS);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.include(0);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.include(1);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(2);
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.include('common cold');
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('commoncold');
                res.body.should.have.property('data').should.be.a('object');
                res.body.should.have.property('data')
                done();
            });
    })
});

/**
 * check if we correctly fail without crashing the server
 * give a wrong diagonis name, should get a status 404/not found 
 */
const fail_diagonis = "seasonal allegies"
describe('/POST, /report (Wrong diagnosis name)', () => {
    it('the frequency should not increase since the diagnosis name is wrong', (done) => {
        let report = {
            "diagnosis": fail_diagonis,
            "symptom": "sore throat"
        }
        chai.request(server)
            .post('/api/report')
            .type('form')
            .send(report)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(constant.NOT_FOUND_STATUS_NUM);
                res.body.should.have.property('status').eql(constant.REFUSED_STATUS);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(0);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(1);
                expect(Object.values(res.body.data)).to.be.an('array').lengthOf(0);
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('common cold');
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('commoncold');
                res.body.should.have.property('data').should.be.a('object');
                res.body.should.have.property('data')
                done();
            });
    })
});

/**
 * check if we correctly fail without crashing the server
 * give a wrong diagonis name, should get a status 404/not found 
 */
describe('/POST /report (wrong symptom name)', () => {
    it('the frequency should not increase since the symptom name is wrong', (done) => {
        let report = {
            "diagnosis": "seasonal allergies",
            "symptom": fail_symptom
        }
        chai.request(server)
            .post('/api/report')
            .type('form')
            .send(report)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(constant.NOT_FOUND_STATUS_NUM);
                res.body.should.have.property('status').eql(constant.REFUSED_STATUS);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(0);
                expect(Object.values(res.body.data)).to.be.an('array').that.does.not.include(1);
                expect(Object.values(res.body.data)).to.be.an('array').lengthOf(0);
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('common cold');
                expect(Object.keys(res.body.data)).to.be.an('array').that.does.not.include('commoncold');
                res.body.should.have.property('data').should.be.a('object');
                res.body.should.have.property('data')
                done();
            });
    })
});