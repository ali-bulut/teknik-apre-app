import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import CustomTable from "../../../../components/Common/CustomTable";
import Texts from "../../../../constants/Texts";
import { useFetchParties } from "../../../../hooks/Admin/Barcode/Party/PartiesPageHooks";
import { columns } from "../../../../util/DataTable/PartiesTableColumns";

const PartiesPage = () => {
  const { refreshTable, setRefreshTable, onRowClick, fetchData } =
    useFetchParties();

  return (
    <React.Fragment>
      <Row>
        <Col md="12">
          <Button
            variant={null}
            style={{
              backgroundColor: "slateblue",
              color: "white",
              borderRadius: 5,
            }}
            className="float-left"
            as={Link}
            to="/barcode/parties/create"
          >
            {Texts.createParty}
          </Button>
        </Col>
      </Row>

      <CustomTable
        onRowClick={onRowClick}
        columns={columns}
        title={Texts.parties}
        fetchData={fetchData}
        defaultSortColumns={[]}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </React.Fragment>
  );
};

export default PartiesPage;
