import EasyBtn from './assets/easy.svg';
import GameplayIcon from 'app/components/icons/GameplayIcon';

const HowToPlayShort = () => (
  <div>
    <div className="line">
      Start your journey on the Road to Riches and navigate your way to the top!
      1 mine is hidden in each row, avoid it to make it to the next stage. Clear
      all 9 levels to achieve the ultimate profit!
      <br />
      <br />
      Click on the <img src={EasyBtn} alt="Easy Button" width="100" /> button at
      the top of the board to choose between 3 difficulty levels – Easy, Hard
      and Crazy
      <br />
      <br />
      The harder the difficulty, the richer the prize !
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
