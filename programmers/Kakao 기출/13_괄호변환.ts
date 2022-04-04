// [문제] :  리펙토링 -> 괄호 갯수는 맞으나 짝이 안맞는 경우 존재
// 균형잡힌 괄호 문자열  : ( ) 의 갯수가 같은 경우
// 올바른 괄호 문자열   : ( ) 의 갯수 + 짝까지 맞는 경우

// @@ [stack]
function createStack(initValue: string[]) {
  const stack: string[] = initValue;

  const splitStack = (): SplitStack => {
    let [leftOpen, rightClose] = [0, 0];
    let [fp, bp] = [0, 0];

    for (let i = 0; i < stack.length; ++i) {
      if (stack[i] === "(") {
        leftOpen += 1;
        fp += 1;
      } else {
        rightClose += 1;
        i - fp === 1 && fp--;
      }
      bp += 1;
      if (leftOpen === rightClose) break;
    }

    const v = createStack(stack.splice(bp) ?? []);
    return [v, checkIsCorrect(stack.join(""))];
  };

  const checkIsCorrect = (word: string): boolean => {
    const checkStack: string[] = [""];
    let top = 0;
    if (word[0] === ")") return false;
    for (let i = 0; i < word.length; i++) {
      const pair = word[i] === "(" ? ")" : "(";
      if (checkStack[top] === pair) {
        checkStack.pop();
        top--;
      } else {
        checkStack.push(word[i]);
        top++;
      }
    }
    return top === 0;
  };

  const swap = () => {
    stack[0] = "(";
    stack[stack.length - 1] = ")";
    for (let i = 1; i < stack.length - 1; ++i) {
      stack[i] === "(" ? (stack[i] = ")") : (stack[i] = "(");
    }
  };

  const get = () => stack;
  const size = () => stack.length;
  const empty = () => size() === 0;

  return { splitStack, size, stack, get, swap, empty };
}

// @@ [types]
type IStack = ReturnType<typeof createStack>;
type SplitStack = [IStack, boolean];

const addTwoStack = (s1: IStack, s2: IStack): string => {
  return s1.get().join("") + s2.get().join("");
};

function recursive(u: IStack, v: IStack, isUCorrect: boolean): string {
  if (v.empty()) return u.get().join("");

  const [nextV, nextUCorrect] = v.splitStack();
  if (!isUCorrect) u.swap();

  return u.get().join("") + recursive(v, nextV, nextUCorrect);
}

// @@ [main]
function solution(word: string) {
  // v를 앞의 부분이 BALANCED가 될 때까지 분리하여, 분리된 스트링 배열을 반환하는 함수 + u가 balnced 인지 여부도
  const initValue: string[] = word.split("");
  const stack = createStack(initValue);

  const [v, isUCorrect] = stack.splitStack();
  return recursive(stack, v, isUCorrect);
}

console.log("answer: ", solution("(()())()"));
console.log("answer: ", solution("()"));
console.log("answer: ", solution("()))((()"));
