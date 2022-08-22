# caesar

[![npm](https://img.shields.io/npm/v/@easy-cipher/caesar.svg)](https://www.npmjs.com/package/@easy-cipher/caesar)
[![npm bundle size (minified + gzip)](https://badgen.net/bundlephobia/minzip/@easy-cipher/caesar)](https://bundlephobia.com/result?p=@easy-cipher/caesar)
[![no external dependencies](https://badgen.net/bundlephobia/dependency-count/@easy-cipher/caesar)](https://bundlephobia.com/result?p=@easy-cipher/caesar)

`caesar` package is caesar cipher algorithm built on the `core` package which is responsible for mapping strings, thus the implementation of the package has to be compatible with `core` API. The idea  behind this package was to give customization to almost everything in the library, therefore almost any piece of code depends of constants (More on it later on).

## Basic usage

Without any customizations, `caesar` can be used as is.

```ts
const sentence = 'friday is best day of the week';
const { encode } = caesar({ encryptionOffset: 3 })

const result = encode(sentence);
// Returns 'iulgdb lv ehvw gdb ri wkh zhhn'
```

Decoding the cipher is also a piece of cake

```ts
const cipher = 'iulgdb lv ehvw gdb ri wkh zhhn';
const { decode } = caesar({ encryptionOffset: 3 })

const result = decode(cipher);
// Returns 'friday is best day of the week'
```

### Caveat

Keep in mind that every time you call `caesar`, all mappings are created dynamically, so if you wanna call it often with dynamic offset, you should use memoization wrapper around `caesar`.

## encode & decode

`encode` & `decode` functions comes from the [core package](https://www.npmjs.com/package/@easy-cipher/core).

## Customization

`caesar` has a `alphabet` property in configuration object. The defualt `alphabet` used is english alphabet. If you wanna to overwrite the default `alphabet`, just pass the array of chars as a alphabet property.

```ts
const polishAlphabet = 'aąbcćdeęfghijklłmnńoópqrsśtvwxyzźż'.split('');
const { encode } = caesar({ encryptionOffset: 3, alphabet: polishAlphabet });

const sentence = 'w piątki wychodzę na spacery';
const result = encode(sentence);
// Returns 'z slćxml zżekqfah óc vscegtż'
```

### Caveat

If you wanna also encode upper-case letters, you have to convert it to lowercase (The defualt mappings cover just lowercase letters).

```ts
const polishAlphabet = 'aąbcćdeęfghijklłmnńoópqrsśtvwxyzźż'.split('');
const { encode } = caesar({ encryptionOffset: 3, alphabet: polishAlphabet });

const sentence = 'W Piątki Wychodzę na Spacery';
const result = encode(sentence.toLocaleLowerCase());
// Returns 'z slćxml zżekqfah óc vscegtż'
```

Currently support for unicode characters may be difficult, because of using `split` Array method.

### Other customizations

Other customizations are available and are described in the [core package](https://www.npmjs.com/package/@easy-cipher/core) in deep.