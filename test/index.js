/* global describe, it */

const assert = require("chai").assert;
const webcolors = require("webcolors");
const PostCSS = require("postcss");
const Plugin = require("..");

Object.keys(webcolors).forEach(name => {
  const palette = webcolors[name];

  describe(`palette: ${name}`, () => {
    const plugin = Plugin({ palette: name });
    const postcss = PostCSS([plugin]);

    const transforms = {
      color: {
        css: "color: blue",
        expected: `color: ${palette.blue}`
      },
      border: {
        css: "border: 1px solid purple",
        expected: `border: 1px solid ${palette.purple}`
      },
      arguments: {
        css: "color: func(red)",
        expected: `color: func(${palette.red})`
      },
      gradient: {
        css: "background: linear-gradient(orange, #FFFFFF 50%)",
        expected: `background: linear-gradient(${palette.orange}, #FFFFFF 50%)`
      }
    };

    const ignores = {
      url: {
        css: "background: url('yellow.png')"
      },
      functions: {
        css: "color: green(50%)"
      },
      fonts: {
        css: "font-family: 'black', teal, gray-font"
      }
    };

    Object.keys(transforms).forEach(name => {
      const test = transforms[name];
      const css = `a{${test.css}}`;
      const expected = `a{${test.expected}}`;

      it(`should transform colors in '${name}'`, () => {
        const result = postcss.process(css);
        assert.equal(result.css, expected);
      });
    });

    Object.keys(ignores).forEach(name => {
      const test = ignores[name];
      const css = `a{${test.css}}`;

      it(`should ignore colors in '${name}'`, () => {
        const result = postcss.process(css);
        assert.equal(result.css, css);
      });
    });
  });
});
