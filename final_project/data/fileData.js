var fs = require("fs");
exports.getFileAsString = (path) => {
    if (!path) {
        throw "plz provide a valid path";
    }
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

exports.getFileAsJSON = (path) => {
    return new Promise((resolve, reject) => {
        exports.getFileAsString(path).then((data) => {
            try {
                var jsonData = JSON.parse(data);
            } catch (parseErr) {
                reject("parse err: " + parseErr);
            }
            resolve(jsonData);
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.saveStringToFile = (path, text) => {
    if (!path) {
        throw "plz provide a valid path";
    }
    if (!path) {
        throw "no text to write to";
    }

    return new Promise((resolve, rejcet) => {
        fs.writeFile(path, text, 'utf8', (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });

}

exports.saveJSONToFile = (path, obj) => {
    if (!path) {
        throw "plz provide a valid path";
    }

    if (typeof obj != "object") {
        throw "no Object to write to";
    }
    return new Promise((resolve, rejcet) => {
        fs.writeFile(path, JSON.stringify(obj), 'utf8', (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });

}
