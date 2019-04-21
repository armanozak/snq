# snq (Safe Navigation Query)

[![Bundle Size](https://img.shields.io/bundlephobia/minzip/snq.svg)](https://bundlephobia.com/result?p=snq)
[![Coveralls Coverage](https://img.shields.io/coveralls/armanozak/snq.svg)](https://coveralls.io/github/armanozak/snq)
[![Code Climate Maintainability](https://img.shields.io/codeclimate/maintainability/armanozak/snq.svg)](https://codeclimate.com/github/armanozak/snq/maintainability)
[![Travis Build Status](https://img.shields.io/travis/armanozak/snq.svg)](https://travis-ci.org/armanozak/snq)
[![MIT License](https://img.shields.io/github/license/armanozak/snq.svg)](./LICENSE)
[![Follow the Author on Twitter](https://img.shields.io/twitter/follow/armanozak.svg?label=Follow)](https://twitter.com/armanozak)

**snq** is a utility function to safely navigate arrays and object properties without getting type errors. It is **not an original idea at all** and is actually adapted and only slightly different from [idx](https://github.com/facebookincubator/idx). The main differences are as follows:

- snq returns `undefined` whenever a `TypeError` happens, regardless of the reason for the error and throws an error only if it is not a `TypeError`. idx returns `null`, if the cause of the error is a `null` value and throws an error if the error is not caused by an `undefined` or `null` value.
- snq has an optional second parameter which works as **default value** to return instead of `undefined`.
- idx requires the source object as a first parameter. snq does not.
- idx has a Babel plugin for replacing idx instances with conventional traversing in order to improve performance. Although it is not benchmarked yet, due to lack of reason checks, it is safe to say that snq is faster than idx. Thus, a Babel plugin could prove insignificant for snq.
- snq is written in TypeScript and, unlike idx, it does not support Flow types.

When [optional chaining operator](https://github.com/tc39/proposal-optional-chaining) finally lands, libraries like snq and idx may become redundant.

## Installation

Run the following code in your terminal:

```shell
yarn add snq
```

or if you are using npm:

```shell
npm install --save snq
```

## Setup
```typescript
import snq from 'snq';
```

## Usage

Consider the following interfaces as `products` list:

```typescript
interface Price {
  amount: number;
  currency: string;
  symbol?: string;
}

interface Product {
  id: number;
  name: string;
  inStock: boolean; 
  price?: {
    final: Price;
    original?: Price;
  };
}
```

This is how it would probably look like when you want to get original price symbol of first product:

```typescript
products.length &&
products[0].price &&
products[0].price.original &&
products[0].price.original.symbol
```

Otherwise, you will get a type error. Using `snq`, it is safe to write the following:

```typescript
const symbol = snq(() => this.products[0].price.original.symbol);

// symbol is undefined if a type error happens, actual value if not
```

There is an optional second argument which represents the default value to return when a type error happens.

```typescript
const symbol = snq(() => this.products[0].price.original.symbol, '$');

// symbol is "$" if a type error happens, actual value if not
```

The type of the symbol returned will be inferred as string in both cases.

Check the [demo application](https://stackblitz.com/edit/snq) out.
