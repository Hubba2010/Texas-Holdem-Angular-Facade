import {
  CARD_RANKS,
  SYMBOLS,
  COMBINATIONS,
  POSSIBLE_ARRANGEMENTS,
} from 'consts';

const suits = SYMBOLS.slice().reverse();
const values = CARD_RANKS;
const types = COMBINATIONS;
const arrayCompare = (firstArr, secondArr, i = 0) =>
  i >= firstArr.length
    ? 0
    : firstArr[i] > secondArr[i]
    ? 1
    : firstArr[i] < secondArr[i]
    ? -1
    : arrayCompare(firstArr, secondArr, i + 1);

function getScore(hand) {
  const arrangement = hand
    .map((combination) => ({
      suit: suits.indexOf(combination.slice(-1)),
      value: values.indexOf(combination.slice(0, -1)),
    }))
    .sort(
      (first, second) => first.value - second.value || first.suit - second.suit
    );
  const isFlush = arrangement.every(
      (combination) => combination.suit === arrangement[0].suit
    ),
    isStraight = arrangement.every(
      (combination, index) => combination.value === arrangement[0].value + index
    );
  const groups = arrangement.reduce(
    (group, combination) => (
      (group[combination.value] = group[combination.value] + 1 || 1), group
    ),
    {}
  );
  const keyValues = Object.keys(groups)
    .map((key) => [groups[key], +key])
    .sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  const handGrades = [
    ...new Set(arrangement.map((combination) => combination.value)),
  ].sort(
    (a, b) =>
      keyValues.find((e) => b === e[1])[0] -
        keyValues.find((e) => a === e[1])[0] || b - a
  );
  return isFlush && isStraight
    ? [8, handGrades]
    : keyValues[0][0] === 4
    ? [7, handGrades]
    : keyValues[0][0] === 3 && keyValues[1][0] === 2
    ? [6, handGrades]
    : isFlush
    ? [5, handGrades]
    : isStraight
    ? [4, handGrades]
    : keyValues[0][0] === 3
    ? [3, handGrades]
    : keyValues[0][0] === 2 && keyValues[1][0] === 2
    ? [2, handGrades]
    : keyValues[0][0] === 2
    ? [1, handGrades]
    : [0, handGrades];
}
export function checkCombination(cardsArray) {
  let max = [0, [-1, -1, -1, -1, -1]];
  for (const combination of POSSIBLE_ARRANGEMENTS) {
    var score = getScore(combination.map((i) => cardsArray[i]));
    if (
      score[0] > max[0] ||
      (score[0] === max[0] && arrayCompare(score[1], max[1]) > 0)
    )
      max = score;
  }
  return { type: types[max[0]], ranks: max[1].map((n) => values[n]) };
}
