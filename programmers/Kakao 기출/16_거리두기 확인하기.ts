// @@ [CONSTANT]
const [EMPTY_TABLE, PARTITION, PARTICIPANT] = ["O", "X", "P"];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

// @@ [Queue Consturctor]
const createQueue = () => {
  const _queue: number[][] = [];
  let [fp, bp] = [-1, -1];

  const empty = () => bp === fp;
  const front = () => _queue[fp];

  const enqueue = (value: number[]) => {
    ++bp;
    _queue.push(value);
  };
  const dequeue = () => _queue[++fp];

  return { empty, front, enqueue, dequeue };
};

// @@ {DFS Logic}
const createVisited = (place: string[]) => {
  const _visited = Array.from({ length: 5 }, (_) => Array(5).fill(0));

  const BFS = (i: number, j: number) => {
    const queue = createQueue();
    queue.enqueue([i, j]);
    _visited[i][j] = 1;

    while (!queue.empty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = [x + dx[i], y + dy[i]];
        if (nx < 0 || nx > 4 || ny < 0 || ny > 4) continue;
        if (place[nx][ny] === PARTICIPANT) {
          if (_visited[nx][ny]) continue;
          else return _visited[x][y] + 1;
        } else if (place[nx][ny] === PARTITION) continue;
        _visited[nx][ny] = _visited[x][y] + 1;
        queue.enqueue([nx, ny]);
      }
    }
    return 3; // 다른 참가자를 만나지 않는 경우이므로 2보다 큰 수인 3을 반환한다.
  };

  return { BFS };
};

// @@ [MAIN]
function check(place: string[]) {
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      if (place[i][j] !== PARTICIPANT) continue;
      const visited = createVisited(place);
      const dist = visited.BFS(i, j);
      if (dist <= 2) return 0;
    }
  }
  return 1;
}

function solution(places: string[][]) {
  const answer = places.map((place) => check(place));
  return answer;
}

// @@ [testCase]
const testCase = [
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
];

console.log(solution(testCase));
