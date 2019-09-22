const fs = require('fs');
const path = require('path')
const file = path.join(__dirname,"../files/symptoms.csv");

/**
 * read the csv file
 * split the string into a list of string
 * this list of string is then transformed into a list of objects
 * each object has for key, the symptom and for value the diagonises with an initial frequency of 0.
 */
function getAllSymptoms() {
    return new Promise(resolve => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) throw err;
            data = data.match(/[^\r\n]+/g);
            let res = {}
            for (line of data){
                line = line.split(", ")
                let diagnosis = {};
                const tmp = line.slice(1);
                for (elt of tmp){
                    diagnosis[[elt]] = 0;
                }
                res[line[0]] = diagnosis;
            }
            resolve(res);
        });
    })
}

module.exports = {
    getAllSymptoms: getAllSymptoms
};
