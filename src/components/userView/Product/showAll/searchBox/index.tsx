import qs from "qs";
import { FC } from "react";
import { useActions } from "../../../../../hooks/useActions";
import { IProductSearchAction, IURL } from "../../types";

const SearchBox: FC<IURL> = ({ setSearchParams, searchValue, setSearchValue }: IURL) => {
    const { getAutos } = useActions();

    function search(name: string) {
        getAutos(1, name);

        const data: IProductSearchAction = {
            ...searchValue,
            page: 1,
            name: name,
        };
        setSearchValue(data);
        setSearchParams(qs.stringify(data));
    }

    return (
        <>
            <div className="input-group ms-4">
                <div className="form-outline">
                    <input id="search-focus" type="search" placeholder="Пошук" className="form-control" onChange={(e) => search(e.target.value)} />
                </div>
            </div>
        </>
    )
}

export default SearchBox;