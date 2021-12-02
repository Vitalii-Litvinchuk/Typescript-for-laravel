import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IRegisterModel } from "./types";
import InputGroup from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import ModalInfo from "../../modal";

const RegisterPage = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const initialState: IRegisterModel = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    }

    const [state, setState] = useState(initialState);

    const { registerUser, unsetError } = useActions();

    const { error, isAuth } = useTypedSelector(state => state.auth);

    let modal = <></>;
    if (error !== null) {
        modal = <ModalInfo title="Помилка" body={error} onClick={unsetError} onHide={unsetError} />;
    }
    else {
        if (isAuth) {
            return <Navigate to='/' />
        }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitted(true);
            await registerUser(state);
            setIsSubmitted(false);
        }
        catch (ex) {
            setIsSubmitted(false);
        }
    }

    return (
        <>
            {modal}
            <h1 className="text-center mt-3">Реєстрація</h1>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-5 bg-light shadow-lg p-3 bg-white rounded p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <InputGroup label="Ім'я"
                                    field="name"
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group mt-3">
                                <InputGroup label="Електронна пошта"
                                    field="email"
                                    type="email"
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group mt-3">
                                <InputGroup label="Пароль"
                                    field="password"
                                    type="password"
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group mt-3">
                                <InputGroup label="Підтвердити пароль"
                                    field="password_confirmation"
                                    type="password"
                                    onChange={handleChange} />
                            </div>
                            <div className="my-2 text-center">
                                <button type="submit" className="btn btn-outline-primary btn-lg m-auto px-5"
                                    disabled={state.password !== state.password_confirmation ||
                                        state.password.length <= 6 || state.password === "" || state.name === "" || isSubmitted}>Реєстрація</button>
                            </div>
                            <div className="my-1 text-center ">
                                <Link to="/login" className="btn btn btn-outline-success px-3">Вже маю акаунт</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;