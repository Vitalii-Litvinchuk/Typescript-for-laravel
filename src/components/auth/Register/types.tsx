import { AuthActionTypes, IUser } from "../../../types/auth";

export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export interface IRegisterResponse {
    access_token: string,
    expires_in: number,
    user: IUser,
};

export interface IRegisterAuthAction {
    type: AuthActionTypes.REGISTER_AUTH,
};

export interface IRegisterAuthSuccessAction {
    type: AuthActionTypes.REGISTER_AUTH_SUCCESS,
    payload: IUser,
};

export interface IRegisterAuthErrorAction {
    type: AuthActionTypes.REGISTER_AUTH_ERROR,
    payload: string,
};
