// 队列类
class Queue {
  constructor() {
    this.items = [];
  }
  // 方法
  // 1.向队尾添加元素
  enqueue(element) {
    this.items.push(element)
  }
  // 2.从队前删除元素
  dequeue() {
    return this.items.shift() //数组删除前面的元素效率不高
  }
  // 3.查看队前元素
  front() {
    return this.items[0]
  }
  // 4.查看队列是否为空
  isEmpty() {
    return this.items.length === 0
  }
  // 5.查看元素个数
  size() {
    return this.items.length
  }
  // 6.toString方法
  toString() {
    return this.items.join('')
  }
}