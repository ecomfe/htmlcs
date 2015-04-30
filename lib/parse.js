/**
 * @file parse code
 * @author nighca<nighca@live.cn>
 */

var emitterMethods = require('events').EventEmitter.prototype;
var htmlparser2 = require('htmlparser2');
var Parser = htmlparser2.Parser;
var DomHandler = htmlparser2.DomHandler;

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

// get a HTML parser
var getParser = function (options) {
    // handler during parse
    var handlerOption = {
        withStartIndices: true
    };
    var handler = new DomHandler(handlerOption);

    // create parser with dom-handler
    var parser = new Parser(handler, options);

    parser.handler = handler;

    // make parser emittable
    for (var method in emitterMethods) {
        if (emitterMethods.hasOwnProperty(method)) {
            parser[method] = emitterMethods[method];
        }
    }

    // do wrap parser handlers to emit event
    var cbs = Parser.prototype;
    var wrapHandler = function (name, handler) {
        name = name.slice(2);
        return function (arg) {
            parser.emit(name, arg);
            return handler.call(this, arg);
        };
    };
    for (var name in cbs) {
        if (cbs.hasOwnProperty(name) && name.indexOf('on') === 0) {
            parser[name] = wrapHandler(name, parser[name]);
        }
    }

    return parser;
};

// parse given html content to document object
var parse = function (htmlCode, parser) {
    // get parser
    parser = parser || getParser();

    // replace "\r\n" with "\n"
    htmlCode = htmlCode.replace(/\r\n/g, '\n');

    // do parse
    parser.end(htmlCode);

    // wrap dom with <document>
    var document = wrapDocument(parser.handler.dom);

    return document;
};

parse.getParser = getParser;

module.exports = parse;
