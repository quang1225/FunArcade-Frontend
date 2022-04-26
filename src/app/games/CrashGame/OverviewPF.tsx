export default function CrashOverviewPF() {
  return (
    <div>
      <div className="line">
        The client and server seeds are hashed, and the first 8 digits of the
        resulting hash are taken and converted to a decimal value. We then use
        the formula:
      </div>
      <br />

      <div className="line">
        4294967296 / (<b>decimal value</b> + 1) * (1 - 0.01)
      </div>
      <br />

      <div className="line">to determine the crash point of the round.</div>
      <br />

      <div className="title">Hash to game result formula:</div>
      <pre>
        {`const gameHash = hashChain.pop()

const hmac = createHmac('sha256', gameHash);

// blockHash is the hash of bitcoin block insert chosen block here, and also the resulting hash.

hmac.update(blockHash);

const hex = hmac.digest('hex').substr(0, 8);
const int = parseInt(hex, 16);

// 0.01 will result in 1% house edge with a lowest crashpoint of 1

const crashpoint = Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.01))
`}
      </pre>
    </div>
  );
}
