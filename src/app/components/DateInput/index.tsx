import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { dateInputFormat } from 'utils/constants';
import CommonField from '../common/CommonField';

interface Props {
  label?: string;
  value: string;
  onChange: (date: string) => void;
}

const Wrapper = styled(CommonField)`
  width: 220px;

  input {
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(1);
    }
  }
`;

export default function DateInput(props: Props) {
  const { label, value, onChange } = props;

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
    try {
      onChange(new Date(e.target.value).toISOString());
    } catch (error) {
      onChange(new Date().toISOString());
    }
  };

  return (
    <Wrapper
      className="date_input"
      type="date"
      label={label}
      value={dateInputFormat(value ? new Date(value) : new Date())}
      onChange={onChangeInput}
    />
  );
}
