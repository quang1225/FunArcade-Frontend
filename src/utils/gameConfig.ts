import CrashGame from 'app/games/CrashGame/Loadable';
import CrashIcon from 'app/images/games/icon-crash.svg';
import CrashGameCard from 'app/images/games/banner-crash.svg';
import CrashMenu from 'app/games/CrashGame/RightMenuGame';
import CrashHowToPlay from 'app/games/CrashGame/HowToPlay';
import CrashHowToPlayShort from 'app/games/CrashGame/HowToPlayShort';
import CrashHistoryHead from 'app/games/CrashGame/TableHistoryHead';
import CrashHistoryBody from 'app/games/CrashGame/TableHistoryBody';
import CrashResultBox from 'app/games/CrashGame/ResultBox';
import CrashOverviewPF from 'app/games/CrashGame/OverviewPF';

import WheelGame from 'app/games/WheelGame/Loadable';
import WheelIcon from 'app/images/games/icon-wheel.svg';
import WheelGameCard from 'app/images/games/banner-wheel.svg';
import WheelMenu from 'app/games/WheelGame/RightMenuGame';
import WheelHowToPlay from 'app/games/WheelGame/HowToPlay';
import WheelHowToPlayShort from 'app/games/WheelGame/HowToPlayShort';
import WheelHistoryHead from 'app/games/WheelGame/TableHistoryHead';
import WheelHistoryBody from 'app/games/WheelGame/TableHistoryBody';
import WheelResultBox from 'app/games/WheelGame/ResultBox';
import WheelOverviewPF from 'app/games/WheelGame/OverviewPF';

import HiloGame from 'app/games/HiloGame/Loadable';
import HiloIcon from 'app/images/games/icon-hilo.svg';
import HiloGameCard from 'app/images/games/banner-hilo.svg';
import HiloMenu from 'app/games/HiloGame/RightMenuGame';
import HiloHowToPlay from 'app/games/HiloGame/HowToPlay';
import HiloHowToPlayShort from 'app/games/HiloGame/HowToPlayShort';
import HiloHistoryHead from 'app/games/HiloGame/TableHistoryHead';
import HiloHistoryBody from 'app/games/HiloGame/TableHistoryBody';
import HiloResultBox from 'app/games/HiloGame/ResultBox';
import HiloOverviewPF from 'app/games/HiloGame/OverviewPF';

import RoadGame from 'app/games/RoadToRichesGame/Loadable';
import RoadIcon from 'app/images/games/icon-road.svg';
import RoadGameCard from 'app/images/games/banner-road.svg';
import RoadMenu from 'app/games/RoadToRichesGame/RightMenuGame';
import RoadHowToPlay from 'app/games/RoadToRichesGame/HowToPlay';
import RoadHowToPlayShort from 'app/games/RoadToRichesGame/HowToPlayShort';
import RoadHistoryHead from 'app/games/RoadToRichesGame/TableHistoryHead';
import RoadHistoryBody from 'app/games/RoadToRichesGame/TableHistoryBody';
import RoadResultBox from 'app/games/RoadToRichesGame/ResultBox';
import RoadOverviewPF from 'app/games/RoadToRichesGame/OverviewPF';

import JackpotGame from 'app/games/JackpotGame/Loadable';
import JackpotIcon from 'app/images/games/icon-jackpot.svg';
import JackpotGameCard from 'app/images/games/banner-jackpot.svg';
import JackpotMenu from 'app/games/JackpotGame/RightMenuGame';
import JackpotHowToPlay from 'app/games/JackpotGame/HowToPlay';
import JackpotHowToPlayShort from 'app/games/JackpotGame/HowToPlayShort';
import JackpotHistoryHead from 'app/games/JackpotGame/TableHistoryHead';
import JackpotHistoryBody from 'app/games/JackpotGame/TableHistoryBody';
import JackpotResultBox from 'app/games/JackpotGame/ResultBox';
import JackpotOverviewPF from 'app/games/JackpotGame/OverviewPF';

import DiceGame from 'app/games/DiceGame/Loadable';
import DiceIcon from 'app/images/games/icon-dice.svg';
import DiceGameCard from 'app/images/games/banner-dice.svg';

import { GameProps } from 'app/appTypes';

const color0 = '#FFFEF8';
const color1 = '#e34133';
const color2 = '#1cbaff';
const color3 = '#ffc700';
export const LIST_COLOR_WHEEL = [color0, color1, color2, color3];

const whiteStr = '2x';
const redStr = '3x';
const blueStr = '5x';
const yellowStr = '50x';
export const LIST_CHOICE_WHEEL = [whiteStr, redStr, blueStr, yellowStr];

export const WHEEL_RESULT = [
  [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
    42, 44, 46, 48, 50, 52,
  ],
  [3, 5, 7, 13, 15, 17, 23, 25, 27, 29, 31, 37, 39, 41, 47, 49, 51],
  [1, 9, 11, 19, 21, 33, 35, 43, 45, 53],
  [0],
];

export const ROAD_LEVELS = [
  {
    value: 'EASY',
    config: {
      collumns: 4,
      winingCollumns: 1,
      rows: 9,
      multiplier: 1.29,
    },
  },
  {
    value: 'MEDIUM',
    config: {
      collumns: 3,
      winingCollumns: 1,
      rows: 9,
      multiplier: 1.44,
    },
  },
  {
    value: 'HARD',
    config: {
      collumns: 2,
      winingCollumns: 1,
      rows: 9,
      multiplier: 1.88,
    },
  },
];

export const CRASH_GAME_SLUG = 'crash';
export const WHEEL_GAME_SLUG = 'wheel';
export const JACKPOT_GAME_SLUG = 'jackpot';
export const DICE_GAME_SLUG = 'dice-roll';
export const HILO_GAME_SLUG = 'hilo';
export const ROAD_GAME_SLUG = 'road';

export const GAME_LIST: GameProps[] = [
  {
    slug: CRASH_GAME_SLUG,
    name: 'Crash',
    url: '/multiplayer/' + CRASH_GAME_SLUG,
    icon: CrashIcon,
    isSingle: false,
    cardImage: CrashGameCard,
    howToPlay: CrashHowToPlay,
    howToPlayShort: CrashHowToPlayShort,
    component: CrashGame,
    rightMenu: CrashMenu,
    historyHead: CrashHistoryHead,
    historyBody: CrashHistoryBody,
    resultBox: CrashResultBox,
    overviewPF: CrashOverviewPF,
    gameRatio: 2 / 1,
  },
  {
    slug: WHEEL_GAME_SLUG,
    name: 'Wheel Of Fortune',
    url: '/multiplayer/' + WHEEL_GAME_SLUG,
    icon: WheelIcon,
    isSingle: false,
    cardImage: WheelGameCard,
    howToPlay: WheelHowToPlay,
    howToPlayShort: WheelHowToPlayShort,
    component: WheelGame,
    rightMenu: WheelMenu,
    historyHead: WheelHistoryHead,
    historyBody: WheelHistoryBody,
    resultBox: WheelResultBox,
    overviewPF: WheelOverviewPF,
    gameRatio: 0,
    hideExpandMenuMobile: true,
    noBetButton: true,
  },
  {
    slug: HILO_GAME_SLUG,
    name: 'Hilo',
    url: '/single-player/' + HILO_GAME_SLUG,
    icon: HiloIcon,
    isSingle: true,
    cardImage: HiloGameCard,
    howToPlay: HiloHowToPlay,
    howToPlayShort: HiloHowToPlayShort,
    component: HiloGame,
    rightMenu: HiloMenu,
    historyHead: HiloHistoryHead,
    historyBody: HiloHistoryBody,
    resultBox: HiloResultBox,
    overviewPF: HiloOverviewPF,
    gameRatio: 2 / 1,
  },
  {
    slug: ROAD_GAME_SLUG,
    name: 'Road To Riches',
    url: '/single-player/' + ROAD_GAME_SLUG,
    icon: RoadIcon,
    isSingle: true,
    cardImage: RoadGameCard,
    howToPlay: RoadHowToPlay,
    howToPlayShort: RoadHowToPlayShort,
    component: RoadGame,
    rightMenu: RoadMenu,
    historyHead: RoadHistoryHead,
    historyBody: RoadHistoryBody,
    resultBox: RoadResultBox,
    overviewPF: RoadOverviewPF,
    noControls: true,
    fullCanvasMobile: true,
    gameRatio: 2 / 1,
  },
  {
    slug: JACKPOT_GAME_SLUG,
    name: 'Jackpot',
    url: '/multiplayer/' + JACKPOT_GAME_SLUG,
    icon: JackpotIcon,
    isSingle: false,
    cardImage: JackpotGameCard,
    howToPlay: JackpotHowToPlay,
    howToPlayShort: JackpotHowToPlayShort,
    component: JackpotGame,
    rightMenu: JackpotMenu,
    historyHead: JackpotHistoryHead,
    historyBody: JackpotHistoryBody,
    resultBox: JackpotResultBox,
    overviewPF: JackpotOverviewPF,
    fullCanvasMobile: true,
    gameRatio: 2 / 1,
  },
  {
    slug: DICE_GAME_SLUG,
    name: 'Dice Roll',
    url: '/single-player/' + DICE_GAME_SLUG,
    icon: DiceIcon,
    isSingle: true,
    cardImage: DiceGameCard,
    howToPlay: JackpotHowToPlay,
    howToPlayShort: JackpotHowToPlayShort,
    component: DiceGame,
    rightMenu: JackpotMenu,
    historyHead: JackpotHistoryHead,
    historyBody: JackpotHistoryBody,
    resultBox: JackpotResultBox,
    overviewPF: JackpotOverviewPF,
    fullCanvasMobile: true,
    gameRatio: 2 / 1,
  },
];

export const SINGLE_GAME_LIST = GAME_LIST.filter(x => x.isSingle && !x.isTest);

export const MULTI_GAME_LIST = GAME_LIST.filter(x => !x.isSingle && !x.isTest);

export const USER_HISTORY_LENGTH = 10;

function importAll(r) {
  let images = [] as any;
  r.keys().forEach(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export const HiloCardImgs = importAll(
  require.context('app/images/game-cards', false, /\.(png|jpe?g|svg)$/),
);

export const ERROR_MESSAGES = {
  EXCEED_MAX_BET: 'you have exceeded maximum bet',
};
