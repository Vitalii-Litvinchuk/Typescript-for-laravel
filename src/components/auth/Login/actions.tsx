import {
    ILoginResponse, ILoginModel,
} from './types';
import { Dispatch } from "react";
import http from '../../../http_common';
import { AuthActionTypes, AuthAction, ServerAuthError, IUser } from '../../../types/auth';
import axios, { AxiosError } from "axios";
import jwt from 'jsonwebtoken';


export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGIN_AUTH });
            const response = await http.post<ILoginResponse>('api/auth/login', data);
            const { access_token } = response.data;
            localStorage.token = access_token;
            authUser(access_token, dispatch);
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

export const authUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    const user = jwt.decode(token) as IUser;
    dispatch(
        {
            type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
            payload: user
        }
    )
}