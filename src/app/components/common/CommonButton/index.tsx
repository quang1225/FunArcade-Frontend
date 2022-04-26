import Button from '@mui/material/Button';
import styled from 'styled-components';

interface Props {
  className?: string;
  text?: any;
  onClick?: any;
  customColor?: string;
  background?: string;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
  fontWeight?: number;
  fontSize?: number;
  borderRadius?: number;
  noPadding?: boolean;
  icon?: any;
  type?: any;
}

const CustomButton = styled(Button)<Props>`
  text-transform: none !important;
  padding: 6px 12px !important;
  width: ${props =>
    props.width === '100%'
      ? props.width
      : props.width
      ? `${props.width}px`
      : 'unset'};
  min-width: unset !important;
  height: ${props => props.height || 40}px;
  min-height: ${props => props.height || 40}px;
  font-weight: ${props => props.fontWeight || 500};
  font-size: ${props => props.fontSize || 16}px;
  color: ${props => props.customColor || 'white'} !important;
  background-color: ${props =>
    props.disabled
      ? 'var(--global--text-color-2)'
      : props =>
          props.background || 'var(--global--background-color-3)'} !important;
  border-radius: ${props => props.borderRadius || 24}px !important;
  ${props => (props.noPadding ? 'padding: 0 !important;' : '')}

  &:hover {
    filter: brightness(85%);
  }

  &.glow {
    animation: glowBackground 0.7s infinite alternate;
    @keyframes glowBackground {
      0% {
        filter: brightness(70%);
      }
      100% {
        filter: brightness(100%);
      }
    }
  }

  .icon-btn {
    margin-right: 6px;
  }
`;

const CommonButton = (props: Props) => (
  <CustomButton variant="contained" {...props} disableRipple>
    {props.icon && <div className="icon-btn">{props.icon}</div>} {props.text}
  </CustomButton>
);

export default CommonButton;
