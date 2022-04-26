const HowToPlayCrash = () => (
  <div>
    <div className="line">
      Crash is an online multiplayer gambling game consisting of an increasing
      curve that can crash anytime. It's fun, simple and thrilling!
    </div>
    <br />

    <div className="title">How does it work?</div>
    <div className="line">
      Place a bet and watch the multiplier increase from 1x upwards! Cash out
      any time to get your bet multiplied by that number. But be careful because
      the game can bust at any time, and if you haven’t cashed out by then,
      you'll get nothing!
    </div>
    <br />

    <div className="title">What is Auto Cash Out?</div>
    <div className="line">
      Key in a number, and the system will automatically cash your bet out once
      the multiplier hits that number. This saves you from having to cash out
      manually if you already have a profit target in mind. If you do not wish
      to make use of the Auto Cash Out feature, simply input a very high number
      into the field.
    </div>
    <br />

    <div className="title">What is Auto Bet?</div>
    <div className="line">
      Auto bet allows you to automatically make repeat bets for each game
      without needing to press "Place Bet" each time. You can use this if you
      have to be away from the computer but don't want to miss any games.
      Activate by toggling the "Start Auto Bet" button to green. Once Auto bet
      feature is activated, it will remain active until the button is toggled
      off again or you leave the game.
    </div>
    <br />

    <div className="title">What is Max Win?</div>
    <div className="line">
      The Max Win amount is the most that a player can cash out in a single game
      of Crash. If user hits Max Win amount in game, his bet will be
      automatically cashed out.
    </div>
    <br />

    <div className="title">How high can the multiplier go?</div>
    <div className="line">
      The highest possible number is 4,458,563,631,096,790.00X. But this is
      unlikely to ever be reached.
    </div>
    <br />

    <div className="title">What happens if I disconnect in a game?</div>
    <div className="line">
      If you have bet on the game and get disconnected, our server will
      automatically cash you out at the moment you disconnect. If the Crash has
      not happened, you will win your bet at the multiplier value of the moment.
    </div>
    <br />
  </div>
);

export default HowToPlayCrash;
