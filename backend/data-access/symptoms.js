const fs = require('fs');
const path = require('path')
const file = path.join(__dirname,"../files/symptoms.csv");

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
