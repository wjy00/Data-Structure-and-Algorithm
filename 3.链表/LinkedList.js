 // 节点类
 class Node {
   constructor(data) {
     this.data = data
     this.next = null
   }
 }

 // 链表类
 class LinkedList {
   constructor() {
     this.head = null
     this.length = 0
   }

   // 1.向链表末尾添加元素
   append(data) {
     // a.创建一个新的节点
     let newNode = new Node(data)
     // b.先判断是否为第一个节点，并找到最后一个元素,将元素添加到最后
     if (this.length == 0) {
       this.head = newNode
     } else {
       let current = this.head
       while (current.next) {
         current = current.next
       }
       current.next = newNode
     }
     // c.长度+1
     this.length++
   }

   // 2.toString方法,方便代码测试
   toString() {
     let listString = ""
     let current = this.head
     while (current) {
       listString += current.data + " "
       current = current.next
     }
     return listString
   }

   // 3.向链表插入元素
   insert(position, data) {
     // a.先判断是否越界
     if (position < 0 || position > this.length) return false
     // b.创建新节点
     let newNode = new Node(data)
     // c.再判断是否为第一个元素,并插入元素
     if (position == 0) {
       newNode.next = this.head
       this.head = newNode
     } else {
       let current = this.head
       // 找到插入位置的前一个元素
       for (let i = 0; i < position - 1; i++) {
         current = current.next
       }
       newNode.next = current.next
       current.next = newNode
     }
     //d.length + 1
     this.length++
   }

   // 4.获取对应位置的元素
   get(position) {
     // a.先判断是否越界
     if (position < 0 || position >= this.length) return null
     // b.查找元素
     let current = this.head
     for (let i = 0; i < position; i++) {
       current = current.next
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
     // b.查找元素，并修改
     let current = this.head
     for (let i = 0; i < position; i++) {
       current = current.next
     }
     current.data = data
   }

   // 7.从列表中删除特定位置的一项
   removeAt(position) {
     // a.先判断是否越界
     if (position < 0 || position >= this.length) return false
     // b.查找元素，并删除
     let dele = ''
     if (position == 0) {
       this.head = this.head.next
     } else {
       // 找到插入位置的前一个元素
       let current = this.head
       for (let i = 0; i < position - 1; i++) {
         current = current.next
       }
       dele = current.next.data
       current.next = current.next.next
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
 }