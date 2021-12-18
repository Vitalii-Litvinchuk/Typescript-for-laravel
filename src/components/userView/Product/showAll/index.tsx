import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IProductSearchAction } from "../types";
import Paginator from "./paginator";
import SearchBox from "./searchBox";
import DisplayProduct from "./show";

const AllProducts = () => {
    const { loaded, products, current_page } = useTypedSelector(state => state.product);
    const { getAutos } = useActions();

    useEffect(() => {
        if (!loaded)
            getAutos(current_page, "");
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState<IProductSearchAction>({
        page: searchParams.get("page"),
        name: searchParams.get("name"),
    });


    if (!loaded) {
        return (
            <>
                <h2 className="text-center mt-3">Завантаження...</h2>
            </>);
    }
    else {
        return (
            <>
                <h1 className="text-center mt-3">Машини</h1>
                <SearchBox searchValue={searchValue} setSearchParams={setSearchParams} setSearchValue={setSearchValue} />
                <section className="section">
                    <div className="container">
                        <div className="row">
                            {products?.map(product => {
                                return <DisplayProduct key={product.id} id={product.id} name={product.name} detail={product.detail} image={product.image} />
                            })}
                        </div>
                    </div>
                    <Paginator searchValue={searchValue} setSearchParams={setSearchParams} setSearchValue={setSearchValue} />
                </section>
            </>
        )
    }
}

export default AllProducts;