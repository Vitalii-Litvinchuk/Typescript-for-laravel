import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { IProductModel, IProductSearchAction } from "../types";

const maxDetailSymbols = 100;

const DisplayProduct = ({ id, name, detail, image }: IProductModel) => {
    const navigator = useNavigate();
    let detailWords = detail.split(' ');

    let detailShow = "";

    const { setSelected, deleteProduct } = useActions();

    for (let index = 0; index < detailWords.length; index++)
        if (detailShow.length + detailWords[index].length <= maxDetailSymbols) {
            detailShow += detailWords[index];
            if (detailShow.length + detailWords[index].length <= maxDetailSymbols)
                detailShow += " ";
            else break;
        }

    function onClick() {
        setSelected(id);
        navigator("/auto");
    }

    function deleteClick(id: number) {
        deleteProduct(id);
    }

    return (
        <>
            <div className="col-4 p-4 design ">
                <div className="item-box">
                    <img className="item-container img-fluid image" src={image ? "http://local.laravel.com/images/" + image : "https://via.placeholder.com/1920x1080/D3D3D3/000000"} alt="work-img" />
                    <div className="item-mask">
                        <div className="container mt-2" >
                            <div className="row justify-content-end">
                                <div className="btn btn-outline-danger col-2" onClick={() => deleteClick(id)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                            </div>
                        </div>
                        <div className="item-caption" onClick={onClick}>
                            <h5 className="text-dark mb-0">{name}</h5>
                            <p className="text-dark mt-1">{detailShow}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayProduct;