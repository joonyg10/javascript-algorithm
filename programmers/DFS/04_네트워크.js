// [문제]

const CONNECTED = 1;
const UN_CONNECTED = 0;

function solution(N, computers) {
  const isConnected = Array(N).fill(0);
  const network = computers.reduce((acc, connnections, idx) => {
    acc.set(idx, connnections);
    return acc;
  }, new Map());
  let networkCnt = 1;

  for (let i = 0; i < N; ++i) {
    if (isConnected[i]) continue;
    DFS([i]);
    networkCnt += 1;
  }

  // stack에는 isConnect = 0 인 컴퓨터의 index만 담도록 한다. -> 꺼내서 비교 x
  function DFS(stack) {
    while (stack.length) {
      const currComp = stack.pop();
      isConnected[currComp] = CONNECTED;

      // 현재 컴퓨터에 대한 연결 정보 리스트를 가져온다. -> [0,0, 0, ...]
      const nextConnection = network.get(currComp);
      for (let i = 0; i < N; ++i) {
        // isConnect에 없어야함 (이미 network에 등록된 상태X) + 연결 정보 리스트에서 1로 연결된 상태여야 해당 노드로 넘어감

        if (!nextConnection[i]) continue;
        if (isConnected[i]) continue;
        stack.push(i);
      }
    }
  }
  return networkCnt - 1;
}

const testCase1 = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];
const testCase2 = [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
];

console.log(solution(3, testCase1));
console.log(solution(3, testCase2));
