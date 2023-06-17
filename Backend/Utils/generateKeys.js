const crypto = require('crypto');
const fs = require('fs');

// Generate a random encryption key
const generateEncryptionKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate a random initialization vector (IV)
const generateInitializationVector = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Generate the encryption key and IV
const encryptionKey = generateEncryptionKey();
const encryptionIV = generateInitializationVector();

// Store the keys in a file
const keys = {
  encryptionKey,
  encryptionIV,
};

fs.writeFileSync('keys.json', JSON.stringify(keys));

console.log('Encryption Key:', encryptionKey);
console.log('Initialization Vector:', encryptionIV);
console.log('Keys saved to keys.json');
