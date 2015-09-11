var sketch = require('../lib/sketch');
var join = require('path').join;
var expect = require('chai').expect;

describe('Sketch.list', function () {
  before(function () {});

  it('writes json with all layers', function (done) {
    sketch.list(join(__dirname, 'fixtures/my.sketch'), 'layers', function (json) {
      json = JSON.parse(json);
      var firstPage = json.pages[0];

      expect(json).to.be.an('object');
      expect(json).to.have.property('pages');
      expect(firstPage).to.have.property('layers');
      done();
    });
  });

  it('lists all slices', function (done) {
    sketch.list(join(__dirname, 'fixtures/my.sketch'), 'slices', function (json) {
      json = JSON.parse(json);
      var firstPage = json.pages[0];

      expect(json).to.be.an('object');
      expect(json).to.have.property('pages');
      expect(firstPage).to.have.property('slices');
      done();
    });
  });

  it('lists all pages', function (done) {
    sketch.list(join(__dirname, 'fixtures/my.sketch'), 'pages', function (json) {
      json = JSON.parse(json);
      var firstPage = json.pages[0];

      expect(json).to.be.an('object');
      expect(json).to.have.property('pages');
      done();
    });
  });

  it('lists all artboards', function (done) {
    sketch.list(join(__dirname, 'fixtures/my.sketch'), 'artboards', function (json) {
      json = JSON.parse(json);
      var firstPage = json.pages[0];

      expect(json).to.be.an('object');
      expect(json).to.have.property('pages');
      expect(firstPage).to.have.property('artboards');
      done();
    });
  });

  it('doesnt accept wrong types', function () {
    var listing = sketch.list(
      join(__dirname, 'fixtures/my.sketch'),
      'wrongtype',
      function (json) {}
    );

    expect(listing).to.be.false;
  });
});
