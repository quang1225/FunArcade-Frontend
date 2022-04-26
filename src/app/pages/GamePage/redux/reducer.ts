import produce from 'immer';
import {
  SET_CLICK_BET,
  SET_CLICK_CANCEL,
  SET_IS_BETTING,
  SET_GAME_HISTORY,
  SET_GAME_STATUS,
  SET_BETTED_USERS,
  SET_IS_PRE_BET,
  SET_BET_DATA,
  SET_AUTO_BET,
  SET_IS_LOADING_GAME,
  SET_AUTO_BET_LIST,
  SET_BET_DISABLED,
  SET_CASHOUT_DISABLED,
  SET_CASHOUT_AMOUNT,
  SET_DETECT_CLICK_GAMEPLAY,
  SET_DETECT_CLICK_GAME_CHAT,
  SET_EXPAND_MOBILE,
  SET_GAME_LIMITS,
  SET_BETTED_WALLET_ID,
  SET_CLICK_CONFIRM_AUTOBET,
  SET_SHOW_AUTOBET_POPUP,
} from './constants';
import {
  GamePageState,
  GamePageAction,
  GameStatus,
  BetData,
  GameLimits,
} from '../types';

export const initialState: GamePageState = {
  detectClickBet: false,
  detectClickCancel: false,
  detectClickConfirmAutobet: false,
  showAutobetPopup: false,
  isCashoutDisabled: false,
  isBetting: false,
  isBetDisabled: false,
  isLoadingGame: true,
  isPreBet: false,
  isAutoBet: false,
  gameHistory: [],
  gameStatus: {} as GameStatus,
  bettedUsers: [],
  betData: {} as BetData,
  cashoutAmount: 0,
  autoBetList: [],
  expandMobile: true,
  detectClickGameplay: false,
  detectClickGameChat: false,
  gameLimits: {} as GameLimits,
  bettedWalletId: '',
};

const gamePageReducer = (
  state: GamePageState = initialState,
  action: GamePageAction,
) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CLICK_BET:
        draft.detectClickBet = action.payload;
        break;
      case SET_CLICK_CANCEL:
        draft.detectClickCancel = action.payload;
        break;
      case SET_CLICK_CONFIRM_AUTOBET:
        draft.detectClickConfirmAutobet = action.payload;
        if (action.payload) {
          draft.showAutobetPopup = false;
        }
        break;
      case SET_SHOW_AUTOBET_POPUP:
        draft.showAutobetPopup = action.payload;
        break;
      case SET_CASHOUT_DISABLED:
        draft.isCashoutDisabled = action.payload;
        break;
      case SET_IS_BETTING:
        draft.isBetting = action.payload;
        break;
      case SET_BET_DISABLED:
        draft.isBetDisabled = action.payload;
        break;
      case SET_IS_LOADING_GAME:
        draft.isLoadingGame = action.payload;
        break;
      case SET_IS_PRE_BET:
        draft.isPreBet = action.payload;
        break;
      case SET_AUTO_BET:
        draft.isAutoBet = action.payload;
        break;
      case SET_GAME_HISTORY:
        draft.gameHistory = action.payload;
        break;
      case SET_GAME_STATUS:
        draft.gameStatus = action.payload;
        break;
      case SET_BETTED_USERS:
        draft.bettedUsers = action.payload;
        break;
      case SET_BET_DATA:
        draft.betData = action.payload;
        break;
      case SET_CASHOUT_AMOUNT:
        draft.cashoutAmount = action.payload;
        break;
      case SET_AUTO_BET_LIST:
        draft.autoBetList = action.payload;
        break;
      case SET_EXPAND_MOBILE:
        draft.expandMobile = action.payload;
        break;
      case SET_DETECT_CLICK_GAMEPLAY:
        draft.detectClickGameplay = action.payload;
        break;
      case SET_DETECT_CLICK_GAME_CHAT:
        draft.detectClickGameChat = action.payload;
        break;
      case SET_GAME_LIMITS:
        draft.gameLimits = action.payload;
        break;
      case SET_BETTED_WALLET_ID:
        draft.bettedWalletId = action.payload;
        break;
    }
  });

export default gamePageReducer;
