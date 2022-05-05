function solution(s: string) {
  const regExp = new RegExp(/[^{\}]+(?=})/g);

  const hashMap: Map<string, number> = new Map();
  const answer: number[] = [];

  const compareNumber = (nums: string[]) => {
    nums.map((num: string) => {
      if (!hashMap.has(num)) {
        hashMap.set(num, 1);
        answer.push(parseInt(num));
      }
    });
  };
  // regExp로 해제한배열을 split해서 가져온 뒤, 길이에 대해 오름차순 정렬
  // hashMap에 없다면, answer에 추가하고, 있다면, 다음 원소를 비교한다.
  s.match(regExp)
    ?.map((subString) => subString.split(","))
    .sort((a, b) => a.length - b.length)
    .map(compareNumber);
  console.log(answer);
}

solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"); // [2,1,3,4]
solution("{{1,2,3},{2,1},{1,2,4,3},{2}}"); // [2,1,3,4]
solution("{{20,111},{111}}"); // [111, 20]
solution("{{123}}"); // [123]
solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"); // [3,2,4,1]

export {};
