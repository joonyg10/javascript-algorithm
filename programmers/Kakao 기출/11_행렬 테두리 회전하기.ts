// [문제]: [시작x, 시작y, 종료 x, 종료y] 까지의 index 배열이 주어지는 경우 해당 영역에 해당하는 subarray를 시계방향으로  1칸씩 이동
//      : 이후에 회전후 회전된 요소들 중 가장 작은 요소들의 배열을 반환하시오
//      : queries 연속 시행에 따라 무조건 그 회전에 대해 가장 작은것만 저장하면 안될듯
// 이 때, x, y들은 좌표 -> -1 해줘야 index랑 일치하게 된다.

function BuildHeap(arr: number[]) {
  const getLeftChildIdx = (idx: number) => (idx << 1) + 1;
  const getRightChildIdx = (idx: number) => (idx + 1) << 1;
  const swap = (i: number, j: number) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

  function heapify(i: number) {
    // min Heap -> root가 가장 작아야 한다.
    const [left, right] = [getLeftChildIdx(i), getRightChildIdx(i)];
    if (arr[i] > arr[left]) {
      swap(i, left);
      heapify(left);
    }
    if (arr[i] > arr[right]) {
      swap(i, right);
      heapify(right);
    }
  }

  const lastIdx: number = arr.length >> 1;
  for (let i = lastIdx; i >= 0; --i) heapify(i);
  return arr;
}

const TOKEN = 0;
function kakao_solution_테두리회전(
  row: number,
  col: number,
  queries: number[][]
) {
  const matrix: number[][] = Array.from({ length: row }, (_, start) =>
    Array.from({ length: col }, (__, idx) => row * start + idx + 1)
  );

  function DFS(sx: number, sy: number, ex: number, ey: number) {
    const dfsStack = [[sx, sy, TOKEN]];
    const heap = [];

    while (dfsStack.length) {
      const [x, y, value] = dfsStack.pop()!;
      const currValue = matrix[x][y];
      matrix[x][y] = value;

      if (currValue === TOKEN) break;
      heap.push(currValue);

      if (x === sx && y < ey) dfsStack.push([x, y + 1, currValue]);
      else if (y === ey && x < ex) dfsStack.push([x + 1, y, currValue]);
      else if (x === ex && sy < y) dfsStack.push([x, y - 1, currValue]);
      else if (y === sy && sx < x) dfsStack.push([x - 1, y, currValue]);
    }

    dfsStack.pop();
    const minHeap = BuildHeap(heap);
    return minHeap[0];
  }

  const answer = [];
  for (const query of queries) {
    const [sx, sy, ex, ey] = query.map((axis) => axis - 1);
    answer.push(DFS(sx, sy, ex, ey));
  }
  return answer;
}

// [testcase]
console.log(
  kakao_solution_테두리회전(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);

console.log(
  kakao_solution_테두리회전(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);

console.log(kakao_solution_테두리회전(100, 97, [[1, 1, 100, 97]]));
