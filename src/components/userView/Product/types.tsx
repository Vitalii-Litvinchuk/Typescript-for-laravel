export enum ProductActionTypes {
    GET_AUTOS = "GET_AUTOS",

    SET_SELECTED = "SET_SELECTED",

    CHANGE_PAGE = "CHANGE_PAGE",

    SELECTED_LOADING = "SELECTED_LOADING"
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
    selected: null | IProductModel,
    selected_loading: boolean,
    current_page: number,
    total_product: number
}

export interface IProductResponse {
    current_page: number;
    from: number;
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
}

export interface ISetSelectedProductAction {
    type: ProductActionTypes.SET_SELECTED,
    product: IProductModel,
}

export interface IChangePage {
    type: ProductActionTypes.CHANGE_PAGE,
    page: number
}

export type ProductAction = IGetProductsAction | ISetSelectedProductAction | IChangePage | ISelectedLoadingProductAction;