export default function HiloOverviewPF() {
  return (
    <div>
      <div className="line">
        A hash is generated for each round of play, by combining the client and
        server seeds with the game and round numbers. The first 24 digits of the
        hash are taken and separated into 3 parts of 8 digits each. Each part
        represents one of three cards that the user may select during play.
      </div>
      <br />

      <div className="title">Example:</div>
      <div className="line">
        <span style={{ color: 'red' }}>ba7816bf</span>
        <span style={{ color: 'lightblue' }}>8f01cfea</span>
        <span style={{ color: 'lightgreen' }}>414140de</span>
        5dae2223b00361a396177a9cb410ff61f20015ad
      </div>
      <br />

      <div className="line">
        Card 1: <span style={{ color: 'red' }}>ba7816bf</span>
      </div>
      <div className="line">
        Card 2: <span style={{ color: 'lightblue' }}>8f01cfea</span>
      </div>
      <div className="line">
        Card 3: <span style={{ color: 'lightgreen' }}>414140de</span>
      </div>
      <br />

      <div className="line">
        The digits of each part are then randomized, and this formula:
      </div>
      <div className="line">
        <b>floor( result* 52 ) + 1</b>
      </div>
      <div className="line">
        is then used to arrive at a result from 1 – 52.
      </div>
      <br />

      <div className="title">Index of 1 to 52: ♥A to ♠K</div>
      <pre>{`const CARDS = [
    1 – 13: ♥A, ♥2, ♥3 ♥4, ♥5, ♥6, ♥7 ♥8, ♥9, ♥10, ♥J ♥Q, ♥K,
    14 – 26: ♦A, ♦2, ♦3, ♦4, ♦5, ♦6, ♦7, ♦8, ♦9, ♦10, ♦J, ♦Q, ♦K,
    27 – 39: ♣A, ♣2, ♣3, ♣4, ♣5, ♣6, ♣7, ♣8, ♣9, ♣10, ♣J, ♣Q, ♣K,
    40 – 52: ♠A, ♠2, ♠3, ♠4, ♠5, ♠6, ♠7, ♠8, ♠9, ♠10, ♠J, ♠Q, ♠K,
  ];`}</pre>
      <br />

      <div className="title">Game event translation</div>
      <div className="line">const card = CARDS[Math.floor(float * 52)];</div>
      <br />
    </div>
  );
}
