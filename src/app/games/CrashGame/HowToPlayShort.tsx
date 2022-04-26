import GameplayIcon from 'app/components/icons/GameplayIcon';

const HowToPlayShort = () => (
  <div>
    <div className="line">
      Place a bet and watch the multiplier increase from 1x upwards! Cash out
      any time to get your bet multiplied by that number.
      <br />
      <br />
      But be careful - if you don't cash out before the crash, you get nothing!
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
