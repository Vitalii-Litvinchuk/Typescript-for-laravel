import { Dispatch } from "react"
import { AuthActionTypes, AuthAction } from "../../types/auth"

export const unsetError = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.UNSET_ERROR });
    }
}