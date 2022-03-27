// [문제] 2개의 ListNode 주어진다. 이들의 순서는 숫자의 역순! -> 두 숫자를 합친 형태의 ListNode를 계산하시오
// [조건] node의 갯수는 [1, 100]

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }

  makeListNode(arr: number[]) {
    this.val = arr[0];
    let curr = this.next ?? new ListNode();
    this.next = curr;
    let i = 0;

    while (i < arr.length - 1) {
      curr.val = arr[++i];
      if (i !== arr.length - 1) {
        curr.next = new ListNode();
        curr = curr.next ?? null;
      }
    }
  }

  print() {
    const answer = [this.val];
    let curr = this.next;

    while (curr) {
      answer.push(curr.val);
      curr = curr.next;
    }
    console.log(answer);
  }
}

type NodeType = ListNode | null;

function addTwoNumbers(l1: NodeType, l2: NodeType): NodeType {
  const answer = new ListNode();

  // iterate할 임시 nodePointer를 생성
  let currNode = answer;
  let curr1: NodeType = l1;
  let curr2: NodeType = l2;

  // 둘 중 1개라도 남아있다면 계속 해야됨
  while (curr1 || curr2) {
    let overTen: boolean = false;
    const currSum = (curr1?.val ?? 0) + (curr2?.val ?? 0);

    currNode.val += currSum;
    if (currNode.val >= 10) {
      currNode.val -= 10;
      overTen = true;
    }
    getNextCurr(overTen);
  }

  function getNextCurr(overTen: boolean): void {
    curr1 = curr1?.next || null;
    curr2 = curr2?.next || null;

    // 두개다 존재해야 다음 노드를 생성한다.
    const isNextNode = curr1 || curr2 || overTen;
    if (!isNextNode) return;

    currNode.next = new ListNode(overTen ? 1 : 0);
    currNode = currNode.next;
  }

  answer.print();
  return currNode;
}

const [l1, l2] = [new ListNode(), new ListNode()];
l1.makeListNode([2, 4, 3]);
l2.makeListNode([5, 6, 4]);

const [l3, l4] = [new ListNode(), new ListNode()];
l3.makeListNode([9, 9, 9, 9, 9, 9, 9]);
l4.makeListNode([9, 9, 9, 9]);

addTwoNumbers(l1, l2);
addTwoNumbers(l3, l4);
