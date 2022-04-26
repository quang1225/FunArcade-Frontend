import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';

export const useInjectReducer = ({ key, reducer }) =>
  useReducer({ key, reducer });

export const useInjectSaga = ({ key, saga }) => useSaga({ key, saga });
