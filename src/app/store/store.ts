import { SET_AUTHENTICATED, SET_AUTHENTICATED_ADMIN, SET_UNAUTHENTICATED, UPDATED_CART, SET_UNAUTHENTICATED_ADMIN } from './types';

export interface IAppState {
  cart: any[];
  authenticated: boolean;
  authenticatedAsAdmin: boolean;
}

export const INITIAL_STATE: IAppState = {
  cart: [],
  authenticated: false,
  authenticatedAsAdmin: false,
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case UPDATED_CART:
      return { ...state, cart: action.body };
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case SET_AUTHENTICATED_ADMIN:
      return { ...state, authenticatedAsAdmin: true };
    case SET_UNAUTHENTICATED_ADMIN:
      return { ...state, authenticatedAsAdmin: false };
    default:
        return state;
  }
  return state;
}
