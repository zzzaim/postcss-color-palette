# postcss-color-palette

**[PostCSS](https://github.com/postcss/postcss) plugin to transform
[CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color)
into a custom palette.**

This plugin can transform color keywords such as `aqua`, `blue`, `lime`, etc.
to any other color. Bundled with the
[webcolors](https://github.com/zzzaim/webcolors) package, making these
color palettes available for use in your stylesheets:
[bootstrap](https://getbootstrap.com),
[bulma](https://bulma.io),
[mrmrs](http://clrs.cc),
[FlatUI](http://flatuicolors.com),
[Material](https://material.io/design) and
[Tailwind](https://tailwindcss.com)
-- simply by using standard CSS2 color keywords.

## Installation

```
$ npm install postcss-color-palette
```

## Usage

```javascript
var fs = require('fs');
var postcss = require('postcss');
var palette = require('postcss-color-palette');

var css = fs.readFileSync('input.css', 'utf8');

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

Specify a [webcolors](https://github.com/zzzaim/webcolors) palette name
(`bootstrap`, `bulma`, `mrmrs`, `material`, `flatui`, `tailwind`), or an
object mapping of [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color)
to color values. By default, uses the [mrmrs](https://github.com/mrmrs/colors)
color palette.

## License

MIT - see [LICENSE](LICENSE) file.
