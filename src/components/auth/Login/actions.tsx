import {
    ILoginResponse, ILoginModel,
} from './types';
import { Dispatch } from "react";
import http from '../../../http_common';
import { AuthActionTypes, AuthAction, ServerAuthError } from '../../../types/auth';
import axios, { AxiosError } from "axios";


export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH });
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            dispatch({ type: AuthActionTypes.LOGIN_AUTH_SUCCESS, payload: response.data.user, token: response.data.access_token });
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerAuthError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}