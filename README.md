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
  color: #FFEB3B;
  background: linear-gradient(#00BCD4, #2196F3 50%, #9C27B0);
}
```

### Options

#### `palette`

Specify a [webcolors](https://github.com/zaim/webcolors) palette name
(`mrmrs`, `material` or `flatui`), or an object mapping of [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color) to
color values. By default, uses the [mrmrs](https://github.com/mrmrs/colors)
color palette.

## License

The MIT License (MIT)

Copyright (c) 2015 Zaim Bakar

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
