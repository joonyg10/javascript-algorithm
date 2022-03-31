// [문제] : 연속된 2개의 단어가 같은거 -> 삭제가능 -> 모든 단어에 대해 삭제가 가능하다면 1, 아니면 0을 반환하시오

// ts에서는 prototype확장이 가능하지만, declare로 어떻게 확장할지 까지 선언해 주어야 한다.
// 이를 declaration merge라고 한다.

class Stack {
  private stack: string[];
  private sp: number;

  constructor() {
    this.stack = [""];
    this.sp = 0;
  }

  private pop() {
    this.stack.pop();
    this.sp -= 1;
  }

  private push(value: string) {
    this.stack.push(value);
    this.sp += 1;
  }

  public compare(value: string) {
    const prevChar = this.stack[this.sp];
    if (prevChar === value) this.pop();
    else this.push(value);
  }

  public empty() {
    return this.sp === 0;
  }
}

function kakao_solution_짝지어_제거하기(s: string) {
  const N = s.length;
  if (N % 2) return 0;

  const stack: Stack = new Stack();

  for (let i = 0; i < N; ++i) {
    stack.compare(s[i]);
  }

  return stack.empty() ? 1 : 0;
}

// [testcase]
console.time();
console.log(kakao_solution_짝지어_제거하기("babaaba"));
console.log(kakao_solution_짝지어_제거하기("baabaa"));
console.log(kakao_solution_짝지어_제거하기("cbcb"));
console.timeEnd();
