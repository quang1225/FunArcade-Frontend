export default function WheelOverviewPF() {
  return (
    <div>
      <div className="line">
        The first 8 digits of the hash are converted to decimal value and
        divided by the total possible outcomes (54) of the game. The remainder
        is the game result. Each segment on the wheel is represented by a number
        from 0 to 53 starting with 50x represented by 0, continuing in a
        clock-wise manner around the wheel.
      </div>
      <br />

      <pre>
        {`// Index per payout configuration
const PAYOUTS =  [50, 5, 2, 3, 2, 3, 2, 3, 2, 5,
                  2, 5, 2, 3, 2, 3, 2, 3, 2, 5,
                  2, 5, 2, 3, 2, 3, 2, 3, 2, 3,
                  2, 3, 2, 5, 2, 5, 2, 3, 2, 3,
                  2, 3, 2, 5, 2, 5, 2, 3, 2, 3,
                  2, 3, 2, 5]
// Game event translation
const spin = PAYOUT[float * 54];
`}
      </pre>
      <br />

      <div className="title">Lucky Jackpot</div>
      <div className="line">
        We use the same float (decimal value) to determine if the Lucky Jackpot
        has been activated. The float is divided by a base of 1,000,000,000, and
        if the remainder after division is lower than the specific result
        threshold, the Lucky Jackpot is activated.
      </div>
      <br />

      <div className="line">Chance to strike the Jackpot:</div>
      <div className="line">
        <b>White: 0.0144%</b>
      </div>
      <div className="line">
        <b>Red: 0.0147%</b>
      </div>
      <div className="line">
        <b>Blue: 0.015625%</b>
      </div>
      <div className="line">
        <b>Gold: 0.09375%</b>
      </div>
      <br />

      <div className="line">{`White: (number % 1000000000) < 144000;`}</div>
      <div className="line">{`Red: (number % 1000000000) < 147000;`}</div>
      <div className="line">{`Blue: (number % 1000000000) < 156250;`}</div>
      <div className="line">{`Gold: (number % 1000000000) < 937500;`}</div>
    </div>
  );
}
