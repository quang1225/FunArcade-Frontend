import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import CloseIcon from '../icons/CloseIcon';
import SelectCurrency from '../SelectCurrency';

interface Props {
  title?: any;
  children?: any;
  onClose?: any;
  padding?: string;
  className?: string;
  draggable?: boolean;
  noHeader?: boolean;
  secondHeader?: boolean;
  currencyId?: number;
  setCurrencyId?: Dispatch<SetStateAction<number | undefined>>;
}

const BoxWrap = styled.div`
  background: var(--global--background-color-4);
  box-shadow: 0px 10px 30px rgba(0, 26, 37, 0.5);
  border-radius: 16px;
  color: white;
  font-size: 14px;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .close-btn {
    cursor: pointer;
    position: absolute;
    right: 14px;
    top: 14px;

    &:hover {
      svg path {
        stroke: var(--global--background-color-3);
      }
    }
  }

  .box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--global--background-color-2);
    padding: 16px 24px 10px 24px;
    border-radius: 16px 16px 0px 0px;
    font-weight: bold;
    font-size: 16px;

    &.second_header {
      background: none;
      border-bottom: 2px solid var(--global--background-color-2);
    }
  }

  .box-content {
    overflow-y: auto;
    height: 100%;
  }
`;

const ContentBox = (props: Props) => {
  const {
    onClose,
    padding,
    children,
    title,
    className = '',
    draggable,
    noHeader,
    secondHeader,
    currencyId,
    setCurrencyId,
  } = props;

  return (
    <BoxWrap className={`box-wrap ${className}`}>
      {onClose && (
        <div className="close-btn" onClick={onClose}>
          <CloseIcon />
        </div>
      )}
      {!noHeader && (
        <div
          className={`box-header ${secondHeader ? 'second_header' : ''}`}
          id="draggable-area"
          style={{ cursor: draggable ? 'move' : 'unset' }}
        >
          <div className="title">{title}</div>
          {setCurrencyId && (
            <SelectCurrency
              currencyId={currencyId || 0}
              setCurrencyId={setCurrencyId}
            />
          )}
        </div>
      )}
      <div className="box-content" style={{ padding: padding || 24 }}>
        {children}
      </div>
    </BoxWrap>
  );
};

export default ContentBox;
