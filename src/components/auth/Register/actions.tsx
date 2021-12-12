import { Dispatch } from "react"
import { AuthAction, AuthActionTypes, ServerAuthError } from "../../../types/auth";
import { IRegisterModel, IRegisterResponse } from "./types";
import http from "../../../http_common";
import axios, { AxiosError } from "axios";

export const registerUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({ type: AuthActionTypes.REGISTER_AUTH });
            const response = await http.post<IRegisterResponse>("api/auth/register", data);
            dispatch({ type: AuthActionTypes.REGISTER_AUTH_SUCCESS, payload: response.data.user });
            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerAuthError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}