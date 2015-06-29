htmlcs
========

[![Build Status](https://img.shields.io/travis/ecomfe/htmlcs.svg?style=flat)](http://travis-ci.org/ecomfe/htmlcs)
[![NPM version](https://img.shields.io/npm/v/htmlcs.svg?style=flat)](https://www.npmjs.com/package/htmlcs)
[![Coverage Status](https://img.shields.io/coveralls/ecomfe/htmlcs.svg?style=flat)](https://coveralls.io/r/ecomfe/htmlcs)
[![Dependencies](https://img.shields.io/david/ecomfe/htmlcs.svg?style=flat)](https://david-dm.org/ecomfe/htmlcs)
[![DevDependencies](https://img.shields.io/david/dev/ecomfe/htmlcs.svg?style=flat)](https://david-dm.org/ecomfe/htmlcs)


html hint tool, focused on semantic code style.

### Install

	npm i -g htmlcs

### Usage

* in CLI

	```shell
	htmlcs <file>
	```

* in Node.js

	* hint file

		```javascript
		var htmlcs = require('htmlcs');
		var result = htmlcs.hintFile(filePath);
		```

	* hint code (string)

		```javascript
		var htmlcs = require('htmlcs');
		var result = htmlcs.hint(code);
		```

	* use hint result

		```javascript
		result.forEach(function(item){
		    console.log(
		        '[%s] line %d, col %d: %s (%s, %s)',
		        item.type,
		        item.pos.line,
		        item.pos.col,
		        item.message,
		        item.rule,
		        item.code
		    );
		});
		```

	* format file

		```javascript
		var htmlcs = require('htmlcs');
		console.log(htmlcs.formatFile(filePath))
		```

	* format code (string)

		```javascript
		var htmlcs = require('htmlcs');
		console.log(htmlcs.format(code))
		```

### Rules & Codes

[lib/rules/](./lib/rules/)

[rule map](./lib/default/rule-map.json)

### Config

* default: [lib/default/.htmlcsrc](./lib/default/htmlcsrc)

* custom:

	Custom rule file (.htmlcsrc) can be placed in the same/parent directory of target file, or the `~/` directory.

	If found in neither paths, the default config will be used.
