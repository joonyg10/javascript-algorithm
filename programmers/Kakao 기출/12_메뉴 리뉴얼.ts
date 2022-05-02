function solution(orders: string[], course: number[]) {
  const combination: Map<string, number> = new Map();

  const getCombination = (
    ori: string,
    acc: string,
    i: number,
    limit: number
  ) => {
    if (acc.length >= 2) {
      combination.set(acc, (combination.get(acc) ?? 0) + 1);
    }

    for (let j = i + 1; j < limit; ++j) {
      getCombination(ori, acc + ori[j], j, limit);
    }
  };

  for (const order of orders) {
    const sortedOrder = [...order].sort().join("");
    getCombination(sortedOrder, "", -1, sortedOrder.length);
  }

  const answer: string[] = [];
  course.map((c) => {
    const tmp = [...combination]
      .filter(([order, orderCnt]) => orderCnt >= 2 && order.length === c)
      .sort((a, b) => b[1] - a[1]);

    // tmp 가 없는 경우 그냥 return
    if (!tmp.length) return;

    const max = tmp[0][1];
    for (let i = 0; i < tmp.length; ++i) {
      if (tmp[i][1] === max) answer.push(tmp[i][0]);
      else break;
    }
  });
  console.log(answer.sort());
}

solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]);
// ["AC", "ACDE", "BCFG", "CDE"]
solution(["XYZ", "WXY", "WXA"], [2, 3, 4]);
// ["WX". "XY"]
export {};

// 최소 2명이상이 주문한 요리들만을 모아서, 새로운 ㅋ코스요리를 만든다.
// 같은 order 길이에 대해 orderCnt가 가장 큰 요소만 추가가 가능하다.
