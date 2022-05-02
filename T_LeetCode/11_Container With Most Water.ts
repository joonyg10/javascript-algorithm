function solution(height: number[]) {
  let [fp, bp]: [number, number] = [0, height.length - 1];
  let answer: number = 0;

  while (fp < bp) {
    answer = Math.max(answer, (bp - fp) * Math.min(height[fp], height[bp]));
    height[fp] < height[bp] ? fp++ : bp--;
  }

  console.log(answer);
}

solution([1, 8, 6, 2, 5, 4, 8, 3, 7]); // 49
export {};
