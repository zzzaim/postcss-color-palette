var helpers   = require('postcss-message-helpers');
var webcolors = require('webcolors');

var DEFAULTS = webcolors.mrmrs;

// All props that use the <color> data type
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#See_also
var PROPS = [
  'color',
  'background',
  'background-color',
  'border',
  'border-color',
  'outline',
  'outline-color',
  'text-shadow',
  'box-shadow'
];

// CSS color keywords to replace
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

  // For each color keyword, generate a [RegExp, 'replacement'] pair,
  // i.e. the arguments to String.prototype.replace
  KEYWORDS.forEach(function (keyword) {
    if (palette.hasOwnProperty(keyword) && palette[keyword]) {
      transforms.push([
        new RegExp('\\b(' + keyword + ')(\\s*([^(]|$))', 'gi'),
        palette[keyword] + '$2'
      ]);
    }
  });

  return function processor (css) {
    css.eachDecl(function transformDecl (decl) {
      // Check if the decl is of a color-related property and make sure
      // it has a value containing a replaceable color
      if (PROPS.indexOf(decl.prop) === -1 ||
          !decl.value ||
          !KEYWORD_REGEX.test(decl.value)) {
        return;
      }
      // Transform!
      decl.value = helpers.try(function transformValue () {
        return transforms.reduce(function (value, args) {
          return value.replace.apply(value, args);
        }, decl.value);
      }, decl.source);
    });
  };
};
