import { Dispatch } from "react"
import { IProductChangeModel, IProductCreateModel, IProductResponse, ProductActions, ProductActionTypes } from "./types";
import http, { multipartFormData } from "../../../http_common";

export const getAutos = (current_page: number, name: string) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await http.get<IProductResponse>("api/products", { params: { page: current_page, name: name } });
            const { data } = response.data;
            dispatch({
                type: ProductActionTypes.GET_AUTOS,
                products: data,
                total: response.data.total,
                last_page: response.data.last_page,
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

export const createProduct = (data: IProductCreateModel) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            if (data.file) {
                var formData = new FormData();
                formData.append("name", data.name);
                formData.append("detail", data.detail);
                formData.append("file", data.file);
                await multipartFormData().post("api/products", formData);
                dispatch({ type: ProductActionTypes.UNLOADED });
                return Promise.resolve();
            }
        } catch (error) {
            console.log("Problem create product");
            return Promise.reject();
        }
    }
}

export const deleteProduct = (id: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            await http.delete(`api/products/${id}`);
            dispatch({ type: ProductActionTypes.DELETED });
            return Promise.resolve();
        } catch (error) {
            console.log("Problem create product");
            return Promise.reject();
        }
    }
}

export const editProduct = (id: number, data: IProductChangeModel) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            var formData = new FormData();
            if (data.name)
                formData.append("name", data.name);
            if (data.detail)
                formData.append("detail", data.detail);
            if (data.file)
                formData.append("file", data.file);
            await multipartFormData().post(`api/products/${id}`, formData);
            dispatch({ type: ProductActionTypes.CHANGED });
            return Promise.resolve();
        } catch (error) {
            console.log("Problem create product");
            return Promise.reject();
        }
    }
}