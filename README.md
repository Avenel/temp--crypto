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
  - How to encrypt in reality?
  - How to solve the key exchange problem?
  - How to protect hashes?
  - How to sign things (i.e. digital signatures)?
  - How does all this relate to the internet with certificates & co.?
