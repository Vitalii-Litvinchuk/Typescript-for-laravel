import { FC, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import InputGroup from "../../common/InputGroup";
import { ILoginModel } from "./types";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { LoginSchema } from './validation';
import { ServerAuthError } from "../../../types/auth";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const LoginPage: FC = () => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const initialState: ILoginModel = {
        email: "",
        password: "",
    }

    const initialErrors: ServerAuthError = {
        email: "",
        password: "",
        error: ""
    }

    const [serverErrors, setServerErrors] = useState<ServerAuthError>(initialErrors);

    const { loginUser } = useActions();

    const onHandleSubmit = async (
        values: ILoginModel,
        { setFieldError }: FormikHelpers<ILoginModel>
    ) => {
        setIsSubmitted(true);
        try {
            await loginUser(values);
            setIsSubmitted(false);
        } catch (ex) {
            const serverErrors = ex as ServerAuthError;
            setServerErrors(serverErrors);
            if (serverErrors.password && serverErrors.password.length !== 0) {
                setFieldError("password", serverErrors.password[0]);
            }
            setIsSubmitted(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: LoginSchema,
        onSubmit: onHandleSubmit
    });

    const { isAuth } = useTypedSelector(state => state.auth);

    if (isAuth) {
        return <Navigate to="/" />
    }

    //    const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <>
            <h1 className="text-center mt-3">Вхід</h1>
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
                                    <InputGroup
                                        label="Пароль"
                                        field="password"
                                        type="password"
                                        error={errors.password}
                                        touched={touched.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="my-2 text-center">
                                    <button type="submit" className="btn btn-outline-primary btn-lg m-auto px-5"
                                        disabled={isSubmitted}>Вхід</button>
                                </div>
                                <div className="my-1 text-center ">
                                    <Link to="/register" className="btn btn btn-outline-success px-3">Створити акаунт</Link>
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LoginPage;