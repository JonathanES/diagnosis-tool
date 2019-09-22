
const bmSymptoms = require('../data-access/symptoms.js');

let SYMPTOMS_INFORMATION = {};
/**
 * call the data access function getAllSymptoms
 * instantiate the global variable SYMPTOMS_INFORMATION
 * This global variable contains as key the symptoms.
 * The symptoms/keys have for values an object.
 * This object contains all the diagonises and a frequency, initially at 0.
 */
async function getAllSymptomsInformation() {
    SYMPTOMS_INFORMATION = await bmSymptoms.getAllSymptoms();
}

/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * Doesn't take any param or query in the URL.
 * It will return the list of symptoms
 */
async function getAllSymptoms(req, res, next) {
    res.status(200)
        .json({
            status: 'success',
            data: Object.keys(SYMPTOMS_INFORMATION),
            message: 'Retrieved all symptoms'
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * Has for param a symptom name
 * We check if they symptom that has been given by the user exist in our global variable
 * If it does, we return the diagonises sorted from the most relevant to the least relevant.
 */
async function getSymtomDiagnosis(req, res, next) {
    const symptom = req.params.symptom;
    if (Object.keys(SYMPTOMS_INFORMATION).includes(symptom)) {
        let val = SYMPTOMS_INFORMATION[symptom];
        tmp = Object.keys(val).sort((a, b) => {
            return val[b] - val[a]
        });
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * When a user has approved of a diagonises for a symptom, it's frequency is increased here.
 * Take the symptom in the body. This symptom is used to get all the diagonises of the symptom the user had.
 * When we get all the symptoms, we increase the frequency of the specific diagonis
 * We return the diagonises and their frequencies.
 * This will let us have the graph that are being displayed on the frontend.
 */
function increaseFrequency(req, res, next) {
    const diagnosis = req.body.diagnosis;
    const symptom = req.body.symptom;
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