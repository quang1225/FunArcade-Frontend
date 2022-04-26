export default function RoadOverviewPF() {
  return (
    <div>
      <div className="line">
        A hash is generated for each level by combining client and server seeds
        with the game and round numbers. The first 8 digits of that hash are
        randomized, then multiplied by the number of columns in the selected
        mode to give us the position of the mine on that level.
      </div>
      <br />

      <div className="title">How to play:</div>
      <br />
      <div className="line">The following calculation is used:</div>
      <pre>const minesPosition = floor(float * MODES[“level”].columns)</pre>

      <div className="line">Easy: 4 columns</div>
      <div className="line">Hard: 3 columns</div>
      <div className="line">Crazy: 2 columns</div>
      <br />

      <div className="line">Array:</div>
      <pre>{`export const MODES = {
      easy: {
          columns: 4,
          rows: 9,
          multiplier: 1.29
      },

      medium: {
          columns: 3,
          rows: 9,
          multiplier: 1.44
      },
      hard: {
          columns: 2,
          rows: 9,
          multiplier: 1.88
      }
  };`}</pre>
    </div>
  );
}
