// [문제]: 같은 문자 연속해서 나오면 갯수 + 반복값으로 줄인다. aa => 2a
// 이렇게 압축되는 문자 갯수를 여러개로 해서 자르고자 한다. -> 이 때 가장 짧게 압축되는 것을 찾고 싶다.

// 쪼개는 경우 문자열의 길이 % 쪼갤 갯수 = 0 이어야 가능함
// 쪼갠다 = 맨앞에서 부터 i개 만큼 -> map에 담그고 다음 idx , idx + i에 대해 있다면 해당 위치에 추가 (단, 연속되어야함!)
// abcdab => {ab: 2} X -> abcdab그대로
type ITmp = {
  [key in string]: number;
};

function kakaoSolution_0(s: string) {
  const N = s.length;
  const compressedStack: number[] = [];
  const lastIterIdx = N >> 1;

  for (let i = 1; i <= lastIterIdx; ++i) {
    compressString(i);
  }

  function compressString(i: number): void {
    const regEx: RegExp = new RegExp(`.{1,${i}}`, "g"); // 정규 표현식은 space도 신경 쓸 것!!
    const chunks: string[] = s.match(regEx)?.concat("") ?? []; // 마지막을 나타내기 위해 ""을 추가 -> 무조건 다르기에 chunk가 추가

    // two pointer이용
    let fp = 0;
    let bp = 0;
    let compressedStr = "";

    // 같은 게 나올 때 까지 bp++, 다른게 나온다 -> str에 추가 숫자 = (bp - fp + 1)이고 1은 들어가지 않도록
    while (fp <= bp && bp < chunks.length) {
      const frontChunk = chunks[fp];
      const backChunk = chunks[bp];

      if (frontChunk === backChunk) ++bp;
      else {
        const dupCnt = bp - fp;
        const newChunk = `${dupCnt !== 1 ? dupCnt : ""}${frontChunk}`;
        compressedStr += newChunk;
        fp = bp;
        ++bp;
      }
    }

    // cu
    updateCuttable(i, compressedStr);
  }

  function updateCuttable(i: number, s: string) {
    compressedStack.push(s.length);
  }

  return Math.min(...compressedStack);
}

console.log(kakaoSolution_0("aabbaccc")); // 7
console.log(kakaoSolution_0("ababcdcdababcdcd")); // 9
console.log(kakaoSolution_0("abcabcdede")); // 8
console.log(kakaoSolution_0("abcabcabcabcdededededede")); // 14
console.log(kakaoSolution_0("xababcdcdababcdcd")); //17
