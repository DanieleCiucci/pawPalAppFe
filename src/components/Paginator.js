import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbersToShow = 5;
    const startPage = Math.floor(currentPage / maxPageNumbersToShow) * maxPageNumbersToShow;
    const endPage = Math.min(startPage + maxPageNumbersToShow, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination customPaginator">
                <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(0)}>&laquo;</button>
                </li>
                <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&lsaquo;</button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(number)}>
                            {number + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&rsaquo;</button>
                </li>
                <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(totalPages - 1)}>&raquo;</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
