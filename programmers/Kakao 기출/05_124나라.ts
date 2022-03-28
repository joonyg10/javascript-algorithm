// [문제] 규칙에 따라 모든수를 1, 2, 4로만 나타낼 때, n에 대한 변환값을 구하시오

// [조건] n <= 500,000,000인 자연수

function kakao_solution5(N: number) {
  // 초기화
  const M = getFactorLimit(N);
  const answer: number[] = Array(M).fill(1);

  const hashedSum: number[] = answer.reduce<number[]>(
    (acc, _, idx) => {
      if (idx !== 0) acc.push(acc[idx - 1] + 3 ** idx);
      return acc;
    },
    [1]
  );
  let accSum = hashedSum[M - 1];

  // accSum이 N이 될 때까지 반복
  while (accSum < N) {
    const remains = N - accSum;
    const remainsFactorLimit = getFactorLimit(remains);
    for (let i = 0; i < remainsFactorLimit; ++i) answer[i] += 1;

    accSum += hashedSum[remainsFactorLimit - 1];
  }

  // 3을 4로 바꾸는 작업
  let [fp, bp] = [0, 1];
  while (fp < M) {
    if (answer[fp] > 3) {
      answer[bp] += Math.ceil(answer[fp] / 3) - 1;
      answer[fp] %= 3;
    }
    if (answer[fp] === 3 || answer[fp] === 0) answer[fp] = 4;
    ++fp;
    ++bp;
  }

  return answer.reverse().join("");
}

const getFactorLimit = (M: number) => (Math.log(2 * M + 1) / Math.log(3)) >> 0;

// [testcase]
console.log(kakao_solution5(28)); // 241
console.log(kakao_solution5(45)); // 1124
console.log(kakao_solution5(78)); // 2214
