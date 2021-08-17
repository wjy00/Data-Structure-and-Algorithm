class Set {
  constructor() {
    this.items = {}
  }

  // 1.向集合添加一个新的项
  add(value) {
    // 先判断集合中是否有该值
    if (this.has(value)) return false
    // 不存在则添加
    this.items[value] = value
    return true
  }

  // 2.从集合中移除一个值
  remove(value) {
    // 先判断集合中是否有该值
    if (!this.has(value)) return false
    // 存在则删除
    delete this.items[value]
    return true
  }

  // 3.判断集合中是否有某一个值
  has(value) {
    // 使用对象的 hasOwnProperty 方法
    return this.items.hasOwnProperty(value)
  }

  // 4.移除集合中所有项
  clear() {
    this.items = {}
  }

  // 5.获取集合中元素数量
  size() {
    return Object.keys(this.items).length
  }

  // 6.返回包含集合中所有值的数组
  values() {
    return Object.keys(this.items)
  }
}