// Heap DataStructure

function Heap(initArr?: number[]) {
  const heap: number[] = initArr ?? [];
  // const heap: number[] = [0, 20, 10, 41];

  function getLeftChildIdx(currIdx: number) {
    return currIdx * 2;
  }

  function getRightCHildIdx(currIdx: number) {
    return currIdx * 2 + 1;
  }

  function getParentIdx(currIdx: number) {
    return currIdx >> 1;
  }

  function size(): number {
    return heap.length;
  }

  function swap(i: number, j: number) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }

  // heapify -> 마지막으로 넣은 위치를 부모와 비교해가면서 진행하는 로직 수행
  // 부모가 더 크도록 heapify 진행!!
  function heapify(currIdx: number) {
    const parentIdx = getParentIdx(currIdx);

    // 맨앞에 대해 비교하면 안되기에 이 case 배제
    if (parentIdx < 1) return;

    // 부모가 작다면 swap -> 부모 idx에 대해 heapify를 반복시켜 준다.
    if (heap[parentIdx] < heap[currIdx]) {
      swap(parentIdx, currIdx);
      heapify(parentIdx);
    }
  }

  function insert(newValue: number) {
    heap.push(newValue);
    const lastIdx = size() - 1;

    heapify(lastIdx);
    console.log(heap);
  }

  function buildHeap() {
    const startIdx = heap.length >> 1;

    for (let i = startIdx; i >= 0; --i) {
      console.log(`do heapify index = ${i}`);
      heapify(i);
    }
  }

  return { heap, insert, size, buildHeap };
}

const heap = Heap([0, 10, 20, 41, 50]);
heap.buildHeap();
