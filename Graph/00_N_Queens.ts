// [문제]: 보드의 한변의 길이 N이 주어지는 경우, 모든 줄에 퀸을 놓는 가짓수를 판벼랗시오
// [조건]: N < 15

const [EMPTY] = [-1];

function solution(N: number) {
  const queenIdx: number[] = Array(N).fill(EMPTY);
  let answer: number = 0;

  const clearQueenIdx = () => {
    for (let i = 0; i < N; ++i) queenIdx[i] = EMPTY;
  };

  const canPlaceQuuen = (row: number, col: number): boolean => {
    for (let prevRow = 0; prevRow < row; ++prevRow) {
      if (queenIdx[prevRow] === col) return false; // 놓을 장소와 같은 곳이 있다면 false반환
      // 대각선 체크 -> row 차이 === col차이 인 경우 같은 대각선에 있다는 거
      if (row - prevRow === Math.abs(queenIdx[prevRow] - col)) return false;
    }
    return true;
  };

  const backtrack = (currRow: number) => {
    if (currRow >= N) {
      answer += 1;
      return;
    }

    for (let col = 0; col < N; ++col) {
      if (!canPlaceQuuen(currRow, col)) continue;
      queenIdx[currRow] = col;
      backtrack(currRow + 1);
    }
  };

  for (let col = 0; col < N; ++col) {
    queenIdx[0] = col;
    backtrack(1);
    clearQueenIdx();
  }
  console.log(`answer=${answer}`);
}

// [testcase]
solution(8); // 92
export {};
