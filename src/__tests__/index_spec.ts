import { number } from 'yargs';
import Stream from '../';

describe('Stream', () => {

  it('exists', () => {
    expect(Stream).toBeDefined();
  });

  it('creates a stream', () => {
    const stream = new Stream();
    expect(stream).toBeDefined();
  });

  it('creates a stream with item', () => {
    const stream = new Stream(1);
    expect(stream.toArray()).toEqual([1]);
  });

  it('creates stream with item and predicate', () => {
    const stream = new Stream(1, () => new Stream(2));
    expect(stream.toArray()).toEqual([1, 2]);
  });

  describe('fromArray', () => {
    it('creates a stream from array', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.toArray()).toEqual([1, 2, 3]);
    });

    it('creates a stream from empty array', () => {
      const stream = Stream.fromArray([]);
      expect(stream.toArray()).toEqual([]);
    });
  });

  describe('first', () => {
    it('returns first item', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.first()).toEqual(1);
    });

    it('throws error if stream is empty', () => {
      const stream = new Stream();
      expect(() => stream.first()).toThrow();
    });
  });

  describe('isEmpty', () => {
    it('returns true if stream is empty', () => {
      const stream = new Stream();
      expect(stream.isEmpty()).toBeTruthy();
    });

    it('returns false if stream is not empty', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.isEmpty()).toBeFalsy();
    });
  });

  describe('toArray', () => {
    it('returns array', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.toArray()).toEqual([1, 2, 3]);
    });

    it('returns empty array', () => {
      const stream = new Stream();
      expect(stream.isEmpty()).toBeTruthy();
    });

    it('returns array with one item', () => {
      const stream = new Stream(1);
      expect(stream.toArray()).toEqual([1]);
    });

    it('returns array with two items', () => {
      const stream = new Stream(1, () => new Stream(2));
      expect(stream.toArray()).toEqual([1, 2]);
    });
  });

  describe('filter', () => {
    it('returns empty stream', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(() => false);
      expect(filtered.isEmpty()).toBeTruthy();
    });

    it('returns stream with one item', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item === 2);
      expect(filtered.toArray()).toEqual([2]);
    });

    it('returns stream multiple items', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item > 1);
      expect(filtered.toArray()).toEqual([2, 3]);
    });
  });

  describe('map', () => {
    it('returns empty stream', () => {
      const stream = new Stream();
      const mapped = stream.map(item => item + 1);
      expect(mapped.isEmpty()).toBeTruthy();
    });

    it('returns stream with one item', () => {
      const stream = new Stream(1);
      const mapped = stream.map(item => item + 1);
      expect(mapped.toArray()).toEqual([2]);
    });

    it('maps items', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const mapped = stream.map(item => item + 1);
      expect(mapped.toArray()).toEqual([2, 3, 4]);
    });
  });

  describe('concat', () => {
    it('returns empty stream', () => {
      const stream = new Stream();
      const concat = stream.concat(new Stream());
      expect(concat.isEmpty()).toBeTruthy();
    });

    it('concats two streams', () => {
      const stream1 = Stream.fromArray([1, 2, 3]);
      const stream2 = Stream.fromArray([4, 5, 6]);
      const concat = stream1.concat(stream2);
      expect(concat.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('length', () => {
    it('returns 0 for empty stream', () => {
      const stream = new Stream();
      expect(stream.length()).toEqual(0);
    });

    it('returns 1 for stream with one item', () => {
      const stream = new Stream(1);
      expect(stream.length()).toEqual(1);
    });

    it('returns 3 for stream with three items', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.length()).toEqual(3);
    });
  });

  describe('reduce', () => {
    it('returns empty stream', () => {
      const stream = new Stream();
      expect(stream.reduce((acc, item) => acc + item, 0)).toEqual(0);
    });

    it('reduces stream', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      expect(stream.reduce((acc, item) => acc + item, 0)).toEqual(6);
    });
  });

  describe('fromRange', () => {
    it('creates a stream from range', () => {
      const stream = Stream.fromRange(1, 3);
      expect(stream.toArray()).toEqual([1, 2, 3]);
    });

    it('creates a stream from range with step', () => {
      const stream = Stream.fromRange(1, 3, 2);
      expect(stream.toArray()).toEqual([1, 3]);
    });
  });

  describe('chaining', () => {
    it('can chain filter and first', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item > 1).first();
      expect(filtered).toEqual(2);
    });

    it('can chain filter and toArray', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item > 1).toArray();
      expect(filtered).toEqual([2, 3]);
    });

    it('can chain map and first', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const mapped = stream.map(item => item + 1).first();
      expect(mapped).toEqual(2);
    });

    it('chains filter and map in correct order', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item > 1).map(item => item + 1);
      expect(filtered.toArray()).toEqual([3, 4]);
    });

    it('calls filter only until first item is found when using first', () => {
      const filterMock = jest.fn(() => true);
      const stream = Stream.fromArray([1, 2, 3]);
      stream.filter(filterMock).first();
      expect(filterMock).toHaveBeenCalledTimes(1);
    });

    it('calls map only until first item is found when using first', () => {
      const mapMock = jest.fn(() => 1);
      const stream = Stream.fromArray([1, 2, 3]);
      stream.map(mapMock).first();
      expect(mapMock).toHaveBeenCalledTimes(1);
    });

    it('calls multiple filters until first item is found when using first', () => {
      const evenFilterMock = jest.fn(item => item % 2 === 0);
      const divisibleBy3FilterMock = jest.fn(item => item % 3 === 0);
      const stream = Stream.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      stream
        .filter(evenFilterMock)
        .filter(divisibleBy3FilterMock)
        .first();
      expect(evenFilterMock).toHaveBeenCalledTimes(6);
      expect(divisibleBy3FilterMock).toHaveBeenCalledTimes(3);
    });
  });

  describe('types', () => {
    it('it is set when created', () => {
      const stream = new Stream(1);
      expect(typeof stream.first()).toBe('number');
    });

    it('it is overriden when mapped', () => {
      const stream = new Stream(1);
      const mapped = stream.map(item => item.toString());
      expect(typeof mapped.first()).toBe('string');
    });

    it('it is unchanged when filtered', () => {
      const stream = Stream.fromArray([1, 2, 3]);
      const filtered = stream.filter(item => item > 1);
      expect(typeof filtered.first()).toEqual(typeof stream.first());
    });
  });
});