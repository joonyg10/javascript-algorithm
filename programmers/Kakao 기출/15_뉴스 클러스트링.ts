// [문제]  J = 자카드 유사도 = 교집합수  / 합집합수 (공집합의 경우 1로 정의)
// 문자열을 2글자씩 끊어서 다중집합을 만드는 경우 자카드 유사도를 65536 곱해 정수만 출력하시오
const FACTOR = 65536;
const [A, Z] = [97, 122];

const checkASCRange = (str: string) =>
  A <= str.charCodeAt(0) && str.charCodeAt(0) <= Z;

// @@ [Set 만드는 함수]
const createSet = (str: string) => {
  const hash: Map<string, number> = new Map();
  const N = str.length;
  let [fp, bp] = [0, 1];
  while (bp < N) {
    const frontChar = str[fp].toLowerCase();
    const backChar = str[bp].toLowerCase();

    if (checkASCRange(frontChar) && checkASCRange(backChar)) {
      const char = frontChar + backChar;
      hash.set(char, (hash.get(char) ?? 0) + 1);
    }
    fp++;
    bp++;
  }
  return hash;
};
type IHash = Map<string, number>;

//  @@ [교집합]
function getIntersection(hash1: IHash, hash2: IHash): number {
  return [...hash1.entries()].reduce((acc, [char, cnt]) => {
    return acc + Math.min(cnt, hash2.get(char) ?? 0);
  }, 0);
}

// @@ [합집합]
function getUnion(hash1: IHash, hash2: IHash): number {
  const iterUnion = [...new Set([...hash1.keys(), ...hash2.keys()])];
  return iterUnion.reduce((acc, char) => {
    return acc + Math.max(hash1.get(char) ?? 0 + (hash2.get(char) ?? 0));
  }, 0);
}

function solution_클러스터링(str1: string, str2: string) {
  const set1 = createSet(str1);
  const set2 = createSet(str2);

  const intersectionCnt = getIntersection(set1, set2);
  const unionCnt = getUnion(set1, set2);

  if (intersectionCnt === 0 && unionCnt === 0) return FACTOR;
  return Math.floor((intersectionCnt / unionCnt) * FACTOR);
}

// @@ [testCase]
console.log(solution_클러스터링("FRANCE", "french"));
console.log(solution_클러스터링("handshake", "shake hands"));
console.log(solution_클러스터링("aa1+aa2", "AAAA12"));
