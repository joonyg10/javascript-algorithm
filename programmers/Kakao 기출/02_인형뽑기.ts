const EMPTY = -1;

function solution_Crane(board: number[][], moves: number[]) {
  const N = board.length;
  let prevStackPointer = EMPTY;
  let bombedCnt = 0;

  const pickedStack: number[] = [];
  const colMap: Map<number, number[]> = new Map();
  const pointer: number[] = Array(N + 1).fill(0);

  for (let col = 0; col < N; ++col) {
    const filteredDoll = Array(N)
      .fill(0)
      .reduce((acc: number[], _, row) => {
        if (board[row][col]) acc.push(board[row][col]);
        return acc;
      }, []);
    colMap.set(col + 1, filteredDoll);
  }

  function pickDoll(col: number): number | undefined {
    const colPointer = pointer[col];
    const selectedCol: number[] = colMap.get(col)!;

    // pointer가 이미 영역 넘은 경우 -> 뺼 꺼 없음
    if (colPointer >= selectedCol.length) return undefined;
    const pickedDoll = selectedCol[colPointer];
    pointer[col] = colPointer + 1; // pointer 1개 증가 시킨다.
    return pickedDoll;
  }

  function updatePickStack(pickedDoll: number): void {
    if (prevStackPointer === EMPTY) {
      appendDoll(pickedDoll);
      return;
    }
    const prevDoll = pickedStack[prevStackPointer];
    if (prevDoll === pickedDoll) explodeDoll();
    else appendDoll(pickedDoll);
  }

  function appendDoll(pickedDoll: number) {
    pickedStack.push(pickedDoll);
    ++prevStackPointer;
  }

  function explodeDoll() {
    pickedStack.pop();
    --prevStackPointer;
    bombedCnt += 2; // 2개씩 사라지므로 2개씩 카운트
  }

  for (const col of moves) {
    const pickedDoll = pickDoll(col);
    if (pickedDoll) updatePickStack(pickedDoll);
  }

  return bombedCnt;
}

// moves로 해당 위치의 col에 도착시 (col - 1)로 가야함!! 해당 col의 가장 상단의 인형을 빼서 stack에 담는다.
// 같은게 2번 연속 -> 해당 2개를 제거 -> 그 총 횟수를 count해서 반환하시오

console.log(
  solution_Crane(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);
