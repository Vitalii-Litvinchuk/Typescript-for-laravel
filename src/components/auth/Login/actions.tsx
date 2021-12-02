import {
    ILoginResponse, ILoginModel,
} from './types';
import { Dispatch } from "react";
import http from '../../../http_common';
import { AuthActionTypes, AuthAction } from '../../../types/auth';

export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH });
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            dispatch({ type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: response.data.user, token: response.data.access_token });
        }
        catch (error) {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH_ERROR, payload: "Неправильна пошта або пароль." });
        }
    }
}