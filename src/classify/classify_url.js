
var exec = require('child_process').exec;
var path = require('path');
var gm = require('gm');
var classify = require('./classify');

var projectRootDir = path.normalize(__dirname + '/../..');

var fs = require('fs'),
    request = require('request');

var tempPath = path.normalize(projectRootDir + '/tf_files/temp_data/temp');

var download = (uri, callback) => {

    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);
        var ext = res.headers['content-type'].split('/')[1];

        request(uri)
            .pipe(fs.createWriteStream(tempPath))
            .on('close', callback);
    });
};

var convert = (tempImagePath) => {
    return new Promise(function (fulfill, reject) {
        gm(tempImagePath)
            .setFormat("jpg")
            .write(tempImagePath + '.jpg', (err) => {
                if (err) {
                    throw err;
                }
                fulfill(tempImagePath + '.jpg')
                // console.log('done');
            });
    });
}

module.exports = classify_url = (imageURL) => {
    return new Promise(function (fulfill, reject) {
        // console.log('download first...');
        download(imageURL, () => {
            convert(tempPath)
                .then(() => {
                    classify('/tf_files/temp_data/temp.jpg')
                        .then((data) => {
                            fulfill(data);
                        })
                })
        });

    });
}

