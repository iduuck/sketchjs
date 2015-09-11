var expect = require('chai').expect;
var fs     = require('fs');
var join   = require('path').join;
var rimraf = require('rimraf');
var sketch = require('../lib/sketch');

var tempDir = join(__dirname, 'tmp');

describe('Sketch.export', function () {
  afterEach(function(done) {
    rimraf(tempDir, function() {
      done();
    });
  });

  it('exports artboards', function(done) {
    sketch.export(
      join(__dirname, 'fixtures/my.sketch'),
      {
        type: 'artboards',
        output: tempDir
      },
      function (err, stdout, stderr) {
        // fs.readdir(tempDir, function (err2, files) {
        //   expect(files).to.be.an('array');
        //   expect(files).to.have.length.above(1);
        done();
        // });
      }
    );
  });
});
