 // 节点类
 class Node {
   constructor(key) {
     this.key = key
     this.left = null
     this.right = null
   }
 }

 // 二叉搜索树
 class BinarySearchTree {
   constructor() {
     this.root = null // 指向根节点
   }

   // 1.插入数据
   insert(key) {
     let newNode = new Node(key)
     if (this.root === null) {
       this.root = newNode
     } else {
       this.insertNode(this.root, newNode)
     }
   }
   // 递归查找插入节点
   insertNode(root, newNode) {
     // 小则往左边查找插入
     if (newNode.key < root.key) {
       if (root.left === null) {
         root.left = newNode;
       } else {
         this.insertNode(root.left, newNode);
       }
     } else if (newNode.key > root.key) { // 大则往右边查找插入
       if (root.right === null) {
         root.right = newNode;
       } else {
         this.insertNode(root.right, newNode);
       }
     } else {
       return false
     }
   }

   // 2.遍历二叉树
   // 2.1.先序遍历 (根 -> 左 -> 右)
   preorderTraverse() {
     let result = [];
     this.preorderTraverseNode(this.root, result);
     return result;
   }
   // 递归遍历
   preorderTraverseNode(node, result) {
     if (node === null) return result;
     result.push(node.key);
     this.preorderTraverseNode(node.left, result);
     this.preorderTraverseNode(node.right, result);
   }
   // 2.2.中序遍历（左 -> 根 -> 右）
   inorderTraverse() {
     const result = [];
     this.inorderTraverseNode(this.root, result);
     return result;
   }
   // 递归遍历
   inorderTraverseNode(node, result) {
     if (node === null) return result;
     this.inorderTraverseNode(node.left, result);
     result.push(node.key);
     this.inorderTraverseNode(node.right, result);
   }
   // 2.3.后序遍历（左 -> 右 -> 根）
   postorderTraverse() {
     const result = [];
     this.postorderTraverseNode(this.root, result);
     return result;
   }
   // 递归遍历
   postorderTraverseNode(node, result) {
     if (node === null) return result;
     this.postorderTraverseNode(node.left, result);
     this.postorderTraverseNode(node.right, result);
     result.push(node.key);
   }

   // 3.获取最大最小值
   // 3.1.获取最小值,找最左边子节点
   min() {
     let node = this.root
     if (node.left !== null) {
       node = node.left
     }
     return node.key
   }
   //3.2.获取最大值,找最右边子节点
   max() {
     let node = this.root
     if (node.right !== null) {
       node = node.right
     }
     return node.key
   }

   // 4.搜索节点
   search(key) {
     return this.searchNode(this.root, key);
   }
   // 递归实现搜索
   searchNode(node, key) {
     if (node === null) return false
     if (key < node.key) {
       return this.searchNode(node.left, key)
     } else if (key > node.key) {
       return this.searchNode(node.right, key)
     } else {
       return true
     }
   }

   // 5.删除节点
   remove(key) {
     // a.定义变量记录状态
     let currentNode = this.root;
     let parentNode = null; // 父节点
     let isLeftChild = true; // 是否为左节点
     // b.查找需要删除的节点,并记录parentNode和isLeftChild
     while (key !== currentNode.key) {
       parentNode = currentNode
       if (key < currentNode.key) {
         isLeftChild = true
         currentNode = currentNode.left
       } else {
         isLeftChild = false
         currentNode = currentNode.right
       }
       if (currentNode === null) {
         return false; // 若未找到，返回false
       }
     }
     // c.删除节点，分为三种情况
     // (1) 删除的节点是叶子节点
     if (currentNode.left === null && currentNode.right === null) {
       if (currentNode === this.root) {
         // 先考虑是否未树根
         this.root = null;
       } else if (isLeftChild) {
         parentNode.left = null;
       } else {
         parentNode.right = null;
       }
     }
     // (2) 删除的节点只有一个子节点
     else if (currentNode.right === null) { // 只有左节点
       if (currentNode === this.root) {
         // 先考虑是否未树根
         this.root = currentNode.left;
       } else if (isLeftChild) {
         parentNode.left = currentNode.left;
       } else {
         parentNode.right = currentNode.left;
       }
     } else if (currentNode.left === null) { // 只有右节点
       if (currentNode === this.root) {
         // 先考虑是否未树根
         this.root = currentNode.right;
       } else if (isLeftChild) {
         parentNode.left = currentNode.right;
       } else {
         parentNode.right = currentNode.right;
       }
     }
     // (3) 删除的节点有两个子节点
     else {
       // 找到左边的最大节点(前驱)，或右边的最小节点(后继)，替换至删除节点的位置
       // a.找到后继节点
       let successor = this.getSuccessor(currentNode);
       // b.判断是否为根节点
       if (currentNode === this.root) {
         this.root = successor;
       } else if (isLeftChild) {
         parentNode.left = successor;
       } else {
         parentNode.right = successor;
       }
       // c.将后继的左节点改为被删除的左节点
       successor.left = currentNode.left;
     }
     return true
   }
   // 获取后继节点的函数(右边最小节点)
   getSuccessor(delNode) {
     // 定义变量，存储临时变量
     let successorParent = delNode;
     let successor = delNode;
     let current = delNode.right;
     // 找到右节点下最小的子节点(往左节点寻找)
     while (current !== null) {
       successorParent = successor;
       successor = current;
       current = current.left;
     }
     // 判断寻找到的后继节点是否就是要删除节点的 right 
     if (successor !== delNode.right) {
       successorParent.left = successor.right;
       successor.right = delNode.right;
     }
     return successor;
   }
 }