import { Dispatch } from "react"
import { IProductResponse, ProductAction as ProductActions, ProductActionTypes } from "./types";
import http from "../../../http_common";

export const getAutos = (current_page: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await http.get<IProductResponse>("api/products", { params: { page: current_page } });
            const { data } = response.data;
            dispatch({
                type: ProductActionTypes.GET_AUTOS,
                products: data,
                total: response.data.total
            });
            return Promise.resolve();
        } catch (ex) {
            console.log("Problem fetch");
            return Promise.reject();
        }
    };
};

export const setSelected = (id: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        dispatch({ type: ProductActionTypes.SELECTED_LOADING });
        const response = await http.get<IProductResponse>(`api/products/${id}`);
        dispatch({ type: ProductActionTypes.SET_SELECTED, product: response.data.product });
        return Promise.resolve();
    }
}

export const changePage = (page: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            dispatch({
                type: ProductActionTypes.CHANGE_PAGE,
                page: page,
            });
            return Promise.resolve();
        } catch (ex) {
            console.log("Problem change page");
            return Promise.reject();
        }
    };
}