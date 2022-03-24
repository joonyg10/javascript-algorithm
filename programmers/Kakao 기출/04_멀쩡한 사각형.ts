// [problem] : 좌상단, 우하단의 꼭지점 연결하는 경우 해당 직선이 들어간 사각형을 못사용한다고 할 때, 사용가능한 사각형의 갯수

// [condition] : w,h <= 100,000,000 = 10^8 -> 배열X

// [규칙성] : 최대 공약수 * Ceil(둘중 긴거 / 짧은거) * 짧은 거
//         : 단, 둘다 홀수인 경우는 답에 +1을 해주어야 한다.
function Kakao_Solution4(w: number, h: number) {
  let [min, max] = [Math.min(w, h), Math.max(w, h)];
  const factor = getGreatestCommonFactor(w, h, 2, 1);

  // 둘 다 홀 수 인지 판별
  const bothOdd = w % 2 && h % 2;

  const usedRectCnt: number = Math.ceil(max / min) * min;
  const answer = w * h - usedRectCnt;
  return bothOdd ? answer - 1 : answer;

  function getGreatestCommonFactor(
    a: number,
    b: number,
    i: number,
    acc: number
  ): number {
    // 종료 -> 둘 중 1개라도 나누어 떨어지지 않는 경우 return
    if (i >= min) return acc;

    // 둘 중 1개가 나누어 지지 않는다. -> i를 1개 올려서 계속 시행
    if (a % i !== 0 || b % i !== 0)
      return getGreatestCommonFactor(a, b, i + 1, acc);

    // 만약 나누어 진다! -> acc +=i , a, b다음 값 대입
    return getGreatestCommonFactor((a / i) >> 0, (b / i) >> 0, 2, acc * i);
  }
}

// [testCase]
console.log("Kakao_Solution4: ", Kakao_Solution4(8, 12));
console.log("Kakao_Solution4: ", Kakao_Solution4(5, 7));
