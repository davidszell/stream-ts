# API documentation

## first() => `*`

__Returns:__ First item of the stream.

__Throws:__ `Error` - If stream is empty

## isEmpty() => `boolean`

Checks if stream is empty.

__Returns:__ True if stream is empty.

```js
const stream = Stream.fromArray([]);
stream.isEmpty() // => true
```

## toArray() => `*[]`

Collects stream items into an array.

__Returns:__ Array of stream items.

```js
const stream = Stream.fromArray([1, 2, 3])
stream.toArray() // => [1, 2, 3]
```

## filter(predicate) => `Stream`

Filters stream items by predicate.

__Returns:__ Filtered stream.

| Param | Type | Description |
| ----- | ---- | ----------- |
| predicate | function | Predicate function |

```js
const stream = Stream.fromArray([1, 2, 3])
stream.filter(item => item % 2 === 0).toArray() // => [2]
```

## map(mapper) => `Stream`
Maps stream items by mapper.

__Returns:__ Mapped stream.

| Param | Type | Description |
| ----- | ---- | ----------- |
| mapper | function | Mapper function |

```js
const stream = Stream.fromArray([1, 2, 3])
stream.map(item => item * 10).toArray() // => [10, 20, 30]
```

## concat(stream) => `Stream`
Concatenates two streams.

__Returns:__ Concatenated stream.

| Param | Type | Description |
| ----- | ---- | ----------- |
| stream | Stream | Stream to concatenate. |

```js
const stream1 = Stream.fromArray([1, 2, 3])
const stream2 = Stream.fromArray([4, 5, 6])
stream1.concat(stream2).toArray() // => [1, 2, 3, 4, 5, 6]
```

## length() => `number`

__Returns:__ Stream length.

```js
const stream = Stream.fromArray([1, 2, 3])
stream.length() // => 3
```

## reduce(reducer, initalValue) => `*`
Reduces stream items by reducer.

__Returns:__ Reduced value.

| Param | Type | Description |
| ----- | ---- | ----------- |
| reducer | function | Reducer function. |
| initialValue | * | Initial value. |

```js
const stream = Stream.fromArray([1, 2, 3])
stream.reduce((acc, item) => acc + item, 0) // => 6
```

## static fromRange(start, end [, step]) => `Stream`
Creates a stream from a range.

__Returns:__ Stream.

| Param | Type | Description |
| ----- | ---- | ----------- |
| start | number | Start value. |
| end | number | End value. |
| step | number | Step value. |

```js
const stream = Stream.fromRange(1, 3, 2)
stream.toArray() // => [1, 3]
```

## static fromArray(array) => `Stream`
Creates a stream from an array.
__Returns:__ Stream.

| Param | Type | Description |
| ----- | ---- | ----------- |
| array | *[] | Array. |

```js
const stream = Stream.fromArray([1, 2, 3])
stream.toArray() // => [1, 2, 3]
```