var path = require('path');
var _ = require('lodash');
var packageJson = require('./package.json');
var Criteria = require('./lib/Criteria');
var IpPower9255 = require('./lib/IpPower9255');

module.exports.create = create;

function create(context, next) {

    var plugin = {
        version: packageJson.version,
        description: packageJson.description,
        repositoryUrl: packageJson.repository.url
    }

    var logger = context.logger;
    var config = context.config;
    var ipPower9255 = new IpPower9255();

    ipPower9255.on('error', function(err) {
        logger.error(err.message);
    });

    context.defcon.on('event', function(event) {
        _.each(config.rules, function(rule) {
            if (new Criteria(rule.criteria).matches(event)) {
                _.each(rule.sequence, function(cmd) {
                    setTimeout(function() {
                        ipPower9255.send(cmd);
                    }, cmd.offset * 1000);
                })
            }
        });
    });

    next(null, plugin);
}
