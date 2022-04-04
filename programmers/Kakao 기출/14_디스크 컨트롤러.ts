// @@ [문제]: 하드디스크는 1번에 1개만 진행, But, 끝나는 시간이 빠른 거 순으로 진행하고 플 때, 전체 요청의 평균시간?

// @@ [Heap constructor]
function createHeap(init: number[][] = []) {
  const heap: number[][] = init;

  const getLeftIdx = (idx: number) => (idx << 1) + 1;
  const getRightIdx = (idx: number) => (idx + 1) << 1;
  const get = () => heap;
  const swap = (i: number, j: number) =>
    ([heap[i], heap[j]] = [heap[j], heap[i]]);
  const getMaxIdx = (i: number, j: number) =>
    heap[i][1] - heap[i][0] > heap[j][1] - heap[j][0] ? j : i;

  const heapify = (parent: number, max: number) => {
    // 맨 앞의 노드부터 시작해서, 최상단이 가장 짧은 거 (진행시간 [1]) 여야 함
    const [left, right] = [getLeftIdx(parent), getRightIdx(parent)];
    if (left >= max) return;
    else if (right >= max) {
      if (heap[parent][1] - heap[parent][0] > heap[left][1] - heap[left][0]) {
        swap(parent, left);
        heapify(left, max);
      }
    } else {
      const maxIdx = getMaxIdx(left, right);
      swap(parent, maxIdx);
      heapify(maxIdx, max);
    }
  };

  const pop = (): number[] => {
    const lastIdx = heap.length - 1;
    swap(0, lastIdx);
    heapify(0, lastIdx);
    return heap.pop()!;
  };
  const empty = () => heap.length === 0;
  return { get, empty, pop };
}

// @@ [main]
function solution_디스크_컨트롤러(jobs: number[][]) {
  const heap = createHeap(
    jobs.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
  );

  const times: number[] = [];
  let accTime = 0;

  while (!heap.empty()) {
    const [start, work] = heap.pop();
    times.push(accTime + work - start);
    accTime += work;
  }

  return Math.floor(times.reduce((acc, time) => acc + time, 0) / times.length);
}

// 평균 = 대기시간 + 진행시간들의 합
// 진행시간은 일정하니 결국, 대기시간을 최소화 해야함 -> 빨리 끝나는 거 먼저 앞으로!
// 0-3 / 1-9 / 2-6 -> [3, 8, 4] -> [0, 3], [1, 8], [2,4] = [시작 시간, 진행 시간]
// 넣는 순서는?? -> 먼저 시작 ->
// heap으로 먼저 시작 + 진행시간 짧은 순으로 정렬한다.

// 빠른순으로 이미 정렬됨
// 진행시간 짧은 순으로 heapify!! ()
console.log(
  solution_디스크_컨트롤러([
    [0, 3],
    [1, 9],
    [2, 6],
  ])
);
