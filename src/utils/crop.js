/*
  Crop and move all images from raw_data to isis_black folder...
*/

const gm = require('gm');
const fs = require('fs');

const rawDataDir = './raw_data/';
const processedDataDir = './isis_black/';

fs.readdir(rawDataDir, (err, files) => {
  files.forEach(file => {
    gm(rawDataDir + file)
      .crop(512, 512, '!')
      .write(processedDataDir + file, (err) => {
        if (err) {
          throw err;
        }
        // console.log('done');
      });
  });
})

