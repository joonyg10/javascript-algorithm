function solution(N: number, scores: number[]) {
  const dp: number[] = Array(N).fill(0);
  dp[0] = scores[0];
  dp[1] = scores[0] + scores[1];
  dp[2] = Math.max(scores[1], scores[0]) + scores[2];

  for (let i = 3; i < N; ++i) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3] + scores[i - 1]) + scores[i];
  }
  console.log(dp[N - 1]);
}

// @@ testcase
solution(6, [10, 20, 15, 25, 10, 20]);

export {};

// 계단은 한번에 1칸 또는 2칸 오를 수 있으나, 연속된 3개의 계단을 밟으면 안된다.
// 얻을 수 있는 점수의 최댓값을 구하시오

// dp[0] = score[0]
// dp[1] = dp[0] + score[1] VS score[1] ->
// dp[2] = [i-3] + [i-1] + score[i] vs [i-2] + score[i]
