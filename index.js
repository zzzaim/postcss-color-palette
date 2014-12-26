var helpers   = require('postcss-message-helpers');
var webcolors = require('webcolors');

var DEFAULTS = webcolors.mrmrs;

var KEYWORDS = [
  'aqua',
  'black',
  'blue',
  'fuchsia',
  'gray',
  'green',
  'lime',
  'maroon',
  'navy',
  'olive',
  'orange',
  'purple',
  'red',
  'silver',
  'teal',
  'white',
  'yellow'
];

var KEYWORD_REGEX = new RegExp('\\b(' + KEYWORDS.join('|') + ')\\b');


module.exports = function plugin (opts) {
  opts = opts || {};
  opts.palette = opts.palette || DEFAULTS;

  if (typeof opts.palette === 'string') {
    if (webcolors.hasOwnProperty(opts.palette)) {
      opts.palette = webcolors[opts.palette];
    } else {
      throw new Error('Unknown webcolors palette: "' + opts.palette + '"');
    }
  }

  var palette    = opts.palette;
  var transforms = [];

  KEYWORDS.forEach(function (keyword) {
    if (palette.hasOwnProperty(keyword) && palette[keyword]) {
      transforms.push([
        new RegExp('\\b(' + keyword + ')\\b', 'gi'),
        palette[keyword]
      ]);
    }
  });

  return function processor (css) {
    css.eachDecl(function transformDecl (decl) {
      if (!decl.value || !KEYWORD_REGEX.test(decl.value)) {
        return;
      }
      decl.value = helpers.try(function transformValue () {
        return transforms.reduce(function (value, args) {
          return value.replace.apply(value, args);
        }, decl.value);
      }, decl.source);
    });
  };
};
