// [문제] begin, target의 단어와 words: string[]이 주어진다. begin -> target으로 한 번에 1개만 바꿀 수 있고 바꾼 후의 단어가 words안에 있어야 한다.
// [조건] words에 중복은 없으며 최소 변환횟수 (불가능 = 0)를 반환하시오
// [조건] begin, target의 길이는 [3,10]

// [] begin에서 1개를 바꾸는데 words에 있는 걸로 바꾸기 -> stack에 넣기
// words.filter(word => word.diffOne(word, begin))  ->  diffOne(word, begin) -> set을 만들어 size가 N+1이면 1문자만 다르다는 것을 이용

function solution(begin: string, target: string, words: string[]): number {
  if (begin.length !== target.length) return 0;

  const N = begin.length;
  const filteredWords = words.filter((word) => word.length === N);
  const visitedMap: Map<string, number> = new Map();
  let answer: number = 0;

  // 2개의 단어를 받아 1글자만 차이나는 지를 반환하는 함수
  function cmpTwoWord(word: string, anotherWord: string): boolean {
    const set = new Set([...word.split(""), ...anotherWord.split("")]);
    return set.size === N + 1;
  }

  // stack에는 visitedMap에 없는 것만 남아두도록 한다!!
  function DFS(stack: string[], modifiedCnt: number): void {
    if (stack.length === 0) return;

    // 만약 target과 일치 -> answer 업데이트 하고 return
    const currWord = stack.pop()!;
    if (currWord === target) {
      answer = visitedMap.get(currWord)!;
      return;
    }

    // 현재 단어에 대해 words의 다른 단어에 대해 1단어만 다른 것만 stack에 담는 과정입니다.
    // visited에 있으면 이미 해당 단어에 대해 더 빠르게 접근했다는 의미이기에 해당 경우도 필터링 해줍니다.
    // 1개의 위치만 다른 경우 visitedMap에 [해당 단어 : 변형 횟수]로 하여금 추가 됩니다.
    for (const anotherWord of filteredWords) {
      if (visitedMap.has(anotherWord)) continue;
      if (cmpTwoWord(currWord, anotherWord)) {
        stack.push(anotherWord);
        visitedMap.set(anotherWord, modifiedCnt);
      }
    }

    DFS(stack, modifiedCnt + 1);
  }

  const stack: string[] = [begin];
  DFS(stack, 1);

  return answer;
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));
