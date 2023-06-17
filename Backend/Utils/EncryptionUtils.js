const crypto = require('crypto');

const encryptionKey = process.env.ENCRYPTION_KEY;
const encryptionIV = process.env.ENCRYPTION_IV;

const encrypt = (text) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(encryptionIV, 'hex'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) {
    return null;
  }

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(encryptionIV, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt };
