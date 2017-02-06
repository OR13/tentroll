var assert = require('assert');
var path = require('path');
var deface = require('./isis');

var projectRootDir = path.normalize(__dirname + '/../..');
var lastImage = path.normalize(projectRootDir + '/tf_files/temp_data/temp.jpg');

describe.only("#deface(path, text, color)", function () {
    this.timeout(5 * 1000);
    it('should return return make image pink and with custom text', function () {
        return deface(lastImage, 'isis is gay', '#FF4081')
            .then((defacedImageUrl) => {
                // console.log(defacedImageUrl)
                assert(defacedImageUrl)
            })
    });
});


