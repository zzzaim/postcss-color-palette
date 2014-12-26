/* global describe, it */

var fs      = require('fs');
var assert  = require('assert');
var postcss = require('postcss');
var plugin  = require('..');

function filename (name) {
  return 'test/fixtures/' + name + '.css';
}

function read (name) {
  return fs.readFileSync(name, 'utf8');
}

function compareFixtures (name, opts) {
  var input    = filename(name);
  var cssOpts  = { from: filename(name + '.actual') };
  var actual   = postcss().use(plugin(opts)).process(read(input), cssOpts).css;
  var expected = read(filename(name + '.expected'));
  fs.writeFile(cssOpts.from, actual);
  assert.equal(actual, expected);
}

describe('plugin', function (t) {
  it('should transform colors', function () {
    compareFixtures('palette', {
      palette: {
        aqua    : "#7FDBFF",
        blue    : "#0074D9",
        lime    : "#01FF70",
        navy    : "#001F3F",
        teal    : "#39CCCC",
        olive   : "#3D9970",
        green   : "#2ECC40",
        red     : "#FF4136",
        maroon  : "#85144B",
        orange  : "#FF851B",
        purple  : "#B10DC9",
        yellow  : "#FFDC00",
        fuchsia : "#F012BE",
        gray    : "#AAAAAA",
        white   : "#FFFFFF",
        black   : "#111111",
        silver  : "#DDDDDD"
      }
    });
  });
});
