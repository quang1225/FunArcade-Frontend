export default function JackpotOverviewPF() {
  return (
    <div>
      <div className="line">
        HiLo is a fast paced game of exponential profits. The game is simple,
        pick your cards right and see your money multiply fast!
      </div>
      <br />

      <div className="title">How to play:</div>
      <div className="line">
        Place a bet, and choose the option of whether the next card is Higher or
        Lower than the face card.
      </div>
      <div className="line">
        Once you've chosen the direction, pick from any of the three cards and
        click on it to reveal the value of the card. In case of King or Ace, the
        option is to choose between same or Higher/Lower.
      </div>
      <div className="line">
        Each bet and profit is multiplied until you choose to cash out. You may
        cash out at any time after the first round.
      </div>
      <br />

      <div className="title">What are the order of the cards?</div>
      <div className="line">
        The order of the cards , in descending order are:
      </div>
      <div className="line">
        King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2, A
      </div>
      <div className="line">The suits of the card do not matter.</div>
      <div className="line">
        Each time you draw a card, it comes from a complete new set of 52 cards,
        hence it is possible to draw the exact same card as the face card on the
        table (example: Face card is King of spades, chosen card is also King of
        spades).
      </div>
      <br />

      <div className="title">What is Max Win?</div>
      <div className="line">
        Max Win is the most that a player can cash out in a single game of Hilo.
      </div>
      <div className="line">
        If your next bet in the chosen direction will cause max win amount to be
        exceeded, the bet option button will state “Exceeds Max Win” and cannot
        be clicked. If both options exceed max win amount, player has to cash
        out to end the current game.
      </div>
      <br />

      <div className="title">How do I know this game is fair?</div>
      <div className="line">
        We use Provably Fair technology to resolve all our game results, hence
        the 3 option cards are predetermined, and may not be altered before or
        during the game.
      </div>
      <br />
    </div>
  );
}
