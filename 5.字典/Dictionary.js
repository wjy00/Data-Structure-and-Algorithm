class Dictionary {
      constructor() {
        this.items = {}
      }

      // 1.在字典中添加键值对
      set(key, value) {
        this.items[key] = value
      }

      // 2.从字典中移除元素
      remove(key) {
        // 先判断是否有key
        if (!this.has(key)) return false
        // 存在则删除
        delete this.items[key]
        return true
      }

      // 3.判断集合中是否有某一个值
      has(key) {
        // 使用对象的 hasOwnProperty 方法
        return this.items.hasOwnProperty(key)
      }

      // 4.根据key去获取对应value
      get(key) {
        return this.has(key) ? this.items[key] : undefined
      }

      // 5.获取所有的keys
      keys() {
        return Object.keys(this.items)
      }

      // 6.获取所有的value
      values() {
        return Object.keys(this.items)
      }

      // 7.获取字典中元素数量
      size() {
        return Object.keys(this.items).length
      }

      // 8.移除字典中所有项
      clear() {
        this.items = {}
      }
    }
