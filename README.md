# stream-ts

A type-safe implementation of streams in TypeScript 

## Install
```sh
npm install @davidszell/stream-ts
```

## Example

```js
Stream
  .fromArray[1, 2, 3, 4, 5, 6]
  .filter(item => item % 2 === 0)
  .filter(item => item > 3)
  .map(item => item.toSting())
  .first() // => '4'
```

## See also
  - [API documentation](API.md)