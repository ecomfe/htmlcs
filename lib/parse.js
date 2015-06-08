/**
 * @file parse code
 * @author nighca<nighca@live.cn>
 */

var emitter = require('events').EventEmitter.prototype;
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

// make parser emittable &
// emit event "xxx" on parser while parser.onxxx called
var emittable = function (parser) {
    // inherits EventEmitter
    for (var method in emitter) {
        if (emitter.hasOwnProperty(method)) {
            parser[method] = emitter[method];
        }
    }

    // emit "xxx" while method "onxxx" called
    var wrap = function (target, name) {
        var origin = target[name];
        var event = name.slice(2);

        return function (arg) {
            target.emit(event, arg);
            return origin.call(this, arg);
        };
    };

    // wrap methods
    for (var name in parser) {
        if (
            typeof parser[name] === 'function'
            && /^on\w+/.test(name)
        ) {
            parser[name] = wrap(parser, name);
        }
    }

    return parser;
};

// get a HTML parser
var getParser = function (options) {
    // handler during parse
    var handler = new DomHandler({
        withStartIndices: true
    });

    // create parser with dom-handler
    var parser = new Parser(handler, options);

    // record handler on parser
    parser.handler = handler;

    return emittable(parser);
};

// parse given html content to document object
var parse = function (htmlCode, parser) {
    // get parser
    parser = parser || getParser();

    // replace "\r\n" with "\n"
    htmlCode = htmlCode.replace(/\r\n/g, '\n');

    // do parse
    parser.end(htmlCode);

    // get dom & wrap it with <document>
    var document = wrapDocument(parser.handler.dom);

    return document;
};

parse.getParser = getParser;

module.exports = parse;
