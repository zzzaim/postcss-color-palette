const postcss = require("postcss");
const webcolors = require("webcolors");
const { parse, nodeToString } = require("postcss-values-parser");

const defaultPalette = webcolors.mrmrs;

// All CSS properties that use the <color> data type
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#See_also
const PROPERTIES = [
  "color",
  "(background|outline)(-color)?",
  "border(-top|-right|-bottom|-left)?(-color)?",
  "(text|box)-shadow"
];

const PROPERTIES_REGEX = new RegExp("^(" + PROPERTIES.join("|") + ")$");

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * PostCSS Color Palette plugin.
 *
 * Transforms CSS Level 2 color keywords into any colors.
 *
 * @param {Object} options          Plugin options
 * @param {Object} options.palette  A map of CSS Level 2 color keywords
 *                                  to new color values.
 */
module.exports = postcss.plugin("postcss-color-palette", options => {
  options = options || {};
  options.palette = options.palette || defaultPalette;

  if (typeof options.palette === "string") {
    options.palette = webcolors[options.palette];
  }

  if (!options.palette || typeof options.palette !== "object") {
    throw new Error(`Invalid palette: ${options.palette}`);
  }

  return root => {
    root.walkRules(rule => {
      rule.walkDecls(PROPERTIES_REGEX, decl => {
        const value = parse(decl.value);

        value.walkWords(word => {
          if (word.isColor) {
            const key = word.value.toLowerCase();

            if (
              hasOwnProperty.call(options.palette, key) &&
              options.palette[key]
            ) {
              word.value = options.palette[key];
            }
          }
        });

        decl.value = nodeToString(value);
      });
    });
  };
});
