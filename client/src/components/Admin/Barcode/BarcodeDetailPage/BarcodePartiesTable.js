import React from "react";
import { Form, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Texts from "../../../../constants/Texts";
import CustomButton from "../../../Common/CustomButton";

const BarcodePartiesTable = ({
  barcodePartiesData,
  barcodeId,
  isCreateMode,
  setIsCreateMode,
  createdPartyNum,
  setCreatedPartyNum,
  createNewParty,
  partyCreateLoading,
}) => {
  const history = useHistory();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{Texts.partyNum}</th>
          <th>{Texts.createdDate}</th>
          <th>
            {Texts.details}

            <CustomButton
              className="float-right"
              style={{
                padding: 0,
                color: "#7c4dff",
                fontWeight: "bold",
                display: isCreateMode && "none",
              }}
              variant="link"
              onClick={() => setIsCreateMode(true)}
            >
              {Texts.newRecord}
            </CustomButton>
            <div className="clearfix"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {isCreateMode && (
          <tr>
            <td>
              <Form.Control
                type="text"
                placeholder={Texts.partyNum}
                value={createdPartyNum}
                onChange={(e) => {
                  setCreatedPartyNum(e.target.value);
                }}
              />
            </td>
            <td>
              <Form.Control
                placeholder={Texts.createdDate}
                type="text"
                disabled
              />
            </td>
            <td style={{ textAlign: "center" }}>
              <CustomButton
                variant="link"
                onClick={createNewParty}
                loading={partyCreateLoading}
              >
                {Texts.save}
              </CustomButton>
              <CustomButton
                variant="link"
                style={{ color: "red" }}
                onClick={() => {
                  setIsCreateMode(false);
                  setCreatedPartyNum("");
                }}
              >
                {Texts.cancel}
              </CustomButton>
            </td>
          </tr>
        )}

        {barcodePartiesData?.map((x, i) => (
          <tr
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() =>
              history.push("/barcodes/" + barcodeId + "/parties/" + x.id)
            }
          >
            <td>{x.partyNum}</td>
            <td>{new Date(x.createdTime).toString().split(" GMT")[0]}</td>
            <td>
              <CustomButton
                as={Link}
                to={"/barcodes/" + barcodeId + "/parties/" + x.id}
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
  );
};

export default BarcodePartiesTable;
