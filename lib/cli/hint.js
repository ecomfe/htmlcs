/**
 * @file command: hint
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var helper = require('./helper');
var htmlcs = require('../../');

var output = function (filePath, result) {
    console.log(filePath + ':');
    if (result.length) {
        result.forEach(function (item) {
            console.log('[%s] line %d, column %d: %s (%s, %s)', item.type, item.line, item.column, item.message, item.rule, item.code);
        });
    }
    else {
        console.log('No hint result.');
    }
    console.log('');
};

module.exports = {
    name: 'hint',
    describe: 'Do hint given file(s)',
    examples: [
        ['$0 hint foo.html', 'do hint foo.html'],
        ['$0 hint foo.html bar.html', 'do hint foo.html & bar.html'],
        ['$0 hint ./', 'do hint html files under ./']
    ],

    handler: function (options, targetFiles) {
        // hint directly
        var hint = htmlcs.hintFile;

        // specified config
        if (options.config) {
            var config = helper.loadSpecifiedConfig(options.config);
            hint = function (filePath) {
                return htmlcs.hint(helper.readFile(filePath), config);
            };
        }

        targetFiles.forEach(function (filePath) {
            output(
                filePath,
                hint(filePath)
            );
        });
    }
};
