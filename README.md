# sketchjs
Small wrapper around sketchtool and sketchmigrate from BohemianCoding

## Installation

```bash
cd ~/your/project/directory
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
