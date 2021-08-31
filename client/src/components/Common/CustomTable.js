import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Form, Spinner } from "react-bootstrap";
import Texts from "../../constants/Texts";

const CustomTable = (props) => {
  const customStyles = {
    headCells: {
      style: {
        color: "#170947",
        fontFamily: "HKBlack",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1.44,
      },
    },
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [sortColumns, setSortColumns] = useState([]);
  const [paginationReset, setPaginationReset] = useState(false);

  const fetchTableData = async (page, defaultSortColumns = []) => {
    setLoading(true);

    const response = await props.fetchData({
      page,
      perPage,
      sortData: defaultSortColumns,
    });

    setData(response?.data);
    setTotalRows(response?.total);
    setLoading(false);
    setPaginationReset(false);
  };

  const handlePageChange = (page) => {
    let sort = sortColumns.length > 0 ? sortColumns : props.defaultSortColumns;
    fetchTableData(page, sort);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    let sort = sortColumns.length > 0 ? sortColumns : props.defaultSortColumns;

    const response = await props.fetchData({
      page,
      perPage: newPerPage,
      sortData: sort,
    });

    setData(response?.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleSort = async (column, sortDirection) => {
    setLoading(true);

    const sortData = [
      {
        column: column.selector,
        type: sortDirection,
      },
    ];

    setSortColumns(sortData);

    const response = await props.fetchData({
      sortData: sortData,
      page: 1,
      perPage,
    });

    setData(response?.data);
    setTotalRows(response?.total);
    setLoading(false);
  };

  const onSearch = async (value) => {
    setFilterText(value);

    setLoading(true);

    let sort = sortColumns.length > 0 ? sortColumns : props.defaultSortColumns;

    const response = await props.fetchData({
      searchValue: value,
      page: 1,
      perPage,
      sortData: sort,
    });

    setData(response?.data);
    setTotalRows(response?.total);
    setLoading(false);
  };

  useEffect(() => {
    let sort = sortColumns.length > 0 ? sortColumns : props.defaultSortColumns;
    fetchTableData(1, sort);
    setPaginationReset(true);
    props.setRefreshTable(false);
  }, [props.refreshTable]);

  return (
    <React.Fragment>
      {!props.disableSearch && (
        <Form.Control
          onChange={(e) => onSearch(e.target.value)}
          type="text"
          value={filterText}
          placeholder={Texts.search}
          style={{ width: "calc(12.5em + .75rem + 2px)", float: "right" }}
        />
      )}
      <div style={{ clear: "both" }}></div>
      <DataTable
        onRowClicked={(data) => {
          if (props.onRowClick) {
            props.onRowClick(data);
          }
        }}
        style={{
          cursor: "pointer",
        }}
        columns={props.columns}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationResetDefaultPage={paginationReset}
        title={
          <div>
            <span>{props.title}</span>{" "}
            <span
              onClick={() => {
                props.setRefreshTable(true);
                setSortColumns([]);
              }}
              style={{
                fontSize: 12,
                marginLeft: 10,
                cursor: "pointer",
                border: "1px solid lightgray",
                backgroundColor: "floralwhite",
                padding: 5,
                borderRadius: 7,
                position: "relative",
                bottom: 1,
              }}
            >
              {Texts.reload}
              <i
                style={{
                  fontSize: 13,
                  position: "relative",
                  top: 3,
                  left: 1,
                }}
                className="material-icons"
              >
                refresh
              </i>
            </span>
            {props.additionalTitle}
          </div>
        }
        data={data}
        progressPending={loading}
        progressComponent={
          <Spinner
            style={{ color: "#7c4dff" }}
            animation="grow"
            role="status"
          />
        }
        onSort={handleSort}
        sortServer
        sortIcon={<div></div>}
        customStyles={customStyles}
        conditionalRowStyles={props.conditionalRowStyles}
        expandableRows={props.expandableRows}
        expandableRowsComponent={props.expandableRowsComponent}
        expandOnRowClicked={props.expandOnRowClicked}
      />
    </React.Fragment>
  );
};

export default CustomTable;
