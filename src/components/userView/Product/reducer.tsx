import { IProductState, ProductAction as ProductActions, ProductActionTypes } from "./types";

const initialState: IProductState = {
    products: null,
    loaded: false,
    selected: null,
    current_page: 1,
    total_product: 0,
    selected_loading: false,
}

export const productReducer = (state = initialState, action: ProductActions) => {
    switch (action.type) {
        case ProductActionTypes.GET_AUTOS:
            return {
                ...state,
                products: action.products,
                total_product: action.total,
                loaded: true,
            }
        case ProductActionTypes.SET_SELECTED:
            return {
                ...state,
                selected: action.product,
                selected_loading: false
            }
        case ProductActionTypes.CHANGE_PAGE:
            return {
                ...state,
                current_page: action.page
            }
        case ProductActionTypes.SELECTED_LOADING:
            return {
                ...state,
                selected: null,
                selected_loading: true,
            }
        default: return state;
    }
}
