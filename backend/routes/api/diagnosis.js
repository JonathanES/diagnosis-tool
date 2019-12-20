const symptoms = require('../../business-management/symptoms');

module.exports = function (app) {
    //get
    app.get('/symptoms',symptoms.getAllSymptoms);
    app.get('/diagnosis/:symptom', symptoms.getSymtomDiagnosis);
    // post to increase the frequency
    app.post('/report', symptoms.increaseFrequency);
};