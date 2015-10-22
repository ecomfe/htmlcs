/**
 * @file translate element context & content info
 * @author nighca<nighca@live.cn>
 */


var fs = require('fs');
var Crox = require('crox-p');

var elements = require('./elements.json');
var tpl = fs.readFileSync('./nest-rules.js.tpl', 'utf-8');

global.crox = {
    helpers: {
        json: function (o) {
            return JSON.stringify(o);
        }
    }
};

var types = [

    {
        pattern: /^where ([\w\- ]+) (is|are) expected$/,

        process: function (content, pattern) {
            return {
                type: 'is',
                content: pattern.exec(content)[1]
            };
        }
    },

    {
        pattern: /^inside ([\w ]+)/,

        process: function (content, pattern) {
            return {
                type: 'inside',
                content: pattern.exec(content)[1]
            };
        }
    },

    {
        pattern: /^\w+ content$/,

        process: function (content, pattern) {
            return {
                type: 'is',
                content: content
            };
        }
    }

];

var typo = function (content) {
    for (var i = 0, l = types.length, type; i < l; i++) {
        type = types[i];
        if (type.pattern.test(content)) {
            return type.process(content, type.pattern);
        }
    }

    return {
        type: 'raw',
        content: content
    };
};


var transform = function (element) {
    element.categories = element.categories.map(function (category) {
        return '\'' +  category.replace(/\'/g, '\\\'') + '\'';
    }).join(', ');
    element.contexts = element.contexts.map(typo);
    element.content = element.content.map(typo);
};

for (var key in elements) {
    if (elements.hasOwnProperty(key)) {
        transform(elements[key]);
    }
}

var render = Crox.compile(tpl);
var output = render({
    rules: elements
});

fs.writeFileSync('./nest-rules.js', output);
