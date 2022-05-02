function solution(s: string) {
  const hashMap: Map<string, number> = new Map();
  const dp: number[] = Array(s.length - 1).fill(0);
  let p: number = 0; // p for pointing lastest repeated string index

  hashMap.set(s[0], 0);
  dp[0] = 1;

  for (let i = 1; i < s.length; ++i) {
    if (hashMap.has(s[i])) p = Math.max(hashMap.get(s[i])!, p);
    dp[i] = Math.max(dp[i - 1], i - p);
    hashMap.set(s[i], i);
  }

  console.log(s, " => ", dp[s.length - 1]);
}

solution("abcabbc"); // 3
solution("bbbbb"); // 1
solution("pwwkew"); //3

export {};

// p = 가장 최근에 중복된 위치를 가리키는 포인터

// s[i] 가 hashMap에 있다면 p를 변경!
//  있다 -> p = max(p, 현재 s[i]가 나타났던 가장 최근 위치 = hashMap.get(s[i]))
//  없다 -> p 그대로

// dp[i] = max(i-1 까지 최대 길이의 substring = dp[i-1], i - p = 현재위치 ~ 중복되었던 거 다음우치)
