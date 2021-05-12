# Cryptography, part 1

- kryptos = secret, graphein = to write
- Goal: Keep written things secret (e.g., messages)

- Link to samples
  - https://github.com/thenativeweb/temp--crypto

## Caesar encryption

- Plain text (aka original message), e.g. "HELLO"
- Encrypt function: e(p, k) => c
- Cipher text (encrypted message)
- Decrypt function: d(c, k) => p
- d(e(p)) = p, d and e wipe each other out

```
   ABCDEFGHIJKLMNOPQRSTUVWXYZ  (+3)
ABCDEFGHIJKLMNOPQRSTUVWXYZ

becomes (using wrap-around):

ABCDEFGHIJKLMNOPQRSTUVWXYZ
DEFGHIJKLMNOPQRSTUVWXYZABC
```

- HELLO => KHOOR

- Algorithm: Shifting the alphabet
- Key: A parameter to the algorithm which affects how the algorithm works

- Alice: Sender, Bob: Receiver, Eve: Attacker

- KHOOR
- Only 26 possible options for the key
- Trying all possible options: Brute force

## Extended Caesar encryption

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
JRVELNAQBZCOPTS...
```

- HELLO => QLOOS

- Alphabet, shuffled randomly
- A: 26 options, B: 25 options, C: 24 options, …, Z: 1 option
- 26 * 25 * 24 * ... * 1 = 26!
  - Looks pretty good at first sight, not attackable that easy by brute force :-)

- Statistical analysis of the cipher text, which letter appears how often
  - E by far the most often character, 2nd place is N, …, X and Y are very rare

- IMPORTANT #1: Repetition is bad! Avoid patterns at all costs!
- IMPORTANT #2: Kerckhoff's Law: Don't invent your own crypto

## Key exchange

- Alice => Bob
- Both have to know the same key
  - If there is a secure way for transferring the key, you don't need encryption.
  - If there isn't, then how to transfer the key?

```
Alice --------- Bob
  |      \ /     |
  |       X      |
  |      / \     |
Charlie ----- Denise
```

- 2 people: 1 key
- 3 people: 3 keys (+2)
- 4 people: 6 keys (+3)
- 5 people: 10 keys (+4)
- 6 people: 15 keys (+5)

- Number of keys for N persons = SUM(1..N) = (n * (n-1)) / 2
- 23 people => 253 keys, gets too large too quickly

## Crypto currency

- Such as Bitcoin, Litecoin, Ripple (XRP), Dogecoin, …
- Built on "block chain"
- Digital currency, built on cryptographic patterns

- Block chain
  - Chain of blocks (obvious)
  - Chain = Array, or a single-linked list
  - Block = Data structure, contains transactions
  - Transaction = Single piece of data which describes sending money
  - Mining = Process of calculating a hash for a block where the hash starts with a specific pattern
  - Proof of work = Process of finding a suitable nonce for mining

```shell
# Install dependencies (once)
$ npm install

# Run the block chain application
$ npx ts-node app.ts
```

## Hash functions

```
hash(data) => fingerprint
```

- Easy to get the fingerprint from the data
- Can not be reversed, i.e. you can not restore the data from the fingerprint
- Different data should lead to different fingerprints
- Hashes have fixed lengths (depends on the specific algorithm)
- It should be very, very hard to build collisions in a directed way

```
Username | Password (Hash)
---------|-----------------
Jane     | 59a0d954ba69
John     | 296256f4d474
```

- Rainbow tables
  - Lists of words in dictionaries with their appropriate hashes
  - aardvark => bb35f76ea08f, abigail => 43919b23eee2, …, secret => 59a0d954ba69 …, zyxel => 7fef4047f67c

```
Username | Salt | Password (Salted + Hashed)
---------|------|------------------------------
Jane     | fa76 | add846a5ab90
John     | df13 | 296256f4d474
```

- Ready-made hash functions
  - MD (Message Digest)
    - MD 4
    - MD 5
  - SHA (Secure Hash Algorithm)
    - SHA 1
    - SHA 2 (use one of them!)
      - SHA 256
      - SHA 384
      - SHA 512
    - SHA 3 (for future)
- Password encryption functions (should be password hashing functions)
  - pbkdf2
  - bcrypt
  - scrypt (you may use this one)

## Random numbers

```javascript
console.log(Math.random()); // 0..0.9999999…
```

- PRNG, pseudo-random number generator
  - They create patterns, hence they are not suited very well for cryptography

- "Real" randomness
  - Based on hardware behavior, such as voltage, temperature, noise, …
  - "Cryptographically secure random number generators"
  - CSRNG

## The perfect encryption

- Caesar applied to a single letter

- Cipher text: `T`
  - We don't have any repetition any more => we don't have any patterns
  - Brute forcing doesn't work, because we can't say whether e.g. `F` is correct or not
  - Statistical analysis doesn't work, because we don't have any patterns

```
H   E   L   L   O
+1  +7  +3  +4  +17    <-- randomly chosen
I   L   O   P   F
```

- Eve receives `ILOPF` … "what could that be?"
  - Eve will get the correct answer, but also *all* incorrect ones
  - And she will not be able to tell the difference between the correct and the wrong ones

- This works if:
  - The key must absolutely be true random
  - The key must be as long as the text to encrypt (pad)
  - The key must only be used once (one-time)

```
=> One-time pad (OTP)
```

- It is said to be actually being used
  - Government, military, …
  - The idea here is: Having code books (i.e. books with random numbers on their pages)

## Interims summary

- Encryption (weak, perfect)
  - Key exchange
  - Not practical
- Hash functions
  - Ensuring integrity
  - How to avoid simply recalculating the hash?
- Random numbers
  - Pseudo-random number generator (PRNGs)
  - Cryptographically secure random number generators (CSRNGs)

- Open questions
  - How to protect hashes?
  - How to encrypt in reality?
  - How to solve the key exchange problem?
  - How to sign things (i.e. digital signatures)?
  - How does all this relate to the internet with certificates & co.?

## Detecting tempering within hashes

```
message: Hello
hash:    89af4e8609864d90b37d76c24b643033

message': Hallo
hash:     618ee44f319f486eaef6a7e2b92799e3
```

- Message Authentication Code (MAC)
  - HMAC: Hash-based message authentication code

```
message:               Hello
secret:                password
hash(message+secret):  855e15163c9e438bb27f576ed7a94ef1

message':              Hallo
hash(message'+secret): ?
```

## Modern encryption algorithms

- DES (Data Encryption Standard)
  - Don't use that ;-)
- 3DES (Workaround, 3x DES in a row)
  - Don't use that ;-)
- NIST (National Institute for Standards in Technology)
  - Competition: Find a better algorithm than (3)DES
  - AES (Advanced Encryption Standard)
    - Block cipher (meaning it encrypts multiple characters at once (a so-called block))
    - AES-128, AES-192, AES-256
      - Don't use the former two, only use the latter one (AES-256)
    - Each block is encrypted on its own
      - ECB mode (= Electronic Code Book)
    - Alternatively: Each block is encrypted based on its own data and its predecessor's encryption result
      - CBC mode (= Cipher Block Chaining)
      - Needs a random IV (= initialization vector), which acts as block 0, so that the first block has a predecessor
      - CBC mode is *highly* to be preferred over the ECB mode

=> Use `AES-256-CBC`

```
ECB example

  12 12 12 12 12 12 12
  my  n am e  is  a my
|
v
  ft gu ab cz lo vt ft    (<- cipher text)

  => Patterns from the plain text leak through to the cipher text
     => Prone to statistical analysis



CBC example

 iv         12         12         12         12         12         12         12
            my          n         am         e          is          a         my
|         my^fr      ji^ n       ...                             re^ a      tz^my
v
 fr         ji         hu                                          tz         bv

  => Patterns from the plain text do not leak through any more to the cipher text
    => Not prone to statistical analysis
```

- A visual hint on why ECB is a bad idea ;-)
  - https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_codebook_(ECB)


## Diffie-Hellman Key Exchange (DH)

Alice                                                 Bob

Secret color: Red                                     Secret color: Blue
Public color: Yellow  ----------------------------->  Public color: Yellow

Red + Yellow => Orange                                Blue + Yellow => Green
                   \                                                    /
                    ------------------------------->  Orange           /
                Green  <----------------------------------------------

Red + Green =                                         Blue + Orange =
Red + Blue + Yellow =                                 Blue + Red + Yellow =
Ugly brown ;-)                                        Ugly brown ;-)

                          Yellow, Orange, Green
                Yellow + Orange => Blue missing, too much Yellow
                Yellow + Green => Red missing, too much Yellow
                Orange + Green => Too much Yellow
                ...


- One-way functions, Trap-door functions
  - Functions that are easy to calculate in one direction
  - But (almost) impossible to calculate in the opposite direction

- 37 * 41 = 1517   (multiplying two primes is easy)
- 1517 = X * Y     (this is hard, takes a very long time)

- Logarithm is *not* a trap-door function
  - 2 ^ 3 = 8                        (taking a number to a power is easy)
  - 2 ^ x = 8    =>   log2(8) => 3   (taking the logarithm is easy as well)
- But the discrete logarithm is a trap-door function
  - 2 ^ 3 mod 5 = 3                  (easy)
  - 2 ^ x mod 5 = 3                  (this is hard, takes a very long time)


Alice                                 Bob

a = 2 (secret)                        b = 3 (secret)
                g = 2, p = 5 (public)

A = g ^ a mod p                       B = g ^ b mod p
  = 2 ^ 2 mod 5                         = 2 ^ 3 mod 5
  = 4                                   = 3 --\
     \                                        |
      ------------------------------> A = 4   |
B = 3 <---------------------------------------/

B = g ^ b mod p                       A = g ^ a mod p

=> B ^ a mod p                        => A ^ b mod p
   (g ^ b mod p) ^ a mod p               (g ^ a mod p) ^ b mod p
   (g ^ b) ^ a mod p                     (g ^ a) ^ b mod p

   B ^ a mod p                           A ^ b mod p
   3 ^ 2 mod 5 = 4                       4 ^ 3 mod 5 = 4

Hint: g ^ b ^ a = g ^ a ^ b


## Encryption algorithms

- What do
  - Caesar
  - DES
  - 3DES
  - AES
- have in common?

=> Symmetric encryption
  - Because the *same* key is being used for encrypting and for decrypting things


## Asymmetric encryption

Alice                           Bob
                                Key (secret)
                                Padlock (public)

<------------------------------ Box + padlock
Message + box + padlock ------> Only Bob can open the box



Alice                                 Bob
- Private key (Alice)                 - Private key (Bob)
- Public key (Alice)                  - Public Key (Bob)

encrypt(Message, publicKeyBob) -----> decrypt(encryptedMessage, privateKeyBob)


- RSA algorithm (Rivest, Shamir, Adleman)
  - It works using a public and a private key pair
  - This solves the key exchange problem


### Let's reverse it ;-)

encrypt(Message, privateKeyAlice) --> decrypt(encryptedMessage, publicKeyAlice)

  2. It must come from Alice (Signature)
   |
   |    1. Only Bob can read it (Encryption)
   |       |
   v       v
encrypt(encrypt(message, publicKeyBob), privateKeyAlice) ----> ...
... ----> decrypt(decrypt(message, publicKeyAlice), privateKeyBob)
             ^       ^
             |       |
             |   1. It was actually sent by Alice (Verifying signature)
             |
          2. Only Bob can read it (Decryption)


### A few drawbacks

- Asymmetric algorithms are dramatically slow (10.000x slower than symmetric)
- It requires very large prime numbers, 1024 bit (do not use it), 2048 bit, 4096 bit
- You can only use it for very short messages (i.e. 200 to 300 bytes)


### The solution – a hybrid between symmetric and asymmetric encryption

encryptAES(message, randomKey) => encryptedMessage
encryptRSA(randomKey, publicKeyReceiver) => encryptedRandomKey

Alice => (encryptedMessage, encryptedRandomKey) => Bob

decryptRSA(encryptedRandomKey, privateKeyReceiver) => randomKey
decryptAES(encryptedMessage, randomKey) => message


### There's a new kid in town

- RSA is a little bit outdated
- ECC (Elliptic Curve Cryptography)

- Linear equation:      y = m * x + b
- Polynomial equations: y = x ^ 2 + a * x + b
- Elliptic curve:       y ^ 2 = x ^ 3 + a * x + b


- Idea: NIST standardizes `a` and `b` for elliptic curves, so that everyone can work on the same curve
  - What should have happened: Take some arbitrary values for `a` and `b` and fix them
  - What instead has happened: a = 0.42367423786487632764587, b = -1.326764328768463


## A look at HTTPS

Client ---------------------> Server
                                Private key
                                Certificate = (Public key + Domain name)
                                  Digital signature by a trustworthy third party
                                  To verify: Public key of trustworthy third party
                                    Their public key: Digital signature by a trustworthy fourth party
                                    To verify: Public key of trustworthy fourth party
                                      ...

- 2 Requirements
  - The communication should be encrypted
    - Use DHKE (or something similar) to figure out a shared key
    - Use AES to encrypt the entire communication
    - This is good, but doesn't protect against MITM (Man it the middle) attacks
  - The server's identity should be verified
    - Using a digital signature, this should be easy for the server
    - This means the server needs a private and a public key pair

Server -> Certificate <- CA (Certificate Authority)
                          Certificate <- CA (Certificate Authority)
                                          Certificate <- CA (Certificate Authority)
                                                          Certificate <- Root Certificate Authority


### Securing a server

- Setting up a private / public key pair (`.pem`)
- Add desired metadata to the public key, now you need a digital signature by a CA
  - Bundle public key and metadata into a certificate signing request (CSR)
  - You send the CSR to a CA
- CA verifies that you are who you pretend to be in the metadata of the CSR
  - If you can not be verified, they deny the CSR
  - If you be verified successfully, the sign the CSR and this way turn it into a signed certificate
    - They send the certificate back to you
- You delete the public key, and store the certificate file on the server

- Mozilla created a free CA called "Let's Encrypt"
  - Works fully automated
  - Certificates expire after 90 days
  - Meanwhile lots of other companies help to back LE
  - However, works only for public resolvable domain names

- For internal servers
  - Option 1
    - Create a private+public key, create a CSR, sign the CSR with *your own* private key
    - This is some kind of self-referencing certificate, which signs itself
    - "Self-signed certificate", insecure, not valid, but it works for testing purposes
  - Option 2
    - Run your own certificate authority (CA)
    - You can add your own CA's certificate as a root certificate to your devices
    - You need a software such as LE to run internally, e.g. *Vault* by Hashicorp
    - Be careful here, whom you trust … there may be dragons ;-)


## Summary

- Encryption
  - Symmetric encryption (AES-256-CBC)
  - Asymmetric encryption (RSA-2048, ECC)
    - Hybrid encryption with AES
    - Digital signatures
- Key exchange (Diffie-Hellman)
- Hashing (SHA2)
  - MACs (HMAC)
- Random numbers
  - Pseudo random
  - Cryptographically secure random

- Application
  - Certificates + HTTPS
    - Symmetric encryption, digital signatures, hashes
  - Encrypting + signing mails
    - Symmetric encryption, asymmetric encryption, digital signatures
  - Safe storage
    - Symmetric encryption
  - Detect broken downloads
    - Hashing
  - Safe communication across an untrusted network (VPN)
    - Symmetric encryption, asymmetric encryption
  - …
