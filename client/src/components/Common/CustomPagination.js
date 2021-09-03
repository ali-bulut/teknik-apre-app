import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  setActivePage,
  activePage,
  paginationItems,
  pageCount,
}) => {
  return (
    <React.Fragment>
      <Pagination className="float-right">
        <Pagination.First onClick={() => setActivePage(1)} />
        <Pagination.Prev
          onClick={() => activePage > 1 && setActivePage(activePage - 1)}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() =>
            activePage < pageCount && setActivePage(activePage + 1)
          }
        />
        <Pagination.Last onClick={() => setActivePage(pageCount)} />
      </Pagination>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

export default CustomPagination;
