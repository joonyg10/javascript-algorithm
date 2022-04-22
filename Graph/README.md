# 번호 링크

### [N-Queens](#n-quuens)

<br />
<br />

# N-Quuens

<span style="color:skyblue">**[문제]**</span>

- 체스보드 한 변의 길이 N이 주어질 때, N개의 퀸이 서로 공격할 수 없게 두는 방법의 갯수를 구하시오

<span style="color:skyblue">**[풀이]**</span>

- 체스보드 라고 해서 2차원으로 푸는 방법도 있으나, 이 문제에서는 굳이 2차원 까지 확장해 불필요한 메모리 낭비를 할 수도 있다.
- 단순 1차원 배열을 만들어, 각 index가 row를 의미, 배얄[idx]의 값을 퀸의 col의 위치를 주면 된다.

1. 퀸의 위치를 저장할 1차원배열과 answer변수를 선언한다.
2. 첫 번째 줄에 대해 for문으로 각 col에 퀸을 놓는다.
3. 다음 줄들에 대해 똑같이 col: 0 ~ N에 놓는 경우를 상정한다.

- 만약, 해당 위치에 놓을 수 있다면, queenIdx[row] = col로 업데이트 하고, 다음 줄에 대해 재귀함수를 시행한다.
- 아니라면, coninue;

<br />

  <span style="color:lightpink">
    재귀함수 함수에 대해 종료조건은 currRow === N인 경우. 마지막 줄을 벗어났다는 것은 모든 행에 대해 퀸이 서로 공격하지 못하도록 배치했다는 의미이므로, answer += 1로 카운트 해준다.
  </span>
