import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Texts from "../../../../../constants/Texts";
import CustomButton from "../../../../Common/CustomButton";

const CreatePartyForm = ({
  createdPartyData,
  setCreatedPartyData,
  barcodeTemplatesData,
  createdTemplateValuesData,
  setCreatedTemplateValuesData,
  addNewParty,
  createPartyLoading,
}) => {
  return (
    <Form>
      <Row className="mt-3">
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>{Texts.partyName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={Texts.enterPartyName}
              value={createdPartyData?.partyName}
              onChange={(e) =>
                setCreatedPartyData((oldState) => ({
                  ...oldState,
                  partyName: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>
              {Texts.partyCode} {Texts.maxFiveCharacter}
            </Form.Label>
            <Form.Control
              type="text"
              maxLength="5"
              placeholder={Texts.enterPartyCode}
              value={createdPartyData?.partyCode}
              onChange={(e) =>
                setCreatedPartyData((oldState) => ({
                  ...oldState,
                  partyCode: e.target.value,
                }))
              }
            />
            <Form.Text className="text-muted">
              {Texts.partyCodeDesc}{" "}
              <b>
                <i>{Texts.partyCodeExm}</i>
              </b>
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>{Texts.divisionNumber}</Form.Label>
            <Form.Control
              type="number"
              placeholder={Texts.enterDivisionNumber}
              value={createdPartyData?.netWeightDivisonNum}
              onChange={(e) =>
                setCreatedPartyData((oldState) => ({
                  ...oldState,
                  netWeightDivisonNum: e.target.value,
                }))
              }
            />
            <Form.Text className="text-muted">
              {Texts.divisonNumberDesc}
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>{Texts.additionNumber}</Form.Label>
            <Form.Control
              type="number"
              placeholder={Texts.enterAdditionNumber}
              value={createdPartyData?.grossWeightAdditionNum}
              onChange={(e) =>
                setCreatedPartyData((oldState) => ({
                  ...oldState,
                  grossWeightAdditionNum: e.target.value,
                }))
              }
            />
            <Form.Text className="text-muted">
              {Texts.additionNumberDesc}{" "}
              <b>
                <i>{Texts.additionNumberWarning}</i>
              </b>
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>{Texts.chooseTemplate}</Form.Label>
        <Row style={{ margin: 0, justifyContent: "space-around" }}>
          {barcodeTemplatesData?.map((template, index) => {
            return (
              <Card
                key={index}
                onClick={() => {
                  setCreatedPartyData((oldState) => ({
                    ...oldState,
                    templateId: template.templateId,
                  }));

                  let newArr = [];
                  barcodeTemplatesData
                    ?.find((b) => b.templateId === template.templateId)
                    ?.staticTemplateValues.forEach((x) => {
                      newArr.push({ ...x, value: "" });
                    });

                  setCreatedTemplateValuesData(newArr);
                }}
                style={{
                  width: "18rem",
                  marginRight: 10,
                  cursor: "pointer",
                  backgroundColor:
                    createdPartyData.templateId === template.templateId &&
                    "aquamarine",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: 200 }}
                  src={template.templateImage}
                />
                <Card.Body>
                  <Card.Title>{template.templateName}</Card.Title>
                  <Card.Text>{template.templateDesc}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Form.Group>

      <Row>
        {createdPartyData.templateId &&
          barcodeTemplatesData
            ?.find((b) => b.templateId === createdPartyData.templateId)
            ?.staticTemplateValues?.map((p, i) => (
              <Col md="6" key={i}>
                <Form.Group className="mb-3">
                  <Form.Label>{p.columnName.toUpperCase()}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      p.columnName.charAt(0).toUpperCase() +
                      p.columnName.slice(1) +
                      " " +
                      Texts.enter
                    }
                    value={
                      createdTemplateValuesData.find(
                        (x) => x.templateValuesId === p.templateValuesId
                      ).value
                    }
                    onChange={(e) => {
                      let newArr = [...createdTemplateValuesData];
                      newArr.find(
                        (x) => x.templateValuesId === p.templateValuesId
                      ).value = e.target.value;
                      setCreatedTemplateValuesData([...newArr]);
                    }}
                  />
                </Form.Group>
              </Col>
            ))}
      </Row>
      {createdPartyData.templateId && (
        <CustomButton
          onClick={() => addNewParty()}
          className="float-right mb-3"
          loading={createPartyLoading}
        >
          {Texts.createParty}
        </CustomButton>
      )}
    </Form>
  );
};

export default CreatePartyForm;
