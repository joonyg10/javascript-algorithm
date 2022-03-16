// [문제]:  닉네임 변경시 이전에 있던 기록도 변경된 닉네임으로 변경되도록 한다.

const [ENTER, LEAVE, CHANGE] = ["Enter", "Leave", "Change"];

function kakao_solution1(record: string[]): string[] {
  const N = record.length;
  const orders: string[] = [];
  const idQueue: string[] = [];
  const idNameMap: Map<string, string> = new Map();

  for (let i = 0; i < N; ++i) {
    const [action, Id, nickname] = record[i].split(" ");
    orders.push(action);
    idQueue.push(Id);
    idNameMap.set(Id, nickname);
  }

  const nickNameOrder: string[] = idQueue.map((id) => idNameMap.get(id)!);

  return orders.reduce((acc: string[], order, idx) => {
    if (order === CHANGE) return acc;
    const action = `${nickNameOrder[idx]}님이 ${
      order === ENTER ? "들어왔습니다." : "나갔습니다."
    }`;
    acc.push(action);
    return acc;
  }, []);
}

console.log(
  kakao_solution1([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);
// ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
// ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
