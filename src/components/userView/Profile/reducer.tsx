import { IProfileState, ProfileAction, ProfileActionTypes } from "./types";

const initialState: IProfileState = {
    user: null,
    loaded: false,
    loading: false
}

export const profileReducer = (state = initialState, action: ProfileAction) => {
    switch (action.type) {
        case ProfileActionTypes.GET_USER_INFO:
            return {
                user: action.user,
                loaded: true,
                loading: false
            }
        case ProfileActionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}
