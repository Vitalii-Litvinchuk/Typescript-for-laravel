import { combineReducers } from "redux";
import { productReducer } from "../../components/userView/Product/reducer";
import { profileReducer } from "../../components/userView/Profile/reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;