import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IProductSearchAction } from "../types";
import Paginator from "./paginator";
import SearchBox from "./searchBox";
import DisplayProduct from "./show";

const AllProducts = () => {
    const { loaded, deleted, changed, products, current_page } = useTypedSelector(state => state.product);
    const { getAutos } = useActions();

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState<IProductSearchAction>({
        page: searchParams.get("page"),
        name: searchParams.get("name"),
    });

    useEffect(() => {
        if (!loaded && !searchValue.page)
            getAutos(current_page, "");
        if (deleted) {
            let name = "";
            if (searchValue.name)
                name = searchValue.name;

            getAutos(current_page, name);
        }

    }, [loaded, deleted, changed]);

    if (!loaded && !searchValue.page) {
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