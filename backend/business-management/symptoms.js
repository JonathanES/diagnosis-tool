const bmSymptoms = require('../data-access/symptoms.js');

let SYMPTOMS_INFORMATION = {};

async function getAllSymptomsInformation() {
    SYMPTOMS_INFORMATION = await bmSymptoms.getAllSymptoms();
}

async function getAllSymptoms(req, res, next) {
    res.status(200)
        .json({
            status: 'success',
            data: Object.keys(SYMPTOMS_INFORMATION),
            message: 'Retrieved all symptoms'
        });
}

async function getSymtomDiagnosis(req, res, next) {
    const symptom = req.params.symptom;
    if (Object.keys(SYMPTOMS_INFORMATION).includes(symptom)) {
        let val = SYMPTOMS_INFORMATION[symptom];
        val = Object.keys(val).sort((a, b) => { return val[b] - val[a] })
        res.status(200)
            .json({
                status: 'success',
                data: val,
                message: 'Retrieved all diagnosis'
            });
    }
    else {
        res.status(404).json({
            status: 'refused',
            data: [],
            message: 'not found'
        })
    }
}

function increaseFrequency(req, res, next) {
    const diagnosis = req.body.diagnosis;
    const symptom = req.body.symptom;
    console.log(diagnosis + " " + symptom);
    if (Object.keys(SYMPTOMS_INFORMATION).includes(symptom)) {
        let val = SYMPTOMS_INFORMATION[symptom];
        if (diagnosis in val) {
            val[diagnosis] += 1
        }
        else {
            res.status(404).json({
                status: 'refused',
                data: [],
                message: 'not found'
            })
        }
        res.status(200)
            .json({
                status: 'success',
                data: val,
                message: 'Send back report'
            });
    }
    else {
        res.status(404).json({
            status: 'refused',
            data: [],
            message: 'not found'
        })
    }

}

module.exports = {
    getAllSymptomsInformation: getAllSymptomsInformation,
    getAllSymptoms: getAllSymptoms,
    getSymtomDiagnosis: getSymtomDiagnosis,
    increaseFrequency: increaseFrequency
}