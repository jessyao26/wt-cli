var Chalk = require('chalk');
var Cli = require('structured-cli');
var ConfigFile = require('../../lib/config');


module.exports = Cli.createCommand('set-default', {
    description: 'Set a default profile',
    handler: handleProfileSetDefault,
    options: {
        silent: {
            alias: 's',
            description: 'No output',
            type: 'boolean',
        },
    },
    params: {
        'profile': {
            description: 'Profile to set as default',
            type: 'string',
        },
    },
});


// Command handler

function handleProfileSetDefault(args) {
    var config = new ConfigFile();

    return config.load()
        .tap(function (profiles) {

            if (!profiles[args.profile])
                throw new Cli.error.notFound('Profile `' + args.profile
                    + '` not found');
        })
        .then(config.saveLocalSettings(args.profile))
        .then(function () {
            if (!args.silent) {
                console.log(Chalk.green('Profile `' + args.profile + '` was set as default.'));
            }
        });
}

