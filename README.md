# NFC cold wallet for Kusama

## Project Description
The aim of this project is to build a solution for storing wallet seed securely offline by using NFC tags and industry standard cryptography and encryption.

## Why NFC?
- NFC or Near-Field-Communication is a set of communication protocols for communication between two electronic devices over a distance of 4 cm or less.
Very similar to RFID, but a disadvantage of RFID is that it can be read from a distance, which makes them unsuitable for storing sensitive data.

- NFC tags are passive devices, which means that they operate without a need of power supply of their own and are dependent on an active device to come into range before they are activated. (such as smartphones)

- All the new mobile phones are equipped with NFC readers today which makes them an ideal candidate for broader adoption.

## Some considerations before using NFC tags and choosing the right NFC
- Memory size required?
- Encryption - Choose a chip which allows encryption
- Data retention - Standard chips can have a lifespan of 10-15 years, but special chips can have a lifespan of up to 200 years.
- Password lock - By default the NFC chips are rewritable, but can be set to read-only mode (after data is written), also password-lock mode can be used if the data needs to be changed again in the future).
- Durability - NFC chips are be durable to heat, waterproof and shock resistant

More details here: https://www.shopnfc.com/en/content/11-nfc-guide
