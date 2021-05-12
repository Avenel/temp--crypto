import crypto from 'crypto';

const message = 'Hello';
const sharedSecret = 'password';


// Calculating a hash the normal way
const hashAlgorithm = crypto.createHash('sha256');

hashAlgorithm.update(message);

const hash = hashAlgorithm.digest('hex');

console.log(hash);


// Calculating an HMAC (a hash-based message authentication code)
const hmacAlgorithm = crypto.createHmac('sha256', sharedSecret);

hmacAlgorithm.update(message);

const hmac = hmacAlgorithm.digest('hex');

console.log(hmac);
