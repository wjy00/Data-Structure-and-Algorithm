 // 哈希表
 class HashTable {
   constructor() {
     this.storage = [] // 哈希表存储数据的变量
     this.count = 0 // 当前存放的元素个数
     this.limit = 7 // 哈希表长度（初始设为质数 7）|| 容量是质数有利于数据的均匀分布
     // 装填因子(已有个数/总个数)
     this.loadFactor = 0.75;
     this.minLoadFactor = 0.25;
   }

   // 哈希函数
   hashFn(string, limit) {
     // 随便采用一个质数
     const PRIME = 31
     // a.定义hashCode
     let hashCode = 0
     // b.使用霍纳法则（秦九韶算法），计算 hashCode 的值
     for (let item of string) {
       hashCode = PRIME * hashCode + item.charCodeAt() //使用charCodeAt获取字符对应ASCII值
     }
     // c.对 hashCode 取余，并返回
     return hashCode % limit
   }

   // 判断是否为质数的函数
   isPrime(number) {
     if (number <= 1 || number === 4) return false;
     let temp = Math.ceil(Math.sqrt(number));
     for (let i = 2; i <= temp; i++) {
       if (number % i === 0) {
         return false;
       }
     }
     return true;
   }

   // 获取最临近质数的函数
   getPrime(number) {
     while (!this.isPrime(number)) {
       number++;
     }
     return number;
   }

   // 1.往哈希表里添加数据
   put(key, value) {
     // a.根据 key 获取要映射到 storage 里面的 index（通过哈希函数获取）
     const index = this.hashFn(key, this.limit)
     // b.根据 index 取出对应的 bucket (每个index对应的数据存放在一个桶中)
     let bucket = this.storage[index]
     // c.判断是否存在 bucket
     if (bucket === undefined) {
       bucket = [] // 不存在则创建
       this.storage[index] = bucket
     }
     // d.判断是插入数据操作还是修改数据操作(是否已经存在当前的key)
     let overide = false
     for (let i = 0; i < bucket.length; i++) {
       let tuple = bucket[i] // tuple 的格式：[key, value]
       if (tuple[0] === key) { // 如果 key 相等，则修改数据 
         tuple[1] = value
         overide = true
         return
       }
     }
     // 若不存在则往bucket新增数据
     if (!overide) {
       bucket.push([key, value]) // bucket 存储元组 tuple，格式为 [key, value]
       this.count++
       // e、判断哈希表是否要扩容，若装填因子> 0.75，则扩容
       if (this.count / this.limit > this.loadFactor) {
         this.resize(this.getPrime(this.limit * 2))
       }
     }
   }

   // 2.根据key查找元素value
   get(key) {
     // a.根据key获取index，再取出bucket
     const index = this.hashFn(key, this.limit)
     const bucket = this.storage[index]
     // b.判断是否存在，存在则取出
     if (bucket === undefined) {
       return null
     }
     for (const tuple of bucket) {
       if (tuple[0] === key) {
         return tuple[1]
       }
     }
     return null
   }

   // 3.根据key删除元素
   remove(key) {
     // a.根据key获取index，再取出bucket
     const index = hashFn(key, this.limit);
     const bucket = this.storage[index];
     // b.找到并删除元素
     if (bucket === undefined) {
       return null;
     }
     // 遍历 bucket，找到对应位置的 tuple，将其删除
     for (let i = 0, len = bucket.length; i < len; i++) {
       const tuple = bucket[i];
       if (tuple[0] === key) {
         bucket.splice(i, 1); // 删除对应位置的数组项 
         this.count--;
         // c.根据装填因子的大小，判断是否要进行哈希表压缩 
         if (this.limit > 7 && this.count / this.limit < this.minLoadFactor) {
           this.resize(this.getPrime(Math.floor(this.limit / 2)));
         }
         return tuple;
       }
     }
   }

   // 4.判断是否为空
   isEmpty() {
     return this.count === 0;
   }

   // 5.获取哈希表大小
   size() {
     return this.count;
   }

   // 6.修改哈希表大小，扩容或压缩
   resize(newLimit) {
     // a.保存旧的 storage
     const oldStorage = this.storage;
     // b.重置所有属性
     this.storage = [];
     this.count = 0;
     this.limit = newLimit;
     // c.遍历 oldStorage，取出所有数据，调用put方法 添加到新的 storage
     for (const bucket of oldStorage) {
       if (bucket) {
         for (const tuple of bucket) {
           this.put(tuple[0], tuple[1]);
         }
       }
     }
   }
 }