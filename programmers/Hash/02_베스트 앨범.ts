// [문제] : 노래가 많이 재생된 장르 먼저 수록 -> 같은 장르에서도 많이 재생된 순서대로 수록 -> 고유번호가 낮은 (idx빠른)
// 단, 장르별로 2개씩만 수록하도록 한다.

// @@ [type definition]
type Genre = string;
type PlayTime = number;
type Song = number[][];

function MaxHeap(initArr: Song) {
  const _heap: Song = initArr;

  const getChildIdx = (idx: number): number[] => [idx * 2 + 1, (idx + 1) * 2];
  const swap = (i: number, j: number) =>
    ([_heap[i], _heap[j]] = [_heap[j], _heap[i]]);
  const cmp = (i: number, j: number): number => {
    if (_heap[i][0] > _heap[j][0]) return i;
    else if (_heap[i][0] < _heap[j][0]) return j;
    else if (_heap[i][1] < _heap[j][1]) return j;
    else return i;
  };
  const get = () => _heap;

  const maxHeapify = (root: number, limit: number = _heap.length) => {
    const [left, right] = getChildIdx(root);
    let _target: number = root;
    if (right < limit) {
      const maxIdx = cmp(cmp(left, right), root);
      if (maxIdx !== root) _target = maxIdx;
    } else if (left < limit) {
      const maxIdx = cmp(root, left);
      if (maxIdx !== root) _target = left;
    } else return;

    if (_target !== root) {
      swap(_target, root);
      maxHeapify(_target, limit);
    }
  };

  const heapSort = () => {
    const N = _heap.length - 1;
    maxHeapify(0);
    for (let i = N; i > 0; i--) {
      swap(0, i);
      maxHeapify(0, i);
    }
  };

  return { maxHeapify, get, heapSort };
}

// @@ [main Function logic]
function solution(genres: string[], plays: number[]) {
  // variables
  const genrePlays: Map<Genre, PlayTime> = new Map();
  const songs: Map<Genre, Song> = new Map();
  const N = genres.length;
  const answer: number[] = [];

  // init variables
  for (let i = 0; i < N; i++) {
    const currGenre: Genre = genres[i];
    const newSong: Song = songs.get(currGenre) ?? [];
    newSong.push([plays[i], i]);
    genrePlays.set(currGenre, (genrePlays.get(currGenre) ?? 0) + plays[i]);
    songs.set(currGenre, newSong);
  }

  // genreplays -> values에 따라 sort -> 다시 for문 돌면서 할 예정
  const mostPlayedArr = [...genrePlays.entries()].sort((a, b) => b[1] - a[1]);
  const M = mostPlayedArr.length;
  for (let i = 0; i < M; ++i) {
    const [genre, _] = mostPlayedArr[i];
    const heap = MaxHeap(songs.get(genre)!);
    heap.heapSort();

    // heap의 맨뒤의 2개 빼서 idx만 answer에 추가한다.
    const sortedArr = heap.get();
    for (let j = 0; j < 2; ++j) {
      const [_, idx] = sortedArr.pop() ?? [0, -1];
      if (idx > -1) answer.push(idx);
    }
  }
  return answer;
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500]
  )
);
