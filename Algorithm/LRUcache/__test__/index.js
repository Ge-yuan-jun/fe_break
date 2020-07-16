const LRUCache = require('./LRUCache')

describe('LRUcache case', () => {
  console.log('describe LRU normal case')
  const c = new LRUCache(4)

  test('test lru initial', () => {
    expect(c.size).toEqual(0)
    expect(c.limit).toEqual(4)
    expect(c.oldest).toEqual(undefined)
    expect(c.newest).toEqual(undefined)
  })

  test('test lru put', () => {
    c.put('adam',   29)
    c.put('john',   26)
    c.put('angela', 24)
    c.put('bob',    48)
    expect(c.size).toEqual(4)
    expect(c.newest.value).toEqual(48)
    expect(c.oldest.value).toEqual(29)
  })

  test('test lru get', () => {
    c.get('adam')
    expect(c.newest.value).toEqual(29)
    expect(c.oldest.value).toEqual(26)
  })

  test('test lru shift', () => {
    c.put('ygwie', 81)
    expect(c.size).toEqual(4)
    expect(c.newest.value).toEqual(81)
    expect(c.oldest.value).toEqual(24)
  })

  test('test lru reset value', () => {
    c.put('ygwie', 11)
    expect(c.newest.value).toEqual(11)
    c.put('angela', 100)
    expect(c.newest.value).toEqual(100)
  })
})