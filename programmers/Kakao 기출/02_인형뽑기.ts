const EMPTY = 0;

function solution_Crane(board: number[][], moves: number[]) {
  const N = board.length;
  let prevStackPointer = EMPTY;
  let bombedCnt = 0;

  const pickedStack: number[] = [-1];
  const pointer: number[] = Array(N + 1).fill(0);

  function updatePointer(col: number): number {
    let row = 0;
    while (row < N) {
      if (board[row][col]) return row;
      ++row;
    }
    return N;
  }

  for (let col = 0; col < N; ++col) {
    pointer[col + 1] = updatePointer(col);
  }

  function pickDoll(col: number): number | undefined {
    const row = pointer[col];
    if (row >= N) return undefined;

    const pickedDoll = board[row][col];
    pointer[col] = row + 1;
    return pickedDoll;
  }

  function updatePickStack(pickedDoll: number): void {
    const prevDoll = pickedStack[prevStackPointer];
    if (prevStackPointer !== EMPTY && prevDoll === pickedDoll) explodeDoll();
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
