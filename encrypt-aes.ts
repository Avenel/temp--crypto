import crypto from 'crypto';

// Original input data.
const plainText = 'Hello, this is part 2 of our cryptography workshop :-)';
const password = 'This is our super secret password.';



// AES-256-CBC requires a 256 bit (32 bytes) key, and a 128 bit (16 bytes) IV.
// PBKDF2 = Password-based key derivation function, version 2
// In other words, a function to get a key from a password.



// Key setup.
const salt = crypto.randomBytes(256);
const key = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256');

const iv = crypto.randomBytes(16);



// Encryption.
const encryptionAlgorithm = crypto.createCipheriv('aes-256-cbc', key, iv);

let cipherText = encryptionAlgorithm.update(plainText, 'utf8', 'hex');

cipherText += encryptionAlgorithm.final('hex');

console.log(cipherText);



// Decryption.
const decryptionAlgorithm = crypto.createDecipheriv('aes-256-cbc', key, iv);

let resultingText = decryptionAlgorithm.update(cipherText, 'hex', 'utf8');

resultingText += decryptionAlgorithm.final('utf8');

console.log(resultingText);
