# core 

[![npm](https://img.shields.io/npm/v/@easy-cipher/core.svg)](https://www.npmjs.com/package/@easy-cipher/core)
[![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/@easy-cipher/core)](https://bundlephobia.com/result?p=@easy-cipher/core)
[![no external dependencies](https://badgen.net/bundlephobia/dependency-count/@easy-cipher/core)](https://bundlephobia.com/result?p=@easy-cipher/core)

`core` is a string mapping library. The idea  behind this package was to give customization to almost everything in the library, therefore almost any piece of code depends of constants (More on it later on).

## Basic usage

Without any customizations, `core` can be used as is.

```ts
const sentence = 'abc';
const cipher = 'def';
const { encode, decode } = core({
  mappings: {
    a: 'd',
    b: 'e',
    c: 'f',
  },
});

encode(sentence);
// Returns 'def'

decode(cipher);
// Returns 'abc'
```

## encode & decode

`encode` is a function returned from calling `core` function. It takes a string to encode and optionally a configuration object. So far, the configuration object consists of one field called `throwOnUnknownCharacters`, which is boolean value. The name is quite descriptive, during encoding if there's no suitable mapping for a character, then the error would be thrown. If you don't wanna throw error on unknown characters, set this option to false (It's true by defualt). 

`decode` is almost the same with this distinction that, it will use reversed mappings and it will throw if there's no matching character for a ciphertext. The option name is the same: `throwOnUnknownCharacters`.

## Customization

`core` has many optional configuration fields, really useful especially when dealing with things such as [morse code package](https://www.npmjs.com/package/@easy-cipher/morse). The `core` library has the following options.

```ts
type CoreOptions = {
  mappings: Record<string, string>;
  ciphertextWordsSeparator?: string;
  ciphertextCharactersSeparator?: string;
  plaintextWordsSeparator?: string;
  plaintextCharactersSeparator?: string;
};
```
### plaintextWordsSeparator & plaintextCharactersSeparator

These options specify the library should divide a string to encode it. The core library will split the input string by `plaintextWordsSeparator` and then it will split words to characters by `plaintextCharactersSeparator`. The last step is mapping character to ciphertext. You can control these parameters to your desire. By default `plaintextWordsSeparator` is a single space ` ` and a `plaintextCharactersSeparator` is an empty string ``.

### ciphertextWordsSeparator & ciphertextCharactersSeparator

During encoding after the characters are mapped to cipher, the cipher is joined, firstly by a `ciphertextCharactersSeparator` and then by `ciphertextWordsSeparator`. Decoding is reversed process.

Take a look for a example for a better understanding.


```ts
const sentence = 's o m e / s t r a n g e / f e a t u r e';
const notReallyACipher = 'some strange feature';

// ceaser is using core under the hood
const { encode, decode } = caesar({
  encryptionOffset: 0,
  plaintextWordsSeparator: ' / ',
  plaintextCharactersSeparator: ' ',
  ciphertextWordsSeparator: ' ',
  ciphertextCharactersSeparator: '',
});

encode(sentence);
// Returns 'some strange feature'

decode(notReallyACipher);
// Returns 's o m e / s t r a n g e / f e a t u r e'
```
