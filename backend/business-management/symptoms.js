const bmSymptoms = require('../data-access/symptoms.js');

function getAllSymptomsInformation(){
    return new Promise(async (resolve, reject) => {
        const symptoms = await bmSymptoms.getAllSymptoms()
        resolve(symptoms);
    })
}

async function getAllSymptoms(req, res, next){
    const symptoms = await getAllSymptomsInformation();
    res.status(200)
        .json({
            status: 'success',
            data: Object.keys(symptoms),
            message: 'Retrieved all symptoms'
        });
}

async function getSymtomDiagnosis(req, res, next){
    const symptoms = await getAllSymptomsInformation();
    const symptom = req.params.symptom;
    if (Object.keys(symptoms).includes(symptom)){
        res.status(200)
        .json({
            status: 'success',
            data: Object.values(symptoms[symptom]),
            message: 'Retrieved all diagnosis'
        });
    }
    else{
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
    getSymtomDiagnosis: getSymtomDiagnosis
}