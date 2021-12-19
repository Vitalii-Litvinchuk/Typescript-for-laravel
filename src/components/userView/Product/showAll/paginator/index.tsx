import { useActions } from "../../../../../hooks/useActions";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import qs from 'qs';
import { FC, useEffect } from "react";
import { IProductSearchAction, IURL } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Paginator: FC<IURL> = ({ setSearchParams, searchValue, setSearchValue }: IURL) => {
    const { current_page, last_page } = useTypedSelector(state => state.product);
    const { changePage, getAutos } = useActions();

    useEffect(() => {
        searchValue.page ? paginateTo(parseInt(searchValue.page.toString())) : console.log();
    }, []);

    function paginateTo(page: number) {
        changePage(page);
        getAutos(page, searchValue.name ? searchValue.name : "");

        const data: IProductSearchAction = {
            ...searchValue,
            page: page,
        };
        setSearchValue(data);
        setSearchParams(qs.stringify(data));
    }

    const items = [];
    for (let index = 1; index <= last_page; index++)
        items.push(index)

    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-center">
                {
                    current_page <= 1 ?
                        (<li className="page-item disabled">
                            <a className="page-link border-0">
                                <FontAwesomeIcon icon={faChevronCircleLeft} />
                            </a>
                        </li>)
                        :
                        (<li className="page-item">
                            <a className="page-link border-0" onClick={() => paginateTo(current_page - 1)} >
                                <FontAwesomeIcon icon={faChevronCircleLeft} />
                            </a>
                        </li>)
                }
                {items.map((item, key) => {
                    return (
                        current_page === item ?
                            (<li className="page-item active" key={key}><a className="page-link rounded-3">{item}</a></li>)
                            :
                            (<li className="page-item" key={key}><a className="page-link" onClick={() => paginateTo(item)}>{item}</a></li>)
                    )
                })}
                {
                    current_page >= last_page ?
                        (<li className="page-item disabled">
                            <a className="page-link border-0">
                                <FontAwesomeIcon icon={faChevronCircleRight} />
                            </a>
                        </li>)
                        :
                        (<li className="page-item">
                            <a className="page-link border-0" onClick={() => paginateTo(current_page + 1)} >
                                <FontAwesomeIcon icon={faChevronCircleRight} />
                            </a>
                        </li>)
                }
            </ul>
        </nav >
    )
}

export default Paginator;