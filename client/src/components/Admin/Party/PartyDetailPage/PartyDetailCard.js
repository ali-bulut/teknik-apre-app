import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Texts from "../../../../constants/Texts";
import CustomButton from "../../../Common/CustomButton";

const PartyDetailCard = ({
  partyData,
  partyUpdateLoading,
  isEditMode,
  setIsEditMode,
  updateSelectedParty,
  setPartyMainValues,
  additionNum,
  setAdditionNum,
  divisionNum,
  setDivisionNum,
  partyMainValues,
  partyDeleteLoading,
  deleteSelectedParty,
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
              <h4 style={{ display: "inline" }} className="card-title">
                {partyData?.barcodeName}
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
                  setAdditionNum(partyData.grossWeightAdditionNum);
                  setDivisionNum(partyData.netWeightDivisionNum);

                  setIsEditMode(false);
                }}
              >
                {Texts.cancel}
              </Button>
            </div>

            <div className="clearfix"></div>

            <Row>
              <Col md="6">
                <b>{Texts.partyNum.toUpperCase()}</b>:
                <span>{partyData.partyNum}</span>
              </Col>
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
        </div>
      </Col>

      <Col lg="3">
        <img
          src={partyData?.templateImage}
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

export default PartyDetailCard;
