# BEAST Attack Demonstration

This project provides a simplified simulation of the BEAST (Browser Exploit Against SSL/TLS) attack. BEAST exploits a vulnerability in CBC-mode encryption used in SSL/TLS 1.0, allowing an attacker to guess plaintext bytes by controlling the initialization vector (IV) and observing predictable ciphertext output.

## Requirements
- Node.js 

## How To Run The Attack

### 1.
Open a terminal and enter following command:

```bash
node test.js
```

This runs the BEAST attack simulation with the default value of 2 known messages. If you want to try with a larger set of known messages (e.g., 10), run:

```bash
node test.js 10
```
This will simulate the attack with 10 random known messages and test whether the attacker can recover the correct one.

### 2.
You’ll see logs in the output showing:
- A message telling that it runs with how many messages you put in
- The index of the real message
- The wanted IV
- The leaked ciphertext

For each message checked you'll see:
- The leaked ciphertext for this message
- Which message is checked
- The ciphertext of the previous block

It will run until all messages it has found the correct message. When found you'll see:
- Match found! Message Index (the index of the message)
- Final Result - Real Message Index (the index of the message)
