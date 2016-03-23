# sketchjs

[![Build Status](https://travis-ci.org/iDuuck/sketchjs.svg?branch=master)](https://travis-ci.org/iDuuck/sketchjs) [![Dependency Status](https://david-dm.org/iduuck/sketchjs.svg)](https://david-dm.org/iduuck/sketchjs) [![Downloads](https://img.shields.io/npm/dm/sketchjs.svg)](https://npmjs.org/package/sketchjs)

**Current `sketchtool` version:** 3.6.1

Small wrapper around sketchtool and sketchmigrate from BohemianCoding

## Installation

Since we don't want to ship sketchjs with the binaries of `sketchtool` and `sketchmigrate` anymore you need to install the binaries before.

The following bash command is the way to go (normally). If you installed Sketch from a different route, please just refer the `install.sh` to the right directory.

```bash
sh /Applications/Sketch.app/Contents/Resources/sketchtool/install.sh
```

After installing the necessary binaries from your Sketch application, you can simply run the installation command using `npm`.

```bash
npm install --save sketchjs
```

## Features

`sketchjs` is currently supporting only 3 of the feature `sketchtool` is offering the users. The supported are the following ones:

- Exporting of Layers, Artboards and Slices
- Listing (JSON) of Layers, Artboards and Slices
- Migration of old `.sketch` file into a newer

## Usage

To use `sketchjs` in your project you need to require it.

```js
var sketch = require('sketchjs');
```

or if you are using ES2015 it's simple as using this line of code:

```js
import sketch from 'sketchjs'; // getting the whole project
import { list } from 'sketchjs'; // getting only the list method
```

#### .list

List all layers, artboards or slices as json (return value).

```js
sketch.list('path/to.sketch', 'layers', function (json) {
  // Do something with the json object
});
```

#### .export

Export layers, artboards or slices into a specific folder.

```js
sketch.export(
  'path/to.sketch',
  { type: 'artboards', },
  function (err, stdout, stderr) {
    // Create your own callback here
  }
);
```

#### .migrate

Migrate an old sketch file into a new one

```js
sketch.migrate('path/to/old.sketch', 'path/to/new.sketch', function() {
  // Your custom callback
});
```

## Contributing

If you want to contribute, please feel free to fork the project and create a pull request afterwards.

## License

The project is licensed under the MIT license
