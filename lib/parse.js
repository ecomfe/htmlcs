/**
 * @file parse code
 * @author nighca<nighca@live.cn>
 */

var htmlparser2 = require('htmlparser2');
var Parser = htmlparser2.Parser;
var DomHandler = htmlparser2.DomHandler;

var util = require('./util');
var Node = require('./node');

// transform node to Node instance & recursively transform its children
var transformRecursively = function (node) {
    Node.init(node);

    node.childNodes.forEach(function (childNode) {
        transformRecursively(childNode);
    });

    return node;
};

// wrap dom with <document>
var wrapDocument = function (arr) {
    var document = htmlparser2.parseDOM('<document></document>')[0];

    document.children = arr;

    for (var i = 0; i < arr.length; i++) {
        var node = arr[i];

        node.prev = arr[i - 1] || null;
        node.next = arr[i + 1] || null;

        node.root = document;
        node.parent = null;
    }

    transformRecursively(document);

    return document;
};

// gen a position method with given content
var genPosition = function (content) {
    var start = 0;
    var line = 0;
    var col = 0;

    // the position method
    // elements should be passed with startIndex-low-to-high
    return function (element) {
        var index = element.startIndex;

        for (; start <= index; start++) {
            switch (content[start]) {

                case '\n':
                    col = -1;
                    line++;
                    break;

                default:
                    col++;

            }
        }

        element.startPos = {
            line: line + 1,
            col: col + 1
        };
    };
};

// parse given html content to document object
var parse = function (htmlCode, options) {
    htmlCode = htmlCode.replace(/\r\n/g, '\n');

    // record all elements
    var elements = [];

    // handler during parse
    var handlerOption = {
        withStartIndices: true
    };
    var handler = new DomHandler(handlerOption, function (element) {
        elements.push(element);
    });

    // parser
    var parser = new Parser(handler, options);

    // do parse
    parser.end(htmlCode);

    // method to position element
    var position = genPosition(htmlCode);

    // position elements one by one (sorted to position high-efficiently)
    elements.sort(function (e1, e2) {
        return e1.startIndex - e2.startIndex;
    }).forEach(position);

    // wrap dom with <document>
    var document = wrapDocument(handler.dom);

    return document;
};

module.exports = parse;
