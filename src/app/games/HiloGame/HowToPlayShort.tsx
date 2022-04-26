import GameplayIcon from 'app/components/icons/GameplayIcon';

const HowToPlayShort = () => (
  <div>
    <div className="line">
      Place your bet and predict if the next card will be higher or lower.
      <br />
      <br />
      There are 3 cards to pick from every round, click on the card you choose
      to see the result.
      <br />
      <br />
      Snowball your winnings in this fast-paced prediction game!
      <br />
      <br />
      For more information about this game, press{' '}
      <span className="icon_next_to_text">
        <GameplayIcon />
      </span>{' '}
      on top right of the screen.
    </div>
  </div>
);

export default HowToPlayShort;
