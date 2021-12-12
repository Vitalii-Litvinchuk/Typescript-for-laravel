import { useActions } from "../../../../../hooks/useActions";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";

const Paginator = () => {
    const { total_product, current_page } = useTypedSelector(state => state.product);
    const { changePage, getAutos } = useActions();

    let items = [];
    for (let index = 0; index < total_product / 6; index++)
        items.push(
            current_page === index + 1 ?
                (<li className="page-item active"><a className="page-link" onClick={() => { changePage(index + 1); getAutos(index + 1) }}>{index + 1}</a></li>)
                :
                (<li className="page-item"><a className="page-link" onClick={() => { changePage(index + 1); getAutos(index + 1) }}>{index + 1}</a></li>)
        )

    return (
        <nav className="justify-content-center" aria-label="...">
            <ul className="pagination">
                {current_page <= 1 ?
                    (<li className="page-item disabled">
                        <a className="page-link ">Previous</a>
                    </li>)
                    :
                    (<li className="page-item">
                        <a className="page-link" onClick={() => { changePage(current_page - 1); getAutos(current_page - 1) }}>Previous</a>
                    </li>)
                }
                {items}
                {current_page >= total_product / 6 ?
                    (<li className="page-item disabled">
                        <a className="page-link ">Next</a>
                    </li>)
                    :
                    (<li className="page-item">
                        <a className="page-link" onClick={() => { changePage(current_page + 1); getAutos(current_page + 1) }}>Next</a>
                    </li>)
                }
            </ul>
        </nav >
    )
}

export default Paginator;