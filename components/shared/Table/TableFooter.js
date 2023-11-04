"use client"
import React from "react";

const TableFooter = ({
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize,
  lenghtSize,
  viewTable,
}) => {
  const handlePrevClick = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getPagesToShow = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    } else if (currentPage === 2) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    } else if (currentPage === totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage, currentPage + 1];
    }
  };
  const pagesToShow = getPagesToShow();

  const handleNextClick = (currentPage, setCurrentPage) => {
    console.log("hit");
    if (currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      {viewTable ? (
        <div className="table-footer">
          <div className="table-footer-content">
            <div className="table-footer-left">
              {/* {pagesToShow.map((page,index) => (
        <button
          key={index}
          onClick={() =>handlePageClick(page)}
          className={page === currentPage ? 'font-bold text-gray-800' : ''}
        >
          {page}
        </button>
      ))} */}
            </div>
            <div className="table-footer-right">
              <button
                onClick={() => handlePrevClick(currentPage, setCurrentPage)}
                disabled={currentPage === 1}
                className="btn-orange"
              >
                Previous
              </button>
              <button
                onClick={() => handleNextClick(currentPage, setCurrentPage)}
                disabled={lenghtSize < pageSize ? true : false}
                className="btn-orange mx-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TableFooter;
