# BEAST Attack Demonstration

This project provides a simplified simulation of the BEAST (Browser Exploit Against SSL/TLS) attack. BEAST exploits a vulnerability in CBC-mode encryption used in SSL/TLS 1.0, allowing an attacker to guess plaintext bytes by controlling the initialization vector (IV) and observing predictable ciphertext output.

## Overview

In this implementation:

- The server encrypts a chosen message using AES-128-CBC and leaks the first ciphertext block (simulating early SSL behavior).
- The attacker attempts to recover the plaintext by brute-forcing a set of known possible messages.
- The known-plaintext attack leverages the predictability of IVs and CBC properties to identify the correct message.

> This is a simplified educational model of the BEAST attack, not a full browser-based exploit.

## File Structure

- `server.js` – Simulates a TLS server encrypting messages in CBC mode.
- `attacker.js` – Contains the BEAST attack logic to deduce which message was encrypted.
- `test.js` – Runs a test scenario using a list of known messages and triggers the attack.

## How to Run

### 1. Install Node.js (if not already installed)
Download and install from: https://nodejs.org

### 2. Clone the repository or place the files together
Ensure the files `server.js`, `attacker.js`, and `test.js` are in the same directory.

### 3. Run the attack
From a terminal, navigate to the directory and run:
```bash
node test.js
```
This runs the BEAST attack simulation with the default value of 2 known messages, allowing for a fast and minimal test run.

If you want to try with a larger set of known messages (e.g., 10), run:

```bash
node test.js 10
```
This will simulate the attack with 10 random known messages and test whether the attacker can recover the correct one.

### 4. What to Expect - (Output)
You’ll see logs showing:
- The real message index
- The IV and leaked ciphertext
- Each guessed message and comparison
- Whether the attack successfully identified the correct plaintext