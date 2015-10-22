/**
 * @file command: format
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var helper = require('./helper');
var htmlcs = require('../../');

module.exports = {
    name: 'format',
    describe: 'Do format given file(s)',
    examples: [
        ['$0 format foo.html', 'do format foo.html'],
        ['$0 format foo.html bar.html', 'do format foo.html & bar.html'],
        ['$0 format ./', 'do format html files under ./']
    ],

    handler: function (options, targetFiles) {
    	// hint directly
        var format = htmlcs.formatFile;

        // specified config
        if (options.config) {
            var config = helper.loadSpecifiedConfig(options.config);
            format = function (filePath) {
                return htmlcs.format(helper.readFile(filePath), config);
            };
        }

        targetFiles.forEach(function (filePath) {
            var result = format(filePath);

            if (options['in-place']) {
            	fs.writeFileSync(filePath, result);
            	console.log('√', filePath);
            }
            else {
    			console.log(result);
            }
        });
    }
};
