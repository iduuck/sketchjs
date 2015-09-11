/*!
 * Sketch.js Wrapper for sketchtool by BohemianCoding
 * Copyright (c) 2015 Kreativgebiet GmbH
 *
 * Released under MIT License (MIT)
 * https://opensource.org/licenses/MIT
 */

var join             = require('path').join;
var spawn            = require('child_process').spawn;
var exec             = require('child_process').exec;
var _                = require('lodash');

var ExportError      = require('./export_error');

var ACCEPTABLE_TYPES = ['slices', 'artboards', 'layers', 'pages'];

/**
 * Sketch.js
 * @type {Object}
 */
var sketch = module.exports = {
  process: null,
  defaults: {
    /**
     * Type of the action
     * @default 'list'
     * @type {String}
     */
    type: 'list',

    /**
     * Formats of the export
     * @default 'png'
     * @type {String,Array}
     */
    formats: 'png',

    /**
     * Solutions that should be exported
     * @default [ 1.0, 2.0 ]
     * @type {String,Array}
     */
    scales: [ 1.0, 2.0 ],

    /**
     * Output directory
     * @default 'export'
     * @type {String}
     */
    output: 'export'
  }
};

/**
 * Tool Binary Path
 * @type {String}
 */
sketch.toolBinary = join(__dirname, '../bin', 'sketchtool');

/**
 * Migrate Binary Path
 * @type {String}
 */
sketch.migrateBinary = join(__dirname, '../bin', 'sketchmigrate');

/**
 * Asynchronously list all slices, artboards or pages from a sketchfile
 * @param  {String}   file
 * @param  {String}   type
 * @param  {Function} callback
 * @return {Function}
 */
sketch.list = function (file, type, callback) {
  var self = this;
  if( !this._isAcceptableType( type ) ) return false;

  this.process = spawn(this.toolBinary, ['list', type, file]);

  this.process.stdout.on('data', function (data) {
    self._resetProcess();
    callback(data.toString());
    return true;
  });

  this.process.stderr.on('data', function(data) {
    return false;
  });
};

/**
 * Export slices or artboards
 * @param  {String}         file
 * @param  {Object}         args
 * @param  {Function}       callback
 *
 * @config {String,Array}   formats
 * @config {String,Array}   scales
 * @config {String,Array}   items
 * @config {String,Array}   bounds
 * @config {String}         output
 * @config {Boolean}        trimmed
 * @config {Boolean}        reveal
 *
 * @return {Boolean}
 */
sketch.export = function (file, args, callback) {
  var self = this;

  for(var key in args) {
    if(typeof args[key] == 'Array') args[key] = args[key].join(',');
  }

  args = _.merge(this.defaults, args);
  var type = args.type;
  delete args.type;

  if( !this._isAcceptableType( type ) ) return false;

  console.log(self._toolBinaryCommand('export', type, file, args));

  this.process = exec(
    self._toolBinaryCommand('export', type, file, args),
    function(err, stdout, stderr) {
      if( stdout == '' ) callback(new ExportError('Something went wrong when exporting your Sketch file!'));
      self._resetProcess();
      callback(err, stdout, stderr);
    }
  );
};

/**
 * Migrate old sketch file to new version
 * @param  {String}   oldFile
 * @param  {String}   newFile
 * @param  {Function} callback
 * @return {Boolean}
 */
sketch.migrate = function (oldFile, newFile, callback) {
  spawn(this.migrateBinary, ['convert', oldFile, newFile], callback)
};

/**
 * Check if the given type is an acceptable type
 * @param  {String}  str
 * @return {Boolean}
 *
 * @private
 */
sketch._isAcceptableType = function (str) {
  return !(_.indexOf(ACCEPTABLE_TYPES, str) == -1);
}

/**
 * Convert the given arguments object into an array
 * @param  {Object} args
 * @return {Array}
 *
 * @private
 */
sketch._argsToArray = function (args, opts) {
  var arr = [];

  if( typeof opts == 'object' ) {
    if( opts.prepend ) arr.push(opts.prepend);
  }

  for (var key in args) {
    var value = args[key];
    if( typeof value == 'Boolean' ) value = ( value ) ? 'YES' : 'NO';
    arr.push('--' + key + '="' + value + '"');
  }

  return arr;
};

/**
 * Reset the current process
 *
 * @private
 */
sketch._resetProcess = function () {
  this.process = null;
}

/**
 * Build the tool binary command for execution
 * @param  {String} func
 * @param  {String} type
 * @param  {String} file
 * @param  {Object} args
 * @return {Array}
 *
 * @private
 */
sketch._toolBinaryCommand = function (func, type, file, args) {
  return [
    this.toolBinary,
    func,
    type,
    file,
    this._argsToArray(args).join(' ')
  ].join(' ');
};
