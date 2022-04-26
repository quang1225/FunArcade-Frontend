const HowToPlayWheel = () => (
  <div>
    <div className="line">
      Wheel of Fortune is an online multiplayer gambling game consisting of a
      wheel of 4 colors, each with a different payout. The 4 Color Lucky Jackpot
      makes it even more exciting, with the potential for a big payday!
    </div>
    <br />

    <div className="title">How does it work?</div>
    <div className="line">
      Place a bet on one or more colors, and if the arrow lands on your color,
      you win! Will you go for the safe bets, or go for 50X with gold?
    </div>
    <br />

    <div className="title">What is 4 Color Lucky Jackpot?</div>
    <div className="line">
      Each individual Jackpot consists of a percentage of all bets placed on the
      Wheel on the corresponding color.
    </div>
    <br />

    <div className="line">Gold: 3% of bets placed</div>
    <div className="line">Blue: 3% of bets placed</div>
    <div className="line">Red: 2% of bets placed</div>
    <div className="line">White: 1% of bets placed</div>
    <br />

    <div className="line">
      The amount contributed to the Jackpot is not deducted from your bet.
    </div>
    <div className="line">
      Each roll of the Wheel has a fixed chance of triggering the Jackpot for
      that color, as follows:
    </div>
    <br />

    <div className="line">Gold: 0.09375%</div>
    <div className="line">Blue: 0.015625%</div>
    <div className="line">Red: 0.0147%</div>
    <div className="line">White: 0.0144%</div>
    <br />

    <div className="line">
      If the Jackpot triggers, it gets split between all of the players that bet
      on that color in that specific round in ratio of bet size.
    </div>
    <br />

    <div className="line">EXAMPLE:</div>
    <div className="line">
      Your bet is 3% from the total bets in that round, so you would be getting
      3% of the Jackpot (360 USD).
    </div>
    <div className="line">
      You bet 45 USD on Blue and the total amount of bets on Blue in the winning
      round is 1500 USD. The jackpot is 12,000 USD.
    </div>
    <div className="line">
      Your total wins for this round would be 225 USD (Blue Win) + 360 USD
      (Jackpot Win) = 585 USD.
    </div>
    <br />

    <div className="title">What is Auto Bet?</div>
    <div className="line">
      Auto bet allows you to automatically make repeat bets for each game
      without needing to press "Place Bet" each time. You can use this if you
      have to be away from the computer but don't want to miss any games.
      Activate by toggling the "Start Auto Bet" button to green. You can use
      Auto bet to place bets on multiple colors. Once Auto bet feature is
      activated, it will remain active until the button is toggled off again or
      you leave the game.
    </div>
    <br />

    <div className="title">
      What happens if I disconnect after I’ve placed a bet?
    </div>
    <div className="line">
      All our bets are handled server-side, so even if you disconnect, your
      profits from winning bets will be added to your balance.
    </div>
    <br />
  </div>
);

export default HowToPlayWheel;
