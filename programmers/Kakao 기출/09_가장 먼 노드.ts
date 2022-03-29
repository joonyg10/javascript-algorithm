// [문제] : 1번 노드에서 가장 먼 노드의 갯수를 구하시오
// 가장 먼 노드 = 최단 경로로 이동했을 때, 간선의 갯수가 가장 많은 노드

// [조건] : N <= 20,000, 간선수 <= 50,000

class Queue {
  fp: number;
  bp: number;
  queue: number[];

  constructor() {
    this.fp = -1;
    this.bp = 0;
    this.queue = [1];
  }

  enqueue(value: number) {
    this.queue.push(value);
    ++this.bp;
  }

  dequeue() {
    return this.queue[++this.fp];
  }

  size() {
    return this.bp - this.fp;
  }

  empty() {
    return this.size() === 0;
  }
}

function kakao_solution_가장_먼_노드(N: number, vertex: number[][]) {
  const graph: Map<number, number[]> = new Map();
  const visited = Array(N + 1).fill(0);
  const queue = new Queue();
  const answer: Map<number, number> = new Map();

  // 초기화
  for (let i = 1; i <= N; ++i) {
    graph.set(i, []);
  }
  for (const [start, dest] of vertex) {
    graph.get(start)?.push(dest);
    graph.get(dest)?.push(start);
  }
  visited[1] = 1;

  // BFS시행
  while (!queue.empty()) {
    const currNode = queue.dequeue();

    // hashTable인 answer에 visited[currNode]에 대한 갯수를 저장한다.
    const edgeCnt = visited[currNode];
    answer.set(edgeCnt, (answer.get(edgeCnt) ?? 0) + 1);

    for (const adjNode of graph.get(currNode)!) {
      if (visited[adjNode]) continue;
      visited[adjNode] = visited[currNode] + 1;
      queue.enqueue(adjNode);
    }
  }

  // answer에 마지막으로 들어있는 게 가장 오래 걸린 것이므로 [].pop()으로 가져온다.
  const [_, farthestCnt] = [...answer].pop()!;
  return farthestCnt;
}

console.time();
kakao_solution_가장_먼_노드(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]);

console.timeEnd();
