class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected // 是否为单项图
    this.vertices = [] // 顶点
    this.edges = new Dictionary() // 边
  }

  // 1.添加顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.edges.set(v, [])
    }
  }

  // 2.添加边
  addEdge(v1, v2) {
    // 若不存在v1、v2，先添加顶点
    if (!this.edges.get(v1)) this.addVertex(v1)
    if (!this.edges.get(v2)) this.addVertex(v2)
    this.edges.get(v1).push(v2)
    if (!this.isDirected) this.edges.get(v2).push(v1)
  }

  // 3.toString方法，便于调试
  toString() {
    let resultStr = ""
    for (let i = 0; i < this.vertices.length; i++) {
      resultStr += this.vertices[i] + "->"
      let adj = this.edges.get(this.vertices[i])
      for (let j = 0; j < adj.length; j++) {
        resultStr += adj[j] + " "
      }
      resultStr += "\n"
    }
    return resultStr
  }

  // 4.图的遍历(需要指定第一个被访问的节点)
  // 初始化状态颜色
  initializeColor() {
    let colors = []
    for (i of this.vertices) {
      colors[i] = 'white'
    }
    return colors
  }
  // 4.1.广度优先搜索(BFS)
  bfs(init_v, handler) {
    // a.初始化颜色 (白：未访问；灰：已访问、未探索；黑：已访问、已探索)
    let colors = this.initializeColor()
    // b.创建队列,并将顶点加入到队列中
    let queue = new Queue()
    queue.enqueue(init_v)
    // c.循环从队列中取出元素
    while (!queue.isEmpty()) {
      let v = queue.dequeue()
      let vList = this.edges.get(v) // v相邻的顶点
      colors[v] = 'gray'
      // 遍历相邻顶点，并加入队列当中
      for (i of vList) {
        if (colors[i] == 'white') { // 白色才加入队列
          colors[i] = 'gray'
          queue.enqueue(i)
        }
      }
      // 探索顶点,并设置为黑色
      handler(v)
      colors[v] = 'black'
    }
  }
  // 4.2.深度优先搜索(DFS)
  dfs(init_v, handler) {
    // a.初始化颜色
    let colors = this.initializeColor()
    // b.递归依次访问
    this.dfsVisit(init_v, colors, handler)
  }
  // 递归访问顶点
  dfsVisit(v, colors, handler) {
    // 将v设置为灰色
    colors[v] = 'gray'
    // 取出v相邻的顶点
    let vList = this.edges.get(v)
    // 探索顶点,并设置为黑色
    handler(v)
    colors[v] = 'black'
    // 访问v相邻顶点
    for (i of vList) {
      if (colors[i] == 'white') { // 白色才访问
        this.dfsVisit(i, colors, handler)
      }
    }
  }
}