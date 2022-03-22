function kakao_solution_4(numbers: number[], target: number) {
  const N: number = numbers.length;
  let answer = 0;

  function backTrack(currIdx: number, sum: number) {
    if (currIdx === N - 1) {
      if (sum === target) answer += 1;
      return;
    }

    const nextIdx = currIdx + 1;
    for (const sign of [-1, 1]) {
      const nextSum = sum + sign * numbers[nextIdx];
      backTrack(nextIdx, nextSum);
    }
  }

  backTrack(0, numbers[0]);
  backTrack(0, -numbers[0]);
  return answer;
}

console.log(kakao_solution_4([1, 1, 1, 1, 1], 3));
console.log(kakao_solution_4([4, 1, 2, 1], 4));
