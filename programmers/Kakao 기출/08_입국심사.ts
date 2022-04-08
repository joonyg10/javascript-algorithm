// [문제] -> 심사관들이 n명의 사람을 모두 심사하는 데 걸리는 최소시간?

// [조건]
// N < 1,000,000,000 (10**9) , n < 100,000
// n: 입국심사관, times: 각 심사관이 1명 심사하는 데 걸리는 시간
function kakao_solution_입국심사(n: number, times: number[]) {
  const checkManageAll = (time: number): boolean => {
    // 해당 time으로 처리가능한 인원수를 구한다. -> times에 대해 각 time/ times[i] -> 해당 time에 대해 처리 인원수
    const managableCnt: number = times.reduce<number>(
      (acc, curr) => (acc += Math.floor(time / curr)),
      0
    );
    return managableCnt >= n;
  };

  // 특정 시간에 대해 이분탐색을 시행한다. 시간내로 n명의 입국자를 처리할 수 있어야 한다.
  let [left, right] = [0, 10 ** 9];
  while (left <= right) {
    // bit operation을 쓰지 않는 것은 2**31까지만 가능하기에, 그 이상은 시간초과 걸린다.
    const time = Math.floor((left + right) / 2);
    if (checkManageAll(time)) right = time - 1;
    else left = time + 1;

    console.log(left, right);
  }
  return left;
}

console.log(kakao_solution_입국심사(6, [7, 10])); // 28
