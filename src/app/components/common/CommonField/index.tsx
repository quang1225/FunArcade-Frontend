import { messages } from 'app/pages/HomePage/messages';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props {
  name?: string;
  className?: string;
  label?: string;
  afterLabel?: string;
  checked?: boolean;
  value?: string | number;
  type: 'text' | 'number' | 'date' | 'password' | 'email';
  onChange?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  leftTextOrIcon?: JSX.Element | string;
  rightTextOrIcon?: JSX.Element | string;
  onClickRightTextOrIcon?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  pattern?: string;
  defaultValue?: string | number;
  style?: any;
  borderRadius?: number;
  onEnter?: () => void;
  rightBtnText?: string;
  onClickRightBtn?: () => void;
}

const CustomField = styled.div`
  position: relative;

  .left_icon {
    position: absolute;
    top: 7px;
    left: 12px;
  }

  .right_btn {
    position: absolute;
    background-color: #1659d4;
    border-radius: 8px;
    right: 0;
    top: 29px;
    display: flex;
    align-items: center;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #0b45b1;
    }
  }

  input,
  .right_btn {
    height: 36px;
  }

  .input_wrap {
    display: flex;
    align-items: center;
    background: var(--global--background-color-2);
    transition: all 0.5s;
    border: 2px solid var(--global--background-color-2);

    &:focus-within {
      border: 2px solid var(--global--background-color-3);
    }
  }

  input {
    display: flex;
    align-items: center;
    flex: 1;
    outline: none;
    box-sizing: border-box;
    color: white;
    font-size: 14px;
    border: 2px solid transparent;
    background-color: transparent;
    padding: 0 12px;
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &.glow input {
    animation: glowBorder 0.7s infinite alternate;

    @keyframes glowBorder {
      0% {
        border: 2px solid rgba(255, 218, 87, 0.5);
      }
      100% {
        border: 2px solid rgba(255, 218, 87, 1);
      }
    }
  }

  &.glow_2 input {
    animation: glowBorder2 800ms ease-out infinite alternate;
    outline: none;

    @keyframes glowBorder2 {
      0% {
        border: 2px solid rgba(255, 218, 87, 0.5);
        box-shadow: 0 0 5px rgba(255, 218, 87, 0.2),
          inset 0 0 5px rgba(255, 218, 87, 0.1);
      }
      100% {
        border: 2px solid rgba(255, 218, 87, 1);
        box-shadow: 0 0 20px rgba(255, 218, 87, 0.6),
          inset 0 0 10px rgba(255, 218, 87, 0.4);
      }
    }
  }
`;

const CommonField = (props: Props) => {
  const {
    type,
    name,
    value,
    leftTextOrIcon,
    rightTextOrIcon,
    onClickRightTextOrIcon,
    label,
    afterLabel = '',
    onChange,
    onKeyPress,
    disabled,
    placeholder,
    required,
    pattern,
    defaultValue,
    style,
    readonly,
    borderRadius,
    className,
    onEnter,
    rightBtnText,
    onClickRightBtn,
  } = props;
  const { t } = useTranslation();

  const onEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter && onEnter();
      e.currentTarget.blur();
    }
  };

  return (
    <CustomField className={'custom-field ' + (className || '')} style={style}>
      {label && <label htmlFor={name}>{label + afterLabel}</label>}
      <div
        className="input_wrap"
        style={{
          paddingLeft: leftTextOrIcon && 12,
          paddingRight: rightTextOrIcon && 12,
          cursor: disabled || readonly ? 'unset' : '',
          borderRadius: borderRadius || 8,
        }}
      >
        {leftTextOrIcon && <div className="left_icon">{leftTextOrIcon}</div>}
        <input
          className="global_transition"
          style={{
            cursor: disabled || readonly ? 'unset' : '',
          }}
          type={type || 'text'}
          name={name}
          value={value}
          defaultValue={defaultValue}
          pattern={pattern}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
          placeholder={
            !readonly
              ? placeholder
                ? placeholder
                : label
                ? `${t(...messages.inputYour())} ${label}`
                : ''
              : ''
          }
          required={required}
          onKeyPress={onKeyPress}
          onKeyDown={onEnterInput}
        />
        {rightTextOrIcon && (
          <div
            style={{ cursor: onClickRightTextOrIcon ? 'pointer' : 'unset' }}
            onClick={onClickRightTextOrIcon}
          >
            {rightTextOrIcon}
          </div>
        )}
        {rightBtnText && (
          <div
            className="right_btn global_transition"
            onClick={onClickRightBtn}
          >
            {rightBtnText}
          </div>
        )}
      </div>
    </CustomField>
  );
};

export default CommonField;
