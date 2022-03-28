// [문제] N, target이 주어졌을때, 괄호, 사칙연산만으로 target을 만들 때, 가장 작게 사용된 횟수를 구하여라

// [조건]  N < 10, target <= 32,000, 최솟값이 8보다 크면 -1을 반환

// [풀이]
// [] +, -, * , /를 진행해서, 같은 숫자로만 만들어 졌을때를 반환

function kakao_solution7(N: number, number: number) {
  if (N === number) return 1;

  // init values
  const hashTable: Map<number, Map<number, number>> = new Map();

  for (let i = 1; i < 8; ++i) {
    hashTable.set(i, new Map());
  }

  hashTable.get(1)?.set(N * 2, 1);
  hashTable.get(1)?.set(0, 1);
  hashTable.get(1)?.set(1, 1);
  hashTable.get(1)?.set(N ** 2, 1);

  // make hashTable
  for (let i = 1; i < 8; ++i) {
    // 이전꺼에 대해 사칙연산 한 것을 추가한다.
    const depth = i + 1;
    const prevDepth = hashTable.get(i)!;
    const currDepth = hashTable.get(depth)!;

    currDepth.set(parseInt(`${N}`.repeat(depth)), depth);
    for (const prevValue of prevDepth.keys()) {
      currDepth.set(prevValue + N, depth);
      currDepth.set(Math.abs(prevValue - N), depth);
      currDepth.set(prevValue * N, depth);
      prevValue % N === 0 && currDepth.set(prevValue / N, depth);
    }

    if (currDepth.has(number)) return depth;
    // console.log(currDepth);
  }
  return -1;
}

// [testcase]
console.log(kakao_solution7(2, 11));
console.log(kakao_solution7(5, 12));
console.log(kakao_solution7(3, 9));
