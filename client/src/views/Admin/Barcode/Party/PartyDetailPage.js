import React from "react";
import { Button, Col, Form, Pagination, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../../../components/Common/CustomButton";
import CustomSpinner from "../../../../components/Common/CustomSpinner";
import Texts from "../../../../constants/Texts";
import {
  useFetchPartyDetails,
  usePartyLineItemOperations,
  usePartyOperations,
} from "../../../../hooks/Admin/Barcode/Party/PartyDetailPageHooks";

const PartyDetailPage = () => {
  const { id } = useParams();

  const {
    fetchPartyDetails,
    fetchSelectedPartyLineItems,
    partyLineItemsDataPagination,
    paginationItems,
    activePage,
    setActivePage,
    divisionNum,
    setDivisionNum,
    additionNum,
    setAdditionNum,
    partyMainValues,
    setPartyMainValues,
    enteredLineItemValues,
    setEnteredLineItemValues,
    lineItemHeaders,
    lastLineItemNum,
    createdRollNo,
    setCreatedRollNo,
    pageCount,
    partyLoading,
    partyLoaded,
    partyData,
    partyLineItemsLoading,
    partyLineItemsLoaded,
  } = useFetchPartyDetails(id);

  const {
    isEditMode,
    setIsEditMode,
    updateSelectedParty,
    deleteSelectedParty,
    createPartyExcel,
    partyUpdateLoading,
    partyDeleteLoading,
    createExcelFileLoading,
  } = usePartyOperations({
    id,
    divisionNum,
    additionNum,
    partyMainValues,
    partyData,
    fetchPartyDetails,
    fetchSelectedPartyLineItems,
  });

  const {
    lastlyDeletedLineItemId,
    isCreateMode,
    setIsCreateMode,
    deleteSelectedPartyLineItem,
    createNewLineItem,
    partyLineItemDeleteLoading,
    partyLineItemCreateLoading,
  } = usePartyLineItemOperations({
    id,
    fetchSelectedPartyLineItems,
    setActivePage,
    createdRollNo,
    enteredLineItemValues,
    setEnteredLineItemValues,
    partyData,
  });

  return (
    <React.Fragment>
      <a href="/" style={{ display: "none" }} id="excelDownload" download>
        excelDownload
      </a>

      <Row>
        <Col md="12">
          <Button
            variant={"link"}
            className="float-left"
            as={Link}
            to="/barcode/parties"
          >
            {Texts.backToParties}
          </Button>

          <CustomButton
            variant={"link"}
            className="float-right"
            style={{ color: "#7c4dff" }}
            onClick={createPartyExcel}
            loading={createExcelFileLoading}
          >
            {Texts.createExcelFile}
          </CustomButton>
        </Col>
      </Row>

      <div style={{ height: 20 }}></div>

      <div>
        {partyLoading && !partyLoaded ? (
          <CustomSpinner />
        ) : (
          <Row>
            <Col lg="9">
              <div
                className="card"
                style={{
                  height: "100%",
                }}
              >
                <div className="card-body">
                  <div>
                    <h4 style={{ display: "inline" }} className="card-title">
                      {partyData?.name}
                    </h4>
                    <CustomButton
                      style={{ position: "relative", bottom: 6 }}
                      className="float-right"
                      variant="link"
                      loading={partyUpdateLoading}
                      onClick={() => {
                        if (!isEditMode) {
                          setIsEditMode(true);
                        } else {
                          updateSelectedParty();
                        }
                      }}
                    >
                      {isEditMode ? Texts.save : Texts.update}
                    </CustomButton>

                    <Button
                      style={{
                        position: "relative",
                        bottom: 6,
                        color: "violet",
                        display: !isEditMode && "none",
                      }}
                      className="float-right"
                      variant="link"
                      onClick={() => {
                        let mainValues = [...partyData.mainValues];
                        let copyMainValues = [];
                        mainValues.forEach((p) => {
                          copyMainValues.push({
                            columnName: p.columnName,
                            value: p.value,
                          });
                        });
                        setPartyMainValues([...copyMainValues]);
                        setAdditionNum(partyData.gross_weight_addition_num);
                        setDivisionNum(partyData.net_weight_division_num);

                        setIsEditMode(false);
                      }}
                    >
                      {Texts.cancel}
                    </Button>
                  </div>

                  <div className="clearfix"></div>

                  <Row>
                    {partyMainValues?.map((p, i) => {
                      return (
                        <Col key={i} md="6" style={{ marginBottom: 5 }}>
                          <b>{p.columnName.toUpperCase()}:</b>

                          {!isEditMode ? (
                            <span>{p.value}</span>
                          ) : (
                            <Form.Control
                              type="text"
                              value={p.value}
                              onChange={(e) => {
                                const copyMainValues = [...partyMainValues];
                                copyMainValues[i].value = e.target.value;
                                setPartyMainValues(copyMainValues);
                              }}
                            />
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Metre{" "}
                    {isEditMode ? (
                      <input
                        value={divisionNum}
                        onChange={(e) => setDivisionNum(e.target.value)}
                        type="number"
                      />
                    ) : (
                      <b>{partyData?.net_weight_division_num}</b>
                    )}
                    {"'e "} Bölünecek. Net Kiloya{" "}
                    {isEditMode ? (
                      <input
                        value={additionNum}
                        onChange={(e) => setAdditionNum(e.target.value)}
                        type="number"
                      />
                    ) : (
                      <b>{partyData?.gross_weight_addition_num}</b>
                    )}{" "}
                    Eklenecek.
                  </small>

                  <CustomButton
                    style={{ padding: 0, color: "red" }}
                    className="float-right"
                    variant="link"
                    loading={partyDeleteLoading}
                    onClick={() => {
                      deleteSelectedParty();
                    }}
                  >
                    {Texts.deleteParty}
                  </CustomButton>
                </div>
              </div>
            </Col>

            <Col lg="3">
              <img
                src={partyData?.template_img}
                className="card-img-top"
                alt="template_img"
                style={{
                  borderBottom: "1px dashed black",
                  maxHeight: "100%",
                }}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col md="12">
            {partyLineItemsLoading && !partyLineItemsLoaded ? (
              <CustomSpinner />
            ) : (
              <div style={{ marginTop: 20 }}>
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
                                    newArr.find(
                                      (x) => x.id === enteredValue.id
                                    ).value = e.target.value;
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

                <Pagination className="float-right">
                  <Pagination.First onClick={() => setActivePage(1)} />
                  <Pagination.Prev
                    onClick={() =>
                      activePage > 1 && setActivePage(activePage - 1)
                    }
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
              </div>
            )}
          </Col>
        </Row>
      </div>

      <div style={{ height: 20 }}></div>
    </React.Fragment>
  );
};

export default PartyDetailPage;
