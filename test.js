const { encryptMessage } = require('./server');
const { executeBeastAttack } = require('./attacker');

function runTest(messageSetSize) {
    console.log(`Running BEAST attack test with ${messageSetSize} known messages...`);
    
    const crypto = require('crypto');

const knownMessages = Array.from({ length: messageSetSize },() => crypto.randomBytes(16));
    
    const realMessageIndex = Math.floor(Math.random() * knownMessages.length);
    const realMessage = knownMessages[realMessageIndex];

    const { wantedIv, leakedCipherText} = encryptMessage(realMessage);
    
    
    console.log(`Real Message Index: ${realMessageIndex}`);
    console.log(`Wanted IV: ${wantedIv.toString('hex')}`);
    console.log(`Leaked Ciphertext: ${leakedCipherText.toString('hex')} \n`);
    
    const guessedIndex = executeBeastAttack(knownMessages, wantedIv, leakedCipherText, leakedCipherText);
    
    console.log(`Final Result - Real Message Index: ${realMessageIndex}`);
    console.log(`Attack Successful: ${realMessageIndex === guessedIndex}`);
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const messageSetSize = args[0] ? parseInt(args[0], 10) : 2;
    runTest(messageSetSize);
}
