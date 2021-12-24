import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import InputGroup from "../../../common/InputGroup";
import InputGroupFile from "../../../common/InputGroupFile";
import ModalInfo from "../../../modal";
import { IProductChangeModel } from "../types";

const EditProduct: FC = () => {
    const data: IProductChangeModel = {};

    const { editProduct } = useActions();

    const { selected } = useTypedSelector(state => state.product);

    const [isChanged, setIsChanged] = useState(false);

    if (!selected)
        return (
            <>
                <h2 className="text-center">Виберіть продукт</h2>
                <Link className="btn btn-outline-success px-4 mb-2" to="/products">Назад</Link>
            </>
        )
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ((e.target as HTMLInputElement).files) {
            data.file = e.target.files?.item(0) as File;
        }
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        data.name = e.target.value;
    }

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        data.detail = e.target.value;
    }

    const onSubmit = (e: any) => {
        editProduct(selected.id, data);
        setIsChanged(true);
    }
    return (
        <>
            {isChanged ? (<ModalInfo body='Успішно зміненно!' bodyClass='text-center' onClick={() => setIsChanged(false)} onHide={() => setIsChanged(false)} />) : <></>}
            <div className="row">
                <h1 className="text-center">Редагувати продукт</h1>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-5 bg-light shadow-lg p-3 bg-white rounded p-4">
                        <Link className="btn btn-outline-success px-4 mb-2" to="/products">Назад</Link>
                        <InputGroup
                            label="Назва"
                            field="name"
                            onChange={handleNameChange}
                        />

                        <InputGroup
                            label="Опис"
                            field="detail"
                            onChange={handleDetailChange}
                        />

                        <InputGroupFile
                            label="Фото"
                            field="file"
                            onChange={handleFileChange}
                        />
                        <div className="row justify-content-center mt-4 ">
                            <button
                                type="submit"
                                className="btn btn-outline-primary col-4"
                                onClick={onSubmit}
                            >
                                Змінити продукт
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct