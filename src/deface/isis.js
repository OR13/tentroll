/*
Make processed isis images pink...
*/

var path = require('path');
const gm = require('gm');
const fs = require('fs');

var projectRootDir = path.normalize(__dirname + '/../..');


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var randomlyTag = (im, text, color) => {
    return new Promise(function (fulfill, reject) {
        var r = getRandomArbitrary(5, 10)
        for (var i = 0; i < r; i++) {
            var x = getRandomArbitrary(0, 512);
            var y = getRandomArbitrary(0, 512);
            im
                .out('-fill', color)
                .fontSize(32)
                .drawText(x, y, text, 600)
        }
        fulfill(im);
    });
}

//  randomlyTag(im, 'ISIS IS GAY', '#FF4081')
module.exports = deface = (pathToImage, text, color) => {
    return new Promise(function (fulfill, reject) {
        var im = gm(pathToImage);
        var defacedImagePath = path.normalize(projectRootDir + '/tf_files/temp_data/temp.defaced.jpg');
        im.recolor('1 1 0, 0 1 0, 0 1 1')
        randomlyTag(im, text, color)
        im.write(defacedImagePath, (err) => {
            if (err) {
                throw err;
            }
            fulfill(defacedImagePath);
            // console.log('done');
        });
    });
}


// EXPERIMENTS...'

// const exiftool = require('node-exiftool')
// const ep = new exiftool.ExiftoolProcess()

// var maybeTagMetaData = (imagePath) => {
//     return ep
//         .open()
//         .then((pid) => console.log('Started exiftool process %s', pid))
//         .then(() => ep.readMetadata(imagePath))
//         .then(console.log)
//         // repeat as many times as required 
//         .then(() => ep.close())
//         .then(() => console.log('Closed exiftool'))
// }

//   .command('composite')
//     .out('-compose', 'minus')
//     .in('./watermarks/pink.jpg')
// .command('convert')
// .out('fill', 'rgba(255, 255, 255, 0.0)')
// .colorize(256, 0, 256)
// overlay full rainbow...
// .command('composite')
// .out('-compose', 'plus')
// .in('./watermarks/rainbow.jpg')
// similar but darker..
// .command('composite')
// .out('-compose', 'minus')
// .in('./watermarks/rainbow.jpg')
// Over
// In
// Out
// Atop
// Xor
// Plus
// Minus
// Add
// Subtract
// Difference
// Divide
// Multiply
// Bumpmap
// Copy
// CopyRed
// CopyGreen
// CopyBlue
// CopyOpacity
// CopyCyan
// CopyMagenta
// CopyYellow
// CopyBlack