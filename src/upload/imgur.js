var imgur = require('imgur');
var path = require('path');

// var last = path.normalize(projectRootDir + '/tf_files/temp_data/temp.jpg');

// we could add account support here...

module.exports = upload = (imagePath) => {
    return new Promise(function (fulfill, reject) {
        imgur.uploadFile(imagePath)
            .then(function (json) {
                // console.log(json.data.link);
                fulfill(json.data.link);
            })
            .catch(function (err) {
                console.error(err.message);
                reject(err);
            });
    });
}

