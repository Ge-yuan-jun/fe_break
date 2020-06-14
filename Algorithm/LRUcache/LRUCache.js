/**
 * LRU 缓存算法
 * 前置指针 NEWER
 * 后置指针 OLDER
 * @class LRUCache
 */

 // 定义链表前后指针
const NEWER = Symbol('newer')
const OLDER = Symbol('older')

// 初始化链表元素
class Entry {
  constructor (key, value) {
    this.key = key
    this.value = value
    this[NEWER] = undefined
    this[OLDER] = undefined
  }
}

class LRUCache {
  constructor (limit) {
    this.size = 0
    this.limit = limit
    this.newest = this.oldest = undefined
    this.keyMap = new Map()
  }

  // 内部函数，处理 entry 的链表位置
  markEntryAsUsed (entry) {
    // 链表头部元素，无需更新
    if (entry === this.newest) {
      return
    }
    // 处理链表元素前置指向
    if (entry[NEWER]) {
      // 边界条件：尾部元素
      if (entry === this.oldest) {
        this.oldest = entry[NEWER]
      }
      entry[NEWER][OLDER] = entry[OLDER]
    }

    // 处理链表元素后置指向
    if (entry[OLDER]) {
      entry[OLDER][NEWER] = entry[NEWER]
    }
    entry[NEWER] = undefined
    entry[OLDER] = this.newest

    if (this.newest) {
      this.newest[NEWER] = entry
    }

    this.newest = entry
  }

  // 移除最后一个元素
  shift () {
    const entry = this.oldest
    if (entry) {
      if (this.oldest[NEWER]) {
        this.oldest = this.oldest[NEWER]
        this.oldest[OLDER] = undefined
      } else {
        this.oldest = undefined
        this.newest = undefined
      }
    }

    entry[NEWER] = undefined
    entry[OLDER] = undefined

    this.keyMap.delete(entry.key)
    this.size--
  }

  /** 将缓存数据加入到链表中 */
  put (key, value) {
    let entry = this.keyMap.get(key)

    // 处理 key 值已在链表中存在
    if (entry) {
      entry.value = value
      // markEntryAsUsed：重新排列链表元素
      this.markEntryAsUsed(entry)
      return
    }

    this.keyMap.set(key, (entry = new Entry(key, value)))
    if (this.newest) {
      this.newest[NEWER] = entry
      entry[OLDER] = this.newest
    } else {
      this.oldest = entry
    }

    this.newest = entry
    this.size++
    // 超出链表长度，则删除链表尾部元素
    if (this.size > this.limit) {
      this.shift()
    }
  }
  
  /** 获取数据在缓存中是否存在，存在则提到链表头部 */
  get (key) {
    const entry = this.keyMap.get(key)
    if (entry === undefined) return -1
    this.markEntryAsUsed(entry)
    return entry.value
  }
}

module.exports = LRUCache
// export default LRUCache