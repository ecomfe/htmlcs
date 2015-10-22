var fs = require('fs');
var htmlparser2 = require('htmlparser2');
var cssSelect = require('css-select');

var Parser = htmlparser2.Parser;
var DomHandler = htmlparser2.DomHandler;

var code = fs.readFileSync('./single-page.html', {
    encoding: 'utf-8'
});

var handler = new DomHandler();
var parser = new Parser(handler);
parser.end(code);

var dom = handler.dom;

var categories = cssSelect('[data-anolis-xref="element-dfn-categories"]', dom);

var getText = function (node) {
	if (!node) {
		return '';
	}

	if (node.type === 'text') {
		return node.data;
	}

	return (node.children || []).map(getText).join('');
};

var getPrevTag = function (node) {
	do {
		node = node.prev;
	} while (node && node.type !== 'tag');
	return node;
};

var getNextTag = function (node) {
	do {
		node = node.next;
	} while (node && node.type !== 'tag');
	return node;
};

var indent = function (str) {
	return '\t' + str;
};

var update = function (str) {
	return str.replace(/\s*\n\s*/g, ' ').replace(/\.$/g, '').toLowerCase();
};

var map = {};

categories.forEach(function (category, i) {
	var dt = category.parent;

	var dl = dt.parent;
	var h4 = getPrevTag(dl);
	var text = getText(h4);
	var pattern = /The ([\s\S]+) element/;
	var result = pattern.exec(text);

	if (!result) {
		//console.log('!!!!!!!', text);
		return;
	}

	var name = update(result[1]);

	var categories = [];
	var dd = getNextTag(dt);
	for (; dd.name === 'dd'; dd = getNextTag(dd)) {
		categories.push(update(getText(dd)));
	}

	var contexts = [];
	dd = getNextTag(dd);
	for (; dd.name === 'dd'; dd = getNextTag(dd)) {
		contexts.push(update(getText(dd)));
	}

	var content = [];
	dd = getNextTag(dd);
	for (; dd.name === 'dd'; dd = getNextTag(dd)) {
		content.push(update(getText(dd)));
	}

	var names = name.split(/\s*\,\s*|\s*and\s*/g);

	names.forEach(function (name) {
		map[name] = {
			categories: categories.filter(function (category) {
				return category !== 'none';
			}),
			contexts: contexts,
			content: content
		};
	});
});

console.log(JSON.stringify(map, null, 4));
