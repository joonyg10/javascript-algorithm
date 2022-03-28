// [문제]: numbers 사이사이에 +, -를 넣어 target를 만들 수 있는 가짓수 구하기

function kakao_solution_3(numbers: number[], target: number) {
  const lastIdx: number = numbers.length - 1;
  let answer = 0;

  // currIdx = -1, acc: 0 부터 시작
  function backTrack(currIdx: number, acc: number) {
    if (currIdx === lastIdx) {
      if (acc === target) answer += 1;
      return;
    }

    for (const sign of [-1, 1]) {
      const nextSum = acc + sign * numbers[currIdx + 1];
      backTrack(currIdx + 1, nextSum);
    }
  }
  backTrack(-1, 0);
  return answer;
}

console.log(kakao_solution_3([1, 1, 1, 1, 1], 3)); // 5
console.log(kakao_solution_3([4, 1, 2, 1], 4)); // 2
