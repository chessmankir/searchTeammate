import {useFiltersStore} from "../../../store/filtersStore.ts";

export function Pagination(){

    const page = useFiltersStore((s) => s.page);
    const setPage = useFiltersStore((s) => s.setPage);

    return (
        <div className="pg">
            <nav aria-label="Contacts Page Navigation">
                <ul className="pagination justify-content-center m-0">
                    <li className={(page == 1) ? "page-item active" : "page-item"}>
                        <a className="page-link"  onClick={(e) => {
                            e.preventDefault();
                            setPage(3);
                        }} href="#">1</a>
                    </li>
                    <li className={(page == 2) ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            setPage(2);
                        }} href="#">2</a>
                    </li>
                    <li className={(page == 3) ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            setPage(3);
                        }} href="#">3</a>
                    </li>
                    <li className={(page == 4) ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            setPage(4);
                        }} href="#">4</a>
                    </li>
                    <li className={(page == 5) ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={(e) => {
                            e.preventDefault();
                            setPage(5);
                        }} href="#">5</a>
                    </li>

                </ul>
            </nav>
        </div>
    )
}