import { URLSearchParamsInit } from "react-router-dom";

export enum ProductActionTypes {
    GET_AUTOS = "GET_AUTOS",

    SET_SELECTED = "SET_SELECTED",

    CHANGE_PAGE = "CHANGE_PAGE",

    SELECTED_LOADING = "SELECTED_LOADING",

    CREATE_PRODUCT = "CREATE_PRODUCT",

    UNLOADED = "UNLOADED",

    DELETE_PRODUCT = "DELETE_PRODUCT",

    DELETED = "DELETED",

    CHANGED = "CHANGED",
}

export interface IProductCreateModel {
    name: string,
    detail: string,
    file?: File,
}

export interface IProductChangeModel {
    name?: string,
    detail?: string,
    file?: File,
}

export interface IProductModel {
    id: number,
    name: string,
    detail: string,
    image: null | string,
}

export interface IProductState {
    products: null | Array<IProductModel>,
    loaded: boolean,
    deleted: boolean,
    changed: boolean,
    selected: null | IProductModel,
    selected_loading: boolean,
    current_page: number,
    total_product: number,
    last_page: number,
}

export interface IProductResponse {
    current_page: number;
    last_page: number;
    total: number,
    product: IProductModel,
    data: Array<IProductModel>,
}

export interface ISelectedLoadingProductAction {
    type: ProductActionTypes.SELECTED_LOADING
}

export interface IGetProductsAction {
    type: ProductActionTypes.GET_AUTOS,
    products: Array<IProductModel>,
    total: number,
    last_page: number
}

export interface ISetSelectedProductAction {
    type: ProductActionTypes.SET_SELECTED,
    product: IProductModel,
}

export interface IChangePageAction {
    type: ProductActionTypes.CHANGE_PAGE,
    page: number
}

export interface IUnloadedAction {
    type: ProductActionTypes.UNLOADED,
}

export interface IDeletedAction {
    type: ProductActionTypes.DELETED,
}

export interface IChangedAction {
    type: ProductActionTypes.CHANGED,
}

export interface IProductSearchAction {
    page?: null | string | number,
    name?: null | string
}

export interface IURL {
    setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
        replace?: boolean | undefined;
        state?: any;
    } | undefined) => void,
    searchValue: IProductSearchAction,
    setSearchValue: React.Dispatch<React.SetStateAction<IProductSearchAction>>
}

export type ProductActions = IGetProductsAction | ISetSelectedProductAction | IChangePageAction
    | ISelectedLoadingProductAction | IUnloadedAction | IDeletedAction | IChangedAction;