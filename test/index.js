/* global describe, it */

const assert = require("chai").assert;
const palette = require("webcolors").mrmrs;
const plugin = require("..")({ palette });
const postcss = require("postcss")([plugin]);

describe("color keyword transformations", () => {
  const transforms = {
    color: {
      css: "color: aqua",
      expected: `color: ${palette.aqua}`
    },
    border: {
      css: "border: 1px solid yellow",
      expected: `border: 1px solid ${palette.yellow}`
    },
    arguments: {
      css: "color: func(navy)",
      expected: `color: func(${palette.navy})`
    },
    gradient: {
      css: "background: linear-gradient(purple, #FFFFFF 50%)",
      expected: `background: linear-gradient(${palette.purple}, #FFFFFF 50%)`
    }
  };

  const ignores = {
    url: {
      css: "background: url('green.png')"
    },
    functions: {
      css: "color: blue(50%)"
    },
    fonts: {
      css: "font-family: 'black', olive, navy-font"
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
