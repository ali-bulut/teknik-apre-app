import React from "react";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Texts from "../../../../../constants/Texts";
import CustomButton from "../../../../Common/CustomButton";
import CustomPagination from "../../../../Common/CustomPagination";

const PartiesTable = ({
  paginatedData,
  activePage,
  setActivePage,
  pageCount,
  paginationItems,
}) => {
  const history = useHistory();
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{Texts.name}</th>
            <th>{Texts.createdDate}</th>
            <th>{Texts.netWeightDivisionNum}</th>
            <th>{Texts.grossWeightAdditionNum}</th>
            <th>{Texts.templateImage}</th>
            <th>{Texts.details}</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData?.map((x) => (
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/barcode/parties/" + x.id)}
            >
              <td>{x.name}</td>
              <td>{new Date(x.createdTime).toString().split(" GMT")[0]}</td>
              <td>{x.netWeightDivisionNum}</td>
              <td>{x.grossWeightAdditionNum}</td>
              <td style={{ textAlign: "center" }}>
                <img
                  style={{ width: 200, height: 100 }}
                  src={x.templateImage}
                  alt="templateImage"
                />
              </td>
              <td>
                <CustomButton
                  as={Link}
                  to={"/barcode/parties/" + x.id}
                  style={{ color: "#7c4dff" }}
                  variant={null}
                >
                  {Texts.viewDetails}
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomPagination
        setActivePage={setActivePage}
        activePage={activePage}
        paginationItems={paginationItems}
        pageCount={pageCount}
      />
    </div>
  );
};

export default PartiesTable;
