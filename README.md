htmlcs
========

[![Build Status](https://travis-ci.org/ecomfe/htmlcs.svg)](http://travis-ci.org/ecomfe/htmlcs)
[![NPM version](https://badge.fury.io/js/htmlcs.svg)](http://badge.fury.io/js/htmlcs)
[![Coverage Status](https://coveralls.io/repos/ecomfe/htmlcs/badge.png)](https://coveralls.io/r/ecomfe/htmlcs)
[![Dependencies](http://img.shields.io/david/ecomfe/htmlcs.svg?style=flat-square)](https://david-dm.org/ecomfe/htmlcs)
[![DevDependencies](http://img.shields.io/david/dev/ecomfe/htmlcs.svg?style=flat-square)](https://david-dm.org/ecomfe/htmlcs)

html hint tool, focused on semantic code style.

### Install

	npm i -g htmlcs

### Usage

* in CLI

	```shell
	htmlcs <file>
	```

* in Node.js

	```javascript
	var htmlcs = require('htmlcs');

	var result = htmlcs.hintFile(filePath);

	result.forEach(function(item){
	    console.log(
	        '[%s] line %d, col %d: %s',
	        item.type,
	        item.pos.line,
	        item.pos.col,
	        item.message
	    );
	});
	```

### Rules

[lib/rules/](./lib/rules/)

### Config

* default: [lib/default/.htmlcsrc](./lib/default/.htmlcsrc)

* custom:

	Custom rule file (.htmlcsrc) can be placed in the same/parent directory of target file, or the `~/` directory.

	If found in neither paths, the default config will be used.
