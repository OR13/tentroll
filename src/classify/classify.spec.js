var assert = require('assert');

var classify = require('./classify');
var classify_url = require('./classify_url');

var getHighestScoreLabel = (data) => {
  var highest_score_label;
  var highest_score;

  Object.keys(data).forEach((key) => {
    if (!highest_score_label || data[key] > highest_score) {
      highest_score_label = key;
      highest_score = data[key]
    }
  })
  return highest_score_label;
}

describe("#classify('/tf_files/test_data/0.jpg')", function () {
  this.timeout(5 * 1000);
  it('should return return isis as the highest score', function () {
    return classify('/tf_files/test_data/0.jpg')
      .then((data) => {
        assert(getHighestScoreLabel(data) === 'isis');
      })
  });
});

describe("#classify_url('http://www.newstarget.com/wp-content/uploads/sites/43/2016/12/ISIS1.jpg')", function () {
  this.timeout(10 * 1000);
  it('should return return isis as the highest score', function () {
    return classify_url('http://www.newstarget.com/wp-content/uploads/sites/43/2016/12/ISIS1.jpg')
      .then((data) => {
        assert(getHighestScoreLabel(data) === 'isis');
      })
  });
});

describe("#classify_url('http://www.i-want-to-break-free.org/wp-content/uploads/2016/04/gay-pride.png')", function () {
  this.timeout(10 * 1000);
  it('should return return isis as the highest score', function () {
    return classify_url('http://www.i-want-to-break-free.org/wp-content/uploads/2016/04/gay-pride.png')
      .then((data) => {
        assert(getHighestScoreLabel(data) === 'gays');
      })
  });
});

