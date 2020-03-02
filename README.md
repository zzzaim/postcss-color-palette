# postcss-color-palette

> [PostCSS](https://github.com/postcss/postcss) plugin to transform
> [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color) to a custom palette

This plugin can transform color keywords such as `aqua`, `blue`, `lime`, etc.
to any other color. Bundled with the
[webcolors](https://github.com/zaim/webcolors) package, making three beautiful
color palettes available to use in your stylesheets: [clrs.cc](http://clrs.cc)/[mrmrs](https://github.com/mrmrs/colors),
[FlatUI](http://flatuicolors.co) and [Material](http://www.google.com/design/spec/style/color.html) -- simply by using standard color names.

## Installation

```
$ npm install postcss-color-palette
```

## Usage

```javascript
// dependencies
var fs = require('fs');
var postcss = require('postcss');
var palette = require('postcss-color-palette');

// css to be processed
var css = fs.readFileSync('input.css', 'utf8');

// process it
var output = postcss()
  .use(palette({
    palette: 'material'
  })
  .process(css)
  .css;
```

Using this `input.css`:

```css
body {
  color: yellow;
  background: linear-gradient(aqua, blue 50%, purple);
}
```

you will get:

```css
body {
  color: #ffeb3b;
  background: linear-gradient(#00bcd4, #2196f3 50%, #9c27b0);
}
```

### Options

#### `palette`

Specify a [webcolors](https://github.com/zaim/webcolors) palette name
(`mrmrs`, `material` or `flatui`), or an object mapping of [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color) to
color values. By default, uses the [mrmrs](https://github.com/mrmrs/colors)
color palette.

## License

MIT - see [LICENSE](LICENSE) file.
