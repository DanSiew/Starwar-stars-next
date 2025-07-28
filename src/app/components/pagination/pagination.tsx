import React from "react";
import "./pagination.scss";
import { usePagination, DOTS } from "../../custom-hooks/usePaginations";

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    isSmall,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container">
      <li
        className={[
          "pagination-item",
          props.currentPage === 1 ? "pagination-item--disabled" : "",
          isSmall? "pagination-item--words" : "",
        ].join(" ")}
        onClick={onPrevious}
      >
        <div  className="pagination-item--previous">{isSmall ? "Previous" : "<"}</div>
      </li>

      {!isSmall &&
        paginationRange &&
        paginationRange.map((pageNumber: {key:number, value: string}, index: number) => {
          if (pageNumber.value === DOTS) {
            return (
              <li key={index} className="pagination-item pagination-item--dots"
              onClick={() => onPageChange(pageNumber.key)}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={[
                "pagination-item",
                props.currentPage.toString() === pageNumber.value
                  ? "pagination-item--selected"
                  : "",
              ].join(" ")}
              onClick={() => onPageChange(pageNumber.key)}
            >
              {pageNumber.value}
            </li>
          );
        })}

      <li
        className={[
          "pagination-item",
          props.currentPage === lastPage ? "pagination-item--disabled" : "",
          isSmall? "pagination-item--words" : "",
        ].join(" ")}
        onClick={onNext}
      >
        <div className="pagination-item--next"> {isSmall ? "Next" : ">"}</div>
      </li>
    </ul>
  );
};

export default Pagination;
