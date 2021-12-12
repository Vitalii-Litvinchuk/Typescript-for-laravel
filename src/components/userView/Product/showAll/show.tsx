import { useNavigate } from "react-router";
import { useActions } from "../../../../hooks/useActions";
import { IProductModel } from "../types";

const maxDetailSymbols = 100;

const DisplayProduct = ({ id, name, detail, image }: IProductModel) => {
    const navigator = useNavigate();
    let detailWords = detail.split(' ');

    let detailShow = "";

    const { setSelected } = useActions();

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

    return (
        <>
            <div className="col-4 p-4 design ">
                <div className="item-box" onClick={onClick}>
                    <img className="item-container img-fluid" src={image ? image : "https://via.placeholder.com/1920x1080/D3D3D3/000000"} alt="work-img" />
                    <div className="item-mask">
                        <div className="item-caption">
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