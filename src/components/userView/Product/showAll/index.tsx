import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import Paginator from "./paginator";
import DisplayProduct from "./show";

const AllAutos = () => {
    const { loaded, products, current_page, total_product } = useTypedSelector(state => state.product);

    const { getAutos } = useActions();

    if (!loaded) {
        getAutos(current_page);
        return (
            <>
                <h2 className="text-center mt-3">Завантаження...</h2>
            </>);
    }
    else {
        return (
            <>
                <h1 className="text-center mt-3">Машини</h1>
                <section className="section">
                    <div className="container">
                        <div className="row">
                            {products?.map(product => {
                                return <DisplayProduct key={product.id} id={product.id} name={product.name} detail={product.detail} image={product.image} />
                            })}
                        </div>
                    </div>
                    <Paginator />
                </section>
            </>
        )
    }
}

export default AllAutos;