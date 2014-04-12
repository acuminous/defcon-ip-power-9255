var EventEmitter = require('events').EventEmitter;
var async = require('async');
var request = require('request');
var _ = require('lodash');
var format = require('util').format;

module.exports = IpPower9255;

IpPower9255.prototype = Object.create(EventEmitter.prototype);

function IpPower9255() {

    if (!(this instanceof IpPower9255)) return new IpPower9255(options);

    var states = { on: 1, off: 0 }
    var self = this;

    this.send = function(config) {
        var url = _.reduce(config.outputs, function(url, output) {
            return url + format('+p6%d=%d', output, states[config.state]);
        }, format('%s/set.cmd?user=%s+pass=%s+cmd=setpower', config.baseUrl, config.username, config.password));
        var start = new Date();
        request.get(url, { headers: { 'Connection': 'keep-alive' }}, function(err, response, body) {
            if (err) return self.emit('error', err);
            if (/^2/.test(response.statusCode)) return;
            var err = new Error(format('IpPower9255 returned %s from %s', response.statusCode, url));
            self.emit('error', err);
        });
    };
};