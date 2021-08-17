// 栈类
class Stack {
  constructor() {
    this.items = [];
  }
  // 方法
  // 1.向栈中添加元素
  push(element) {
    this.items.push(element);
  }
  // 2.向栈中移除元素
  pop() {
    return this.items.pop();
  }
  // 3.查看栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }
  // 4.检查栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  // 5.查看栈的大小
  size() {
    return this.items.length;
  }
  // 6.清空栈元素
  clear() {
    this.items = [];
  }
  // 7.toString 方法
  toString() {
    return this.items.join("");
  }
}