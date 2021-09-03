import React from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Texts from "../../../../../constants/Texts";
import CustomButton from "../../../../Common/CustomButton";

const PartyLineItemsTable = ({
  lineItemHeaders,
  isCreateMode,
  setIsCreateMode,
  createdRollNo,
  setCreatedRollNo,
  partyData,
  enteredLineItemValues,
  setEnteredLineItemValues,
  createNewLineItem,
  partyLineItemCreateLoading,
  lastLineItemNum,
  partyLineItemsDataPagination,
  deleteSelectedPartyLineItem,
  lastlyDeletedLineItemId,
  partyLineItemDeleteLoading,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>{Texts.rollNo}</th>
          {lineItemHeaders.map((p, i) => {
            return <th key={i}>{p.toUpperCase()}</th>;
          })}
          <th>
            {Texts.operations}
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
                type="number"
                value={createdRollNo}
                onChange={(e) => {
                  setCreatedRollNo(e.target.value);
                }}
              />
            </td>
            {lineItemHeaders.map((p, i) => {
              let enteredValue = partyData.enteredValues.find(
                (x) => x.columnName === p
              );

              if (enteredValue) {
                return (
                  <td key={i}>
                    <Form.Control
                      placeholder={p.toUpperCase()}
                      type="number"
                      value={
                        enteredLineItemValues.find(
                          (x) => x.id === enteredValue.id
                        ).value
                      }
                      onChange={(e) => {
                        let newArr = [...enteredLineItemValues];
                        newArr.find((x) => x.id === enteredValue.id).value =
                          e.target.value;
                        setEnteredLineItemValues([...newArr]);
                      }}
                    />
                  </td>
                );
              } else {
                return (
                  <td key={i}>
                    <Form.Control
                      placeholder={p.toUpperCase()}
                      type="number"
                      disabled
                    />
                  </td>
                );
              }
            })}

            <td style={{ textAlign: "center" }}>
              <CustomButton
                variant="link"
                onClick={createNewLineItem}
                loading={partyLineItemCreateLoading}
              >
                {Texts.save}
              </CustomButton>
              <CustomButton
                variant="link"
                style={{ color: "red" }}
                onClick={() => {
                  setIsCreateMode(false);
                  setCreatedRollNo(lastLineItemNum);
                  enteredLineItemValues.forEach((x) => {
                    x.value = "";
                  });
                }}
              >
                {Texts.cancel}
              </CustomButton>
            </td>
          </tr>
        )}
        {partyLineItemsDataPagination?.map((item, index) => (
          <tr key={index}>
            <td>{item.lineItemNum}</td>
            {item.lineItemValues.map((p, i) => (
              <td key={i}>{p.value}</td>
            ))}
            <td style={{ textAlign: "center" }}>
              <CustomButton
                as={Link}
                variant="link"
                style={{ color: "#7c4dff" }}
                to={item.htmlPath}
                target="_blank"
              >
                {Texts.openBarcode}
              </CustomButton>
              <CustomButton
                style={{ color: "red" }}
                variant="link"
                onClick={() => deleteSelectedPartyLineItem(item.id)}
                loading={
                  lastlyDeletedLineItemId === item.id
                    ? partyLineItemDeleteLoading
                    : false
                }
              >
                {Texts.delete}
              </CustomButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PartyLineItemsTable;
