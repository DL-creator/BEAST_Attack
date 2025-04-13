const crypto = require('crypto');

const key = crypto.randomBytes(16); // AES-128 key
const initialIV = crypto.randomBytes(16);

function encryptMessage(plaintext, iv = initialIV) {
  
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  let encryptedWithOutPadding = encrypted.slice(0, 16);
  

  return { wantedIv: iv, leakedCipherText: encryptedWithOutPadding}; 
}

module.exports = { encryptMessage };