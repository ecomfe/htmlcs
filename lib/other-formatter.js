/**
 * @file formatters for non-html content (js, css)
 * @author nighca<nighca@live.cn>
 */

var jformatter = require('jformatter');

module.exports = {

	script: function (content, node, opt, info) {
		var type = node.getAttribute('type');

		// javascript content
		if (!type || type === 'text/javascript') {
			var formatted = jformatter.format(content);

			opt.level++;

			content = formatted.split('\n').map(function (line) {
				return line ? (info.indent(opt) + line) : line;
			}).join('\n');
		}

		return content.replace(/(^\s*\n)|(\n\s*$)/g, '');
	},

	style: function (content, node, opt, info) {
		return content.replace(/(^\s*\n)|(\n\s*$)/g, '');
	}

};