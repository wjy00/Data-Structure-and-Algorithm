    // 节点类
    class DoublyNode {
      constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
      }
    }

    // 双向链表
    class DoublyLinkedList {
      constructor() {
        this.head = null
        this.tail = null
        this.length = 0
      }

      // 1.向链表末尾添加元素
      append(element) {
        // a.创建一个新的节点
        let newNode = new DoublyNode(element)
        // b.先判断是否为第一个节点，并找到最后一个元素,将元素添加到最后
        if (this.length == 0) {
          this.head = newNode
          this.tail = newNode
        } else {
          newNode.prev = this.tail
          this.tail.next = newNode
          this.tail = newNode
        }
        // c.length+1
        this.length++
      }

      // 2.链表转换为字符串
      // 2.1.toString方法
      toString() {
        let listString = ""
        let current = this.head
        while (current) {
          listString += current.data + " "
          current = current.next
        }
        return listString
      }
      // 2.2.forwardString方法,正向遍历
      forwardString() {
        return this.toString()
      }
      // 2.3.backwardString方法，反向遍历
      backwardString() {
        let listString = ""
        let current = this.tail
        while (current) {
          listString += current.data + " "
          current = current.prev
        }
        return listString
      }

      // 3.向链表插入元素
      insert(position, data) {
        // a.先判断是否越界
        if (position < 0 || position > this.length) return false
        // b.创建新节点
        let newNode = new DoublyNode(data)
        // c.判断是否为第一个节点,并插入元素
        if (position == 0) {
          // 判断是否为空链表
          if (this.length == 0) {
            this.head = newNode
            this.tail = newNode
          } else {
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
          }
        } else if (position == this.length) { // 判断是否在最后一个节点后面添加
          newNode.prev = this.tail
          this.tail.next = newNode
          this.tail = newNode
        } else {
          let current = this.head
          // 找到插入位置的前一个元素
          for (let i = 0; i < position - 1; i++) {
            current = current.next
          }
          // 修改指针
          current.next.prev = newNode
          newNode.next = current.next
          newNode.prev = current
          current.next = newNode
        }
        //d.length + 1 
        this.length++
      }

      // 4.获取对应位置的元素
      get(position) {
        // a.先判断是否越界
        if (position < 0 || position >= this.length) return null
        // b.查找元素,判断元素是否在一半之前，提高查找速度
        let current = null
        if (position < this.length / 2) {
          current = this.head
          for (let i = 0; i < position; i++) {
            current = current.next
          }
        } else {
          current = this.tail
          for (let i = 0; i < this.length - position - 1; i++) {
            current = current.prev
          }
        }
        return current.data
      }

      // 5.获取元素在列表中的索引
      indexOf(data) {
        let current = this.head
        let index = []
        for (let i = 0; i < this.length; i++) {
          if (current.data == data) {
            index.push(i)
          }
          current = current.next
        }
        // 若不存在返回-1
        return index == [] ? -1 : index
      }

      // 6.修改某个位置的元素
      update(position, data) {
        // a.先判断是否越界
        if (position < 0 || position >= this.length) return false
        // b.查找元素,判断元素是否在一半之前，提高查找速度
        if (position < this.length / 2) {
          let current = this.head
          for (let i = 0; i < position; i++) {
            current = current.next
          }
          // c.修改节点的data
          current.data = data
        } else {
          let current = this.tail
          for (let i = 0; i <
            this.length - position - 1; i++) {
            current = current.prev
          }
          // c.修改节点的data
          current.data = data
        }
      }

      // 7.从列表中删除特定位置的一项
      removeAt(position) {
        // a.先判断是否越界
        if (position < 0 || position >= this.length) return false
        // b.判断是否为第一个节点,并删除元素
        let dele = ''
        if (position == 0) {
          dele = this.head.data
          // 判断链表是否只有一个节点
          if (this.length == 1) {
            this.head = null
            this.tail = null
          } else {
            this.head.next.prev = null
            this.head = this.head.next
          }
        } else if (position == this.length - 1) { // 判断是否为最后一个节点
          dele = this.tail.data
          this.tail.prev.next = null
          this.tail = this.tail.prev
        } else {
          // 找到删除位置的节点
          let current = null
          if (position < this.length / 2) {
            current = this.head
            for (let i = 0; i < position; i++) {
              current = current.next
            }
          } else {
            current = this.tail
            for (let i = 0; i < this.length - position - 1; i++) {
              current = current.prev
            }
          }
          dele = current.data
          // 修改指针 
          current.prev.next = current.next
          current.next.prev = current.prev
        }
        // c.length - 1 
        this.length--
        return dele
      }

      // 8.从列表中删除特定元素的项
      remove(data) {
        // a.先获取元素所在位置,并反转数组
        let position = this.indexOf(data).reverse()
        // b.再删除位置对应的元素，从后往前删除
        for (let value of position) {
          this.removeAt(value)
        }
      }

      // 9.判断链表是否为空
      isEmpty() {
        return this.length == 0
      }

      // 10.获取链表元素个数
      size() {
        return this.length
      }

      // 11.获取链表的第一个元素
      getHead() {
        return this.head.data
      }

      // 10.获取链表的最后一个元素
      getTail() {
        return this.tail.data
      }
    }