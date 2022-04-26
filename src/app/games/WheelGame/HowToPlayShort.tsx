import GameplayIcon from 'app/components/icons/GameplayIcon';

const HowToPlayShort = () => (
  <div>
    <div className="line">
      Place your bets on one or more colors, and if the arrow lands on your
      choice, you win!
      <br />
      <br />
      Every spin has a chance to trigger the Lucky Jackpot!
      <br />
      <br />
      <div className="yellow_text">
        <strong>
          To place your bet, simply enter a bet amount and click on any box
          (2x/3x/5x/50x) you want to bet on.
        </strong>
      </div>
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
