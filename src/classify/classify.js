
var exec = require('child_process').exec;
var path = require('path');

var projectRootDir = path.normalize( __dirname +  '/../..') ;

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        if (error) {
            throw error;
        }
        callback(stdout);
    });
};

module.exports = classify = (imagePath) => {
    return new Promise(function (fulfill, reject) {
        // console.log('asking docker tensorflow about the image... ', imagePath)
        var command = `
        docker run -i -v ${projectRootDir}/tf_files:/tf_files  gcr.io/tensorflow/tensorflow:latest-devel \
        python /tf_files/classify.py ${imagePath} && \
        exit
        `;
        // console.log(command);
        execute(command, (data) => {
            fulfill(JSON.parse(data))
        })
    });
}

