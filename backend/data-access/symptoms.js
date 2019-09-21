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
                res[line[0]] = line.slice(1);
            }
            resolve(res);
        });
    })
}

module.exports = {
    getAllSymptoms: getAllSymptoms
};
