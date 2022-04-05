// 중요도 가장 높은 거 맨 앞으로 오는 우선순위 큐

type WorkNode = ReturnType<typeof getNode>;
type PriorityQueue = ReturnType<typeof getPriorityQueue>;

function getNode(priority: number, order: number) {
  const _priority = priority;
  const _order = order;

  const getPriority = () => _priority;
  const getOrder = () => _order;
  return { getPriority, getOrder, _priority, _order };
}
function compareNode(n1: WorkNode, n2: WorkNode) {
  // 우선순위 먼저 비교
  if (n1.getPriority() > n2.getPriority()) return 0;
  else if (n1.getPriority() < n2.getPriority()) return 1;
  // 순서 비교 -> order는 들어온 순서이지만, 추가할 때, 맨뒤로 넣기 떄문에 더 늦게 들어온게 먼저 나온다...?
  else if (n1.getOrder() < n2.getOrder()) return 1;
  else return 0;
}

function getPriorityQueue() {
  const _heap: WorkNode[] = [];
  let [fp, bp] = [0, -1];

  const empty = () => bp === fp;
  const getChild = (root: number) => [2 * root + 1, 2 * root + 2];
  const swap = (i: number, j: number) =>
    ([_heap[i], _heap[j]] = [_heap[j], _heap[i]]);
  const getMaxIdx = (i: number, j: number) =>
    compareNode(_heap[i], _heap[j]) === 1 ? j : i;

  const maxHeapify = (root: number) => {
    const [left, right] = getChild(root);

    if (left > bp) return;
    else if (right > bp) {
      const maxIdx = getMaxIdx(root, left);
      if (maxIdx !== left) return;
      swap(root, left);
      maxHeapify(left);
    } else {
      const maxIdx = getMaxIdx(getMaxIdx(left, right), root);
      if (maxIdx === root) return;
      swap(root, maxIdx);
      maxHeapify(maxIdx);
    }
  };

  const enqueue = (node: WorkNode) => {
    _heap.push(node);
    bp++;
    maxHeapify(fp);
  };

  const dequeue = () => {
    const front = _heap[fp++];
    maxHeapify(fp);
    return front;
  };
  const print = () => console.log(_heap, "\n");
  return { enqueue, dequeue, print, empty };
}

function solution(priorities: number[], location: number) {
  // location을 idx로 하는 게 몇번째에 나올 지 체크
  const N = priorities.length;
  const queue = getPriorityQueue();

  for (let i = 0; i < N; ++i) {
    const node = getNode(priorities[i], i);
    queue.enqueue(node);
  }
  let cnt: number = 1;
  while (!queue.empty()) {
    const popNode = queue.dequeue();
    if (popNode.getOrder() === location) return cnt;
    cnt++;
  }
}

console.log(solution([2, 1, 3, 2], 2));
console.log(solution([1, 1, 9, 1, 1, 1], 0));
