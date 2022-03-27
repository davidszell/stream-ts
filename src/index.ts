class Stream<Type = any> {
  private head: Type;
  private generator: () => Stream;

  constructor(head: Type = null, generator: () => Stream = () => new Stream()) {
    this.head = head;
    this.generator = generator;
  }

  /**
   * @returns First item of the stream.
   * @throws {Error} If stream is empty.
   */
  first(): Type {
    if (this.head == null) {
      throw new Error('Stream is empty');
    }
    return this.head;
  }

  /**
   * Checks if stream is empty.
   * 
   * @returns True if stream is empty.
   */
  isEmpty(): boolean {
    return this.head == null;
  }
  
  /**
   * Collects stream items into an array.
   * 
   * @returns Array of stream items.
   */ 
  toArray(): Type[] {
    let result: Type[] = [];
    let stream: Stream = this;
    while (!stream.isEmpty()) {
      result.push(stream.head);
      stream = stream.generator();
    }
    return result;
  }

  /**
   * Filters stream items by predicate.
   * 
   * @param predicate Predicate function.
   * @returns Filtered stream.
   */
  filter(predicate: (item: Type) => boolean): Stream<Type> {
    if (this.isEmpty()) {
      return this;
    }

    if (predicate(this.head)) {
      return new Stream(this.head, () => this.generator().filter(predicate));
    } else {
      return this.generator().filter(predicate);
    }
  }

  /**
   * Maps stream items by mapper.
   * 
   * @param mapper Mapper function.
   * @returns Mapped stream.
   */
  map<T>(mapper: (item: Type) => T): Stream<T> {
    if (this.isEmpty()) {
      return new Stream<T>();
    }

    return new Stream(mapper(this.head), () => this.generator().map(mapper));
  }

  /**
   * Concatenates two streams.
   * 
   * @param stream Stream to concatenate.
   * @returns Concatenated stream.
   */
  concat<T>(stream: Stream<T>): Stream<Type | T> {
    if (this.isEmpty()) {
      return stream;
    }

    return new Stream(this.head, () => this.generator().concat(stream));
  }

  /**
   * Returns stream length.
   * 
   * @returns Stream length.
   */
  length(): number {
    let length: number = 0;
    let stream: Stream = this;
    while (!stream.isEmpty()) {
      length++;
      stream = stream.generator();
    }
    return length;
  }

  /**
   * Reduces stream items by reducer.
   * 
   * @param reducer Reducer function.
   * @param initialValue Initial value.
   * @returns Reduced value.
   */
  reduce<T>(reducer: (acc: T, item: Type) => T, initialValue: T): T {
    let acc: T = initialValue;
    let stream: Stream = this;
    while (!stream.isEmpty()) {
      acc = reducer(acc, stream.head);
      stream = stream.generator();
    }
    return acc;
  }

  /**
   * Creates a stream from a range.
   * 
   * @param start Start value.
   * @param end End value.
   * @param step Step value.
   * @returns Stream.
   */
  static fromRange(start: number, end: number, step: number = 1): Stream<number> {
    if (start === end) {
      return new Stream(start);
    }
    return new Stream(start, () => Stream.fromRange(start + step, end, step));
  }

  /**
   * Creates a stream from an array.
   * 
   * @param array Array.
   * @returns Stream.
   */
  static fromArray<T>(array: T[]): Stream<T> {
    if (array.length === 0) {
      return new Stream();
    }
    return new Stream(array[0], () => Stream.fromArray(array.slice(1)));
  }
}

export default Stream;