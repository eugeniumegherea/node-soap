
import * as crypto from 'crypto';

export function passwordDigest(nonce: string, created: string, password: string): string {
  // digest = base64 ( sha1 ( nonce + created + sha1(password) ) )
  const sha1 = crypto.createHash('sha1');
  sha1.update(nonce);
  sha1.update(created);
  const pwSha1 = crypto.createHash('sha1');
  pwSha1.update(password);
  sha1.update(pwSha1.digest());
  return sha1.digest('base64');
}

export const TNS_PREFIX = '__tns__'; // Prefix for targetNamespace

/**
 * Find a key from an object based on the value
 * @param {Object} Namespace prefix/uri mapping
 * @param {*} nsURI value
 * @returns {String} The matching key
 */
export function findPrefix(xmlnsMapping, nsURI) {
  for (const n in xmlnsMapping) {
    if (n === TNS_PREFIX) { continue; }
    if (xmlnsMapping[n] === nsURI) {
      return n;
    }
  }
}

export function splitQName<T>(nsName: T) {
  if (typeof nsName !== 'string') {
    return {
      prefix: TNS_PREFIX,
      name: nsName,
    };
  }

  const [topLevelName] = nsName.split('|');

  const prefixOffset = topLevelName.indexOf(':');

  return {
    prefix: topLevelName.substring(0, prefixOffset) || TNS_PREFIX,
    name: topLevelName.substring(prefixOffset + 1),
  };
}
