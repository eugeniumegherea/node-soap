"use strict";
exports.__esModule = true;
var crypto = require("crypto");
function passwordDigest(nonce, created, password) {
    // digest = base64 ( sha1 ( nonce + created + sha1(password) ) )
    var sha1 = crypto.createHash('sha1');
    sha1.update(nonce);
    sha1.update(created);
    var pwSha1 = crypto.createHash('sha1');
    pwSha1.update(password);
    sha1.update(pwSha1.digest());
    return sha1.digest('base64');
}
exports.passwordDigest = passwordDigest;
exports.TNS_PREFIX = '__tns__'; // Prefix for targetNamespace
/**
 * Find a key from an object based on the value
 * @param {Object} Namespace prefix/uri mapping
 * @param {*} nsURI value
 * @returns {String} The matching key
 */
function findPrefix(xmlnsMapping, nsURI) {
    for (var n in xmlnsMapping) {
        if (n === exports.TNS_PREFIX) {
            continue;
        }
        if (xmlnsMapping[n] === nsURI) {
            return n;
        }
    }
}
exports.findPrefix = findPrefix;
function splitQName(nsName) {
    if (typeof nsName !== 'string') {
        return {
            prefix: exports.TNS_PREFIX,
            name: nsName
        };
    }
    var topLevelName = nsName.split('|')[0];
    var prefixOffset = topLevelName.indexOf(':');
    return {
        prefix: topLevelName.substring(0, prefixOffset) || exports.TNS_PREFIX,
        name: topLevelName.substring(prefixOffset + 1)
    };
}
exports.splitQName = splitQName;
//# sourceMappingURL=utils.js.map