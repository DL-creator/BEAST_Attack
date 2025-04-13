const { encryptMessage } = require('./server');

function xorBytes(buffer1, buffer2) {
    const length = Math.min(buffer1.length, buffer2.length);
    const result = Buffer.alloc(length);
    for (let i = 0; i < length; i++) {
        result[i] = buffer1[i] ^ buffer2[i];
    }
    return result;
}

function executeBeastAttack(knownMessages, wantedIv, pastCipherText, originalCipherText) {
    let checkedMessages = [];

    console.log(`The leaked ciphertext result: ${pastCipherText.toString('hex')}`); 
    
    for (const [index, msgBytes] of knownMessages.entries()) {
        console.log(`Checking message: Message ${index}`);
        checkedMessages.push(msgBytes.toString('hex'));
        
        const earlierIVXORLastLeakedCipherText = xorBytes(wantedIv, pastCipherText);
        const modifiedPlainText = xorBytes(earlierIVXORLastLeakedCipherText, msgBytes);

        const {leakedCipherText} = encryptMessage(modifiedPlainText, pastCipherText);
        
        console.log(`Generated ciphertext (hex): ${leakedCipherText.toString('hex')}`);
        console.log(`Comparing against leaked ciphertext (hex): ${pastCipherText.toString('hex')}`);

        if (leakedCipherText.equals(originalCipherText)) {
            console.log(`Match found! Message Index: ${index}`);
            return index;
        }
        
        pastCipherText = leakedCipherText;

    }
    console.log(`All messages checked: ${checkedMessages}`);
    return null;
}

module.exports = { executeBeastAttack };
