var _ = require('lodash');

module.exports = Criteria;

function Criteria(patterns) {

    if (!(this instanceof Criteria)) return new Criteria(patterns);

    var patterns = patterns || {};

    this.matches = function(document) {
        return ! _.find(patterns, mismatch.bind(this, document));
    };

    function mismatch(document, pattern, property) {
        if (document[property] == undefined) return false;
        if (document[property] != document[property]) return true; // NaN
        return !(new RegExp(pattern).test(document[property]));
    };
}
