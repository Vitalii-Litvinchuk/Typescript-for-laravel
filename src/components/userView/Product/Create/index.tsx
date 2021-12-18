import { FC, useState } from 'react';
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import InputGroupFile from '../../../common/InputGroupFile';
import InputGroup from '../../../common/InputGroup';
import { IProductCreateModel } from '../types';
import { useActions } from '../../../../hooks/useActions';
import ModalInfo from '../../../modal';
import { ProductSchema } from './validation';

const CreateProduct: FC = () => {
    const [created, setCreated] = useState(false);
    const { createProduct } = useActions();

    const initialState: IProductCreateModel = {
        name: "",
        detail: "",
        file: undefined
    }


    const onHandleSubmit = async (
        values: IProductCreateModel,
        { setFieldError }: FormikHelpers<IProductCreateModel>
    ) => {
        createProduct(values);
        setCreated(true);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).files) {
            setFieldValue("file", e.target.files?.item(0));
        }
    };


    const formik = useFormik({
        initialValues: initialState,
        validationSchema: ProductSchema,
        onSubmit: onHandleSubmit,
    });

    const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

    return (
        <>
            {created ? (<ModalInfo body='Успішно додано!' bodyClass='text-center' onClick={() => setCreated(false)} onHide={() => setCreated(false)} />) : <></>}
            <div className="row">
                <h1 className="text-center">Додати продукт</h1>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-5 bg-light shadow-lg p-3 bg-white rounded p-4">
                        <FormikProvider value={formik}>
                            <Form onSubmit={handleSubmit}>
                                <InputGroup
                                    label="Назва"
                                    field="name"
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                />

                                <InputGroup
                                    label="Опис"
                                    field="detail"
                                    type="text"
                                    error={errors.detail}
                                    touched={touched.detail}
                                    onChange={handleChange}
                                />

                                <InputGroupFile
                                    label="Фото"
                                    field="file"
                                    error={errors.file}
                                    touched={touched.file}
                                    onChange={handleFileChange}
                                />
                                <div className="row justify-content-center mt-4 ">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary col-4"
                                    >
                                        Додати продукт
                                    </button>
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;