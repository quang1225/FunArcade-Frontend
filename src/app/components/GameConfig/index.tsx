import styled from 'styled-components';
import { TRANSITION_TIME } from 'utils/constants';
import CommonHr from '../common/CommonHr';
import CrescentMoonIcon from './crescent-moon.svg';
import MuteVolumeIcon from './volume-mute.svg';
import VolumeIcon from './volume.svg';
import MusicIcon from './music-icon.svg';
import MusicMuteIcon from './music-mute-icon.svg';

interface Props {
  onClickTheme: any;
  onClickVolume: any;
  onClickMusic: any;
  isDarkTheme: boolean;
  isMute: boolean;
  isMuteMusic: boolean;
}

interface CssProps {
  isMute: boolean;
  isDarkTheme: boolean;
}

const Wrapper = styled.div<CssProps>`
  width: 56px;
  height: 124px;
  background-color: var(--global--background-color-4);
  border-radius: 8px;
  padding: 8px;

  .theme-switch {
    background-color: ${props =>
      props.isDarkTheme ? 'var(--global--background-color)' : 'white'};
    border-radius: 48px;
    width: 40px;
    height: 24px;
    display: flex;
    cursor: pointer;
    padding: 4px;
    align-items: center;
    .icon-wrap {
      background-color: var(--global--button-color);
      border-radius: 48px;
      width: 16px;
      height: 16px;
      margin-left: ${props => !props.isDarkTheme && '16px'};
      transition: margin ${TRANSITION_TIME}s;
      display: flex;
      align-items: center;
      justify-content: center;

      .moon {
        width: 12px;
        height: 12px;
        border-radius: 48px;
        transition: background ${TRANSITION_TIME}s;
        background: ${props =>
          props.isDarkTheme ? `url(${CrescentMoonIcon})` : '#ffe37e'};
      }
    }
  }

  .volume-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .icon-wrap {
      background-color: var(--global--background-color);
      border-radius: 48px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        transition: background ${TRANSITION_TIME}s;
      }

      .speaker-icon {
        transition: background ${TRANSITION_TIME}s;
        width: 14.5px;
        height: 12px;
      }

      .music-icon {
        transition: background ${TRANSITION_TIME}s;
        width: 12px;
        height: 12px;
      }
    }
  }

  @media (max-width: 768px) {
    width: 46px;

    .theme-switch {
      margin-left: -5px;
    }
  }
`;

const GameConfig = (props: Props) => {
  const {
    onClickTheme,
    onClickVolume,
    onClickMusic,
    isDarkTheme,
    isMute,
    isMuteMusic,
  } = props;

  return (
    <Wrapper isDarkTheme={isDarkTheme} isMute={isMute}>
      <div className="theme-switch" onClick={onClickTheme}>
        <div className="icon-wrap">
          <div className="moon" />
        </div>
      </div>

      <CommonHr marginTop={8} marginBottom={8} />

      <div className="volume-switch" onClick={onClickVolume}>
        <div className="icon icon-wrap">
          <div
            className="speaker-icon"
            style={{
              background: `url(${isMute ? MuteVolumeIcon : VolumeIcon})`,
            }}
          />
          <img
            src={MuteVolumeIcon}
            width="0"
            height="0"
            alt="Mute Volume Icon Preload"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <CommonHr marginTop={8} marginBottom={8} />

      <div className="volume-switch" onClick={onClickMusic}>
        <div className="icon-wrap">
          <div
            className="icon music-icon"
            style={{
              background: `url(${isMuteMusic ? MusicMuteIcon : MusicIcon})`,
            }}
          />
          <img
            src={MusicMuteIcon}
            width="0"
            height="0"
            alt="Mute Music Icon Preload"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default GameConfig;
