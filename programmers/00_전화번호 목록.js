// Q: 전화번호가 다른 사람 전화번호의 접두어인 경우가 있는지 확인하는 로직 작성
//    접두어가 있는 경우가 false!!

function solution(phone_book) {
  const lastIdx = phone_book.length - 1;
  const sortedPhone = phone_book.sort((a, b) => a.length - b.length);
  const phoneMap = new Map();
  const lengthMap = new Map();

  for (let i = 0; i <= lastIdx; ++i) {
    const currLength = sortedPhone[i].length;
    if (!lengthMap.has(currLength)) lengthMap.set(currLength, i);

    // length Map의 모든 길이에 대해 시행해야 함
    for (const length of lengthMap.keys()) {
      const shortestPrefix = sortedPhone[i].slice(0, length);
      if (phoneMap.has(shortestPrefix)) return false;
    }

    // 현재 phone을 map에 추가
    phoneMap.set(sortedPhone[i], i);
  }
  return true;
}

console.log(solution(["12", "123", "1235", "567", "88"]));
console.log(solution(["119", "97674223", "1195524421"]));

// 간과한 케이스 : 가장 작은 거 말고도 모든 길이에 대해 테스트를 해야함...
// 가장 짧은 것 말고, 길이 또한 Map 객체에 넣고 관리
