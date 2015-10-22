/**
 * @file cli methods
 * @author nighca<nighca@live.cn>
 */

module.exports = {

    commands: [
        require('./hint'),
        require('./format')
    ],

    options: [
        {
            name: 'i',
            alias: 'in-place',
            describe: 'Edit input files in place; use with care!'
        },
        {
            name: 'c',
            alias: 'config',
            describe: 'Path to custom configuration file.'
        }
    ],

    helper: require('./helper')
};
