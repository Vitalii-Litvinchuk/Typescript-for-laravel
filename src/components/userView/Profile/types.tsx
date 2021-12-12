export enum ProfileActionTypes {
    GET_USER_INFO = "GET_USER_INFO",

    LOADING = "LOADING"
}

export interface IProfileModel {
    name: string,
    email: string
    email_verified_at: undefined | boolean,
    created_at: Date
}

export interface IProfileState {
    user: null | IProfileModel,
    loaded: boolean,
    loading: boolean,
}

export interface IProfileResponse {
    user: IProfileModel
}

export interface IProfileGetInfoAction {
    type: ProfileActionTypes.GET_USER_INFO,
    user: IProfileModel,
}

export interface IProfileLoadingAction {
    type: ProfileActionTypes.LOADING
}

export type ProfileAction = IProfileGetInfoAction | IProfileLoadingAction;