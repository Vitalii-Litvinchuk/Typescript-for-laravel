import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

const ShowProduct = () => {
    const { selected, selected_loading } = useTypedSelector(state => state.product);

    if (!selected_loading && !selected) {
        return <Navigate to="/autos" />
    }
    return (
        <>
            <div className="row">
                {selected ? (<>
                    <div className="row">
                        <Link to="/autos" className="btn btn-success rounded-2 col-1 p-2">Назад</Link>
                    </div >
                    <div>
                        <img className="item-container img-fluid col-4" src={selected.image ? "http://local.laravel.com/images/" + selected.image : "https://via.placeholder.com/1920x1080/D3D3D3/000000"} alt="https://via.placeholder.com/1920x1080/D3D3D3/000000" />
                        <div >
                            <h5 className="text-dark mb-0">{selected.name}</h5>
                            <p className="text-dark mt-1">{selected.detail}</p>
                        </div>
                    </div>
                </>) : (<h1 className="text-center mt-3">Завантаження...</h1>)}
            </div>
        </>
    )

}

export default ShowProduct;