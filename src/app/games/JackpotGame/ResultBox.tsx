import { ResultBoxProps } from 'app/appTypes';
import FairResultGame from 'app/components/FairResultGame';

const ResultBox = (props: ResultBoxProps) => {
  const { calResult } = props;

  return (
    <FairResultGame image={''} backgroundSize="160px 160px">
      {calResult}x
    </FairResultGame>
  );
};

export default ResultBox;
