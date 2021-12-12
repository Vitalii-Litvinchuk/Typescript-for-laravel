import { Dispatch } from "react"
import { IProfileResponse, ProfileAction, ProfileActionTypes } from "./types";
import { withToken } from "../../../http_common";

export const getUserInfo = () => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        dispatch({ type: ProfileActionTypes.LOADING });
        const response = await withToken().get<IProfileResponse>("api/auth/user-profile");
        dispatch({ type: ProfileActionTypes.GET_USER_INFO, user: response.data.user });
        return Promise.resolve();
    }
}