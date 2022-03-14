// [문제] 얼굴, 상의, 하의, 겉옷의 서로 다른 조합의 수를 반환하는 함수를 제작
// [조건] 각 배열의 원소는 [의상명, 의상 종류]

function solution(clothes) {
  const clothesMap = clothes.reduce((acc, [_, clothType]) => {
    if (acc.has(clothType)) acc.set(clothType, acc.get(clothType) + 1);
    else acc.set(clothType, 1);
    return acc;
  }, new Map());

  const clothesTypes = [...clothesMap.keys()];
  const clothesValues = [...clothesMap.values()];
  const N = clothesMap.size;

  let answer = 0;

  function backTrack(currType, accSum) {
    if (currType >= N) return;
    answer += accSum;
    for (let i = currType + 1; i < N; ++i) {
      const nextSum = accSum * clothesValues[i];
      backTrack(clothesTypes[i], nextSum);
    }
  }
  for (let i = 0; i < N; ++i) {
    backTrack(i, clothesValues[i]);
  }
  return answer;
}

console.log(
  solution([
    ["yellowhat", "headgear"],
    ["bluesunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);

console.log(
  solution([
    ["crowmask", "face"],
    ["bluesunglasses", "face"],
    ["smoky_makeup", "face"],
  ])
);
