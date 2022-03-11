// [문제] n개의 0, 또는 양의 정수 -> 더하거나 빼서 target을 만드는 가짓 수

function solution(numbers, target) {
  const lastIdx = numbers.length;
  let answer = 0;

  function backtrack(currIdx, accSum) {
    if (currIdx === lastIdx) {
      if (accSum === target) answer += 1;
      return;
    }

    for (const sign of [1, -1]) {
      const nextSum = accSum + sign * numbers[currIdx];
      backtrack(currIdx + 1, nextSum);
    }
  }

  backtrack(0, 0);
  return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3));
console.log(solution([4, 1, 2, 1], 4));
