import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  text: string;
  lineNumber: number;
  className?: string;
}

const TextWrap: any = styled.div`
  ${(props: Props) => `
    span {
      display: -webkit-box;
      -webkit-line-clamp: ${props.lineNumber};
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `};
`;

const EllipsisText = (props: Props) => (
  <TextWrap className={props.className || ''} lineNumber={props.lineNumber}>
    <Tooltip title={props.text} placement="top" arrow>
      <span>{props.text}</span>
    </Tooltip>
  </TextWrap>
);

export default EllipsisText;
