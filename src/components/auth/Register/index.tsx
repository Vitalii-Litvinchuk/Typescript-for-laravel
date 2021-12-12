import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IRegisterModel } from "./types";
import InputGroup from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import { ServerAuthError } from "../../../types/auth";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { RegisterSchema } from "./validation";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const RegisterPage = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const initialState: IRegisterModel = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    }
    const initialErrors: ServerAuthError = {
        email: "",
        password: "",
        error: ""
    }

    const [serverErrors, setServerErrors] = useState<ServerAuthError>(initialErrors);

    const { registerUser } = useActions();

    const onHandleSubmit = async (
        values: IRegisterModel,
        { setFieldError }: FormikHelpers<IRegisterModel>
    ) => {
        setIsSubmitted(true);
        try {
            await registerUser(values);
            setIsSubmitted(false);
        } catch (ex: any) {
            const serverErrors = ex as ServerAuthError;
            if (serverErrors.email)
                setFieldError("email", serverErrors.email[0]);
            if (serverErrors.password)
                setFieldError("password", serverErrors.password[0]);
            setServerErrors(serverErrors);
            setIsSubmitted(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    });

    const { isAuth } = useTypedSelector(state => state.auth);

    if (isAuth) {
        return <Navigate to="/" />
    }

    //   const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <h1 className="text-center mt-3">Реєстрація</h1>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-5 bg-light shadow-lg p-3 bg-white rounded p-4">
                        {!!serverErrors.error && (
                            <div className="alert alert-danger" role="alert">
                                {serverErrors.error}
                            </div>
                        )}
                        <FormikProvider value={formik}>
                            <Form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <InputGroup label="Ім'я"
                                        field="name"
                                        error={errors.name}
                                        touched={touched.name}
                                        onChange={handleChange} />
                                </div>
                                <div className="form-group mt-3">
                                    <InputGroup
                                        label="Електронна пошта"
                                        field="email"
                                        error={errors.email}
                                        touched={touched.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <InputGroup label="Пароль"
                                        field="password"
                                        type="password"
                                        error={errors.password}
                                        touched={touched.password}
                                        onChange={handleChange} />
                                </div>
                                <div className="form-group mt-3">
                                    <InputGroup label="Підтвердити пароль"
                                        field="password_confirmation"
                                        type="password"
                                        error={errors.password_confirmation}
                                        touched={touched.password_confirmation}
                                        onChange={handleChange} />
                                </div>
                                <div className="my-2 text-center">
                                    <button type="submit" className="btn btn-outline-primary btn-lg m-auto px-5"
                                        disabled={isSubmitted}>Реєстрація</button>
                                </div>
                                <div className="my-1 text-center ">
                                    <Link to="/login" className="btn btn btn-outline-success px-3">Вже маю акаунт</Link>
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;