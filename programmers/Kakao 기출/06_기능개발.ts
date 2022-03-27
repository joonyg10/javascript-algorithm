// [문제] : 배포할 때마다 몇개의 기능이 배포되었는지를 기록하는 []를 반환

// 1. 진도가 100%일 때 서비스에 반영이 가능
// 2. 속도는 모두 달라 뒤의 기능이 앞의 것보다 먼저 개발될 수 있지만, 배포는 앞에것이 먼저 되어야 함,
//    단, 앞에 것이 끝났을때, 같이 배포 가능

// [조건] : X
interface IProps {}

function kakao_solution6(progresses: number[], speeds: number[]) {
  const N: number = speeds.length;

  // 남은 일수 배열
  const leftDays = Array(N)
    .fill(0)
    .reduce((acc, _, idx) => {
      const leftDay = Math.ceil((100 - progresses[idx]) / speeds[idx]);
      acc.push(leftDay);
      return acc;
    }, []);

  let fp = 0;
  let bp = 0;
  let deployCnt = 0;
  const answer: number[] = [];

  while (fp < N || bp < N) {
    const wouldDeployOverlap = leftDays[fp] >= leftDays[++bp];

    // 앞에것이 끝나야 같이 배포
    if (wouldDeployOverlap) continue;

    // bp는 다음 배포 index를 가리키고 있음 -> 차이는 bp - fp
    answer.push(bp - fp);
    fp = bp;
  }
  return answer;
}

// [testcase]
console.log(kakao_solution6([93, 30, 55], [1, 30, 5]));
console.log(kakao_solution6([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
