import { UPDATED_CART } from './actions';

export interface IAppState {
    cart: any[];
}

export const INITIAL_STATE:IAppState = {
    cart: [],
}

export function rootReducer(state:IAppState,action): IAppState {

    switch(action.type) {
        case UPDATED_CART :
            return { cart : action.body}

    }
    return state;
}