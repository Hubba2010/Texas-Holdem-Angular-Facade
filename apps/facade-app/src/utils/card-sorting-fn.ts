import { CARD_RANKS, SYMBOLS } from 'consts';

export function sortCards(cardsArray: string[]) {
  cardsArray.sort(function (firstCard: string, secondCard: string) {
    const firstCardSymbolIndex = SYMBOLS.indexOf(
      firstCard.length > 2 ? firstCard[2] : firstCard[1]
    );
    const secondCardSymbolIndex = SYMBOLS.indexOf(
      secondCard.length > 2 ? secondCard[2] : secondCard[1]
    );
    if (firstCardSymbolIndex !== secondCardSymbolIndex) {
      return firstCardSymbolIndex - secondCardSymbolIndex;
    } else {
      const firstCardRankIndex = CARD_RANKS.indexOf(
        firstCard.length > 2 ? firstCard[0] + firstCard[1] : firstCard[0]
      );
      const secondCardRankIndex = CARD_RANKS.indexOf(
        secondCard.length > 2 ? secondCard[0] + secondCard[1] : secondCard[0]
      );
      return secondCardRankIndex - firstCardRankIndex;
    }
  });
}
