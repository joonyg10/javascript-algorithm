// Question : number[]에서 2개의 숫자를 더했을때 target이 나오는 경우가 있다고 하자 (무조건 있음)
//          : 이때, 두 숫자의 idx를 배열에 담아 반환하시오

function twoSum(nums: number[], target: number): number[] {
  const sumMap = new Map<number, number>();
  const lastIdx = nums.length - 1;

  for (let i = 0; i <= lastIdx; ++i) {
    sumMap.set(nums[i], i);
  }

  for (let i = 0; i <= lastIdx; ++i) {
    const pairValue = target - nums[i];
    if (sumMap.has(pairValue)) return [i, sumMap.get(pairValue)!];
  }
  return [-1, -1];
}

// testcase
console.log(twoSum([2, 7, 11, 15], 9));

// 설명
// 1. 2개의 숫자 합만 target과 일치하면 되기에 값들을 해시테이블 (Map)을 만들어 추가
//    이 때, nums[i] : index로 넣음

// 2. 맨 앞에서 부터 for문을 돌면서 target-nums[i]의 값이 해시테이블에 있다면 해당 인덱스와 i를 반환한다.
//  (무조건 1가지가 있기 때문에 없는 경우는 생각하지 않음)
