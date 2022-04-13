class Vector_17 {
  _x: number;
  _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get() {
    return [this._x, this._y];
  }
}

class Queue_17<T> {
  _queue: Map<number, T>;
  _fp: number;
  _bp: number;

  constructor() {
    this._queue = new Map();
    this._fp = 0;
    this._bp = 0;
  }

  public enqueue(value: T) {
    this._queue.set(++this._bp, value);
  }

  public dequeue(): T | undefined {
    return this._queue.get(++this._fp);
  }

  public empty() {
    return this._bp - this._fp === 0;
  }
}

function solution(maps: number[][]) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const [row, col] = [maps.length, maps[0].length];
  const visited: number[][] = Array.from({ length: row }, () =>
    Array(col).fill(0)
  );
  const queue = new Queue_17<Vector_17>();

  queue.enqueue(new Vector_17(0, 0));
  visited[0][0] = 1;

  while (!queue.empty()) {
    const [x, y] = queue.dequeue()?.get() ?? [-1, -1];

    // 다음 위치에 대한 값을 queue에 추가한다.
    for (let d = 0; d < 4; d++) {
      const [nx, ny] = [x + dx[d], y + dy[d]];
      if (!checkInBoundary(nx, ny)) continue;
      if (maps[nx][ny] === 0) continue;
      if (visited[nx][ny]) continue;
      visited[nx][ny] = visited[x][y] + 1;
      queue.enqueue(new Vector_17(nx, ny));
    }
  }

  return visited[row - 1][col - 1] && -1;

  function checkInBoundary(nx: number, ny: number) {
    return 0 <= nx && nx < row && 0 <= ny && ny < col;
  }
}

solution([
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
]); // 11
