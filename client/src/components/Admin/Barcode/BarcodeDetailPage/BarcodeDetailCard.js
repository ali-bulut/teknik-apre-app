import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Texts from "../../../../constants/Texts";
import CustomButton from "../../../Common/CustomButton";

const BarcodeDetailCard = ({
  barcodeData,
  barcodeUpdateLoading,
  isEditMode,
  setIsEditMode,
  updateSelectedBarcode,
  setBarcodeMainValues,
  additionNum,
  setAdditionNum,
  divisionNum,
  setDivisionNum,
  barcodeMainValues,
  barcodeDeleteLoading,
  deleteSelectedBarcode,
  updatedBarcodeName,
  setUpdatedBarcodeName,
}) => {
  return (
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
              {!isEditMode && (
                <h4 style={{ display: "inline" }} className="card-title">
                  {barcodeData?.name}
                </h4>
              )}
              <CustomButton
                style={{ position: "relative", bottom: 6 }}
                className="float-right"
                variant="link"
                loading={barcodeUpdateLoading}
                onClick={() => {
                  if (!isEditMode) {
                    setIsEditMode(true);
                  } else {
                    updateSelectedBarcode();
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
                  let mainValues = [...barcodeData.mainValues];
                  let copyMainValues = [];
                  mainValues.forEach((p) => {
                    copyMainValues.push({
                      columnName: p.columnName,
                      value: p.value,
                    });
                  });
                  setBarcodeMainValues([...copyMainValues]);
                  setAdditionNum(barcodeData.grossWeightAdditionNum);
                  setDivisionNum(barcodeData.netWeightDivisionNum);
                  setUpdatedBarcodeName(barcodeData.name);

                  setIsEditMode(false);
                }}
              >
                {Texts.cancel}
              </Button>

              <div className="clearfix"></div>

              {isEditMode && (
                <div style={{ marginBottom: 10 }}>
                  <b>{Texts.barcodeName.toUpperCase()}:</b>
                  <Form.Control
                    type="text"
                    value={updatedBarcodeName}
                    onChange={(e) => setUpdatedBarcodeName(e.target.value)}
                  />
                </div>
              )}
            </div>

            <Row>
              {barcodeMainValues?.map((p, i) => {
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
                          const copyMainValues = [...barcodeMainValues];
                          copyMainValues[i].value = e.target.value;
                          setBarcodeMainValues(copyMainValues);
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
                <b>{barcodeData?.netWeightDivisionNum}</b>
              )}
              {"'e "} Bölünecek. Net Kiloya{" "}
              {isEditMode ? (
                <input
                  value={additionNum}
                  onChange={(e) => setAdditionNum(e.target.value)}
                  type="number"
                />
              ) : (
                <b>{barcodeData?.grossWeightAdditionNum}</b>
              )}{" "}
              Eklenecek.
            </small>

            <CustomButton
              style={{ padding: 0, color: "red" }}
              className="float-right"
              variant="link"
              loading={barcodeDeleteLoading}
              onClick={() => {
                deleteSelectedBarcode();
              }}
            >
              {Texts.deleteBarcode}
            </CustomButton>
          </div>
        </div>
      </Col>

      <Col lg="3">
        <img
          src={barcodeData?.templateImage}
          className="card-img-top"
          alt="templateImage"
          style={{
            borderBottom: "1px dashed black",
            maxHeight: "100%",
          }}
        />
      </Col>
    </Row>
  );
};

export default BarcodeDetailCard;
