# 문제번호 링크

1. [Two Sum](#1.-Two-sum)

---

<br />

## 1. Two sum

[문제] nums : number[], target: number가 주어진 경우
[조건] nums.length < 10^4

[풀이]

1. 2개의 숫자 합만 target과 일치하면 되기에 값들을 해시테이블 (Map)을 만들어 추가
   이 때, nums[i] : index로 넣음

2. 맨 앞에서 부터 for문을 돌면서 target-nums[i]의 값이 해시테이블에 있다면 해당 인덱스와 i를 반환한다.
   (무조건 1가지가 있기 때문에 없는 경우는 생각하지 않음)

<br />
<br />

---

## 2.
