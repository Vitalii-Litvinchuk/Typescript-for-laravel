import { AuthActionTypes, IUser } from "../../../types/auth";

export interface ILoginModel {
    email: string,
    password: string
}

export interface ILoginResponse {
    access_token: string,
    expires_in: number,
    user: IUser,
};

export interface ILoginAuthAction {
    type: AuthActionTypes.LOGIN_AUTH,
};

export interface ILoginAuthSuccessAction {
    type: AuthActionTypes.LOGIN_AUTH_SUCCESS,
    payload: IUser,
};

export interface ILoginAuthErrorAction {
    type: AuthActionTypes.LOGIN_AUTH_ERROR,
    payload: string,
};