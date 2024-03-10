import {getPagesArray} from "../utils/pages";

const Pagination = ({totalPages, page, changePage, changePageArrow}) => {
    const pagesArray= getPagesArray(totalPages)

    return (
        <div className={'paggination'}>
            {page === 1
               ? <span></span>
                : < span className="page" onClick={changePageArrow}>&#8920;</span>
            }
{
    pagesArray.map(p =>
            <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >{p}</span>
            )}
            {pagesArray.length < 2
                ? <span></span>
                : <span className="page" onClick={changePageArrow}>&#8921;</span>
            }
        </div>
    );
};

export default Pagination;