import { ILoginAuthAction, ILoginAuthErrorAction, ILoginAuthSuccessAction } from "../components/auth/Login/types";
import { IRegisterAuthAction, IRegisterAuthErrorAction, IRegisterAuthSuccessAction } from "../components/auth/Register/types";

export enum AuthActionTypes {
    UNSET_ERROR = "UNSET_ERROR",

    LOGIN_AUTH = "LOGIN_AUTH",
    LOGIN_AUTH_SUCCESS = "LOGIN_AUTH_SUCCESS",
    LOGIN_AUTH_ERROR = "LOGIN_AUTH_ERROR",

    REGISTER_AUTH = "REGISTER_AUTH",
    REGISTER_AUTH_SUCCESS = "REGISTER_AUTH_SUCCESS",
    REGISTER_AUTH_ERROR = "REGISTER_AUTH_ERROR",
};

export interface IUser {
    email: string,
    password: string,
};

export interface AuthState {
    user: null | IUser,
    isAuth: boolean,
    loading: boolean,
    error: null | string,
};

export interface IUnsetError {
    type: AuthActionTypes.UNSET_ERROR,
}

export type ServerAuthError = {
    email: string,
    password: string,
    error: string
}

export type AuthAction = IUnsetError
    | ILoginAuthAction | ILoginAuthSuccessAction | ILoginAuthErrorAction
    | IRegisterAuthAction | IRegisterAuthSuccessAction | IRegisterAuthErrorAction;