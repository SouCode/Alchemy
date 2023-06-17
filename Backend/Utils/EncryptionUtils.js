const crypto = require('crypto');
const keys = require('./keys.json');

const encrypt = (text) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(keys.encryptionKey, 'hex'), Buffer.from(keys.encryptionIV, 'hex'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) {
    return null;
  }
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keys.encryptionKey, 'hex'), Buffer.from(keys.encryptionIV, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
