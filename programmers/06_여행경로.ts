// [문제] ICN출발 -> 방문하는 공항의 경로를 배열로 담아 반환하기
// tickets[i] = [a, b] = a -> b인 항공권을 의미

// 출발지가 ICN인 거
// ICN [ATL, SFO]
// ATL [ICN, SFO]
// ICN [SFO]
// SFO [ATL]
// ATL

const USED = 1;

function solution(tickets: string[][]): string[] {
  const answer: string[] = ["ICN"];
  const ticketMap: Map<string, string[]> = initMap(tickets);
  const usedTicketMap: Map<string, any> = new Map();

  function DFS(depCity: string) {
    const arriveCities = getAlphaSortedArr(ticketMap.get(depCity));
    if (!arriveCities) return;

    for (const arrCity of arriveCities) {
      // 이미 사용한 티켓인지 확인
      if (usedTicketMap.has(`${depCity}${arrCity}`)) continue;

      // 방문 표시 -> map에서 제거 -> 사용 처리
      answer.push(arrCity);
      deleteArrCIty(depCity, arrCity, ticketMap);
      usedTicketMap.set(`${depCity}${arrCity}`, 1);
      DFS(arrCity);
    }
  }

  DFS("ICN");
  return answer;
}

function initMap(tickets: string[][]): Map<string, string[]> {
  const ticketMap: Map<string, string[]> = new Map();

  for (const [depCity, arrCity] of tickets) {
    // map에 이미 있다면 해당 list에 추가해야한다.
    const arrCities = ticketMap.get(depCity);
    if (arrCities) {
      arrCities.push(arrCity);
      ticketMap.set(depCity, arrCities);
    } else {
      ticketMap.set(depCity, [arrCity]);
    }
  }
  return ticketMap;
}

function deleteArrCIty(
  depCity: string,
  arrCity: string,
  ticketMap: Map<string, string[]>
) {
  const arrCities = ticketMap.get(depCity);
  const filteredCities = arrCities?.filter((city) => city !== arrCity);
  if (filteredCities) ticketMap.set(depCity, filteredCities);
}

function getAlphaSortedArr(array: string[] | undefined) {
  return array?.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
);

console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
);
