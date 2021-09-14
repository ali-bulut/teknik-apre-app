import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Texts from "../../../../constants/Texts";
import CustomButton from "../../../Common/CustomButton";

const CreateBarcodeForm = ({
  barcodeTemplatesData,
  createdTemplateValuesData,
  setCreatedTemplateValuesData,
  createdBarcodeData,
  setCreatedBarcodeData,
  addNewBarcode,
  createBarcodeLoading,
}) => {
  return (
    <Form>
      <Row className="mt-3">
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>{Texts.barcodeName}</Form.Label>
            <Form.Control
              type="text"
              placeholder={Texts.enterBarcodeName}
              value={createdBarcodeData?.barcodeName}
              onChange={(e) =>
                setCreatedBarcodeData((oldState) => ({
                  ...oldState,
                  barcodeName: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Col>
        <Col md="6">
          <Form.Group className="mb-3">
            <Form.Label>
              {Texts.barcodeCode} {Texts.maxFiveCharacter}
            </Form.Label>
            <Form.Control
              type="text"
              maxLength="5"
              placeholder={Texts.enterBarcodeCode}
              value={createdBarcodeData?.barcodeCode}
              onChange={(e) =>
                setCreatedBarcodeData((oldState) => ({
                  ...oldState,
                  barcodeCode: e.target.value,
                }))
              }
            />
            <Form.Text className="text-muted">
              {Texts.barcodeCodeDesc}{" "}
              <b>
                <i>{Texts.barcodeCodeExm}</i>
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
              value={createdBarcodeData?.netWeightDivisionNum}
              onChange={(e) =>
                setCreatedBarcodeData((oldState) => ({
                  ...oldState,
                  netWeightDivisionNum: e.target.value,
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
              value={createdBarcodeData?.grossWeightAdditionNum}
              onChange={(e) =>
                setCreatedBarcodeData((oldState) => ({
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
                  setCreatedBarcodeData((oldState) => ({
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
                    createdBarcodeData.templateId === template.templateId &&
                    "aquamarine",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: 200 }}
                  src={Texts.apiUrl + template.templateImage}
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
        {createdBarcodeData.templateId &&
          barcodeTemplatesData
            ?.find((b) => b.templateId === createdBarcodeData.templateId)
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
      {createdBarcodeData.templateId && (
        <CustomButton
          onClick={() => addNewBarcode()}
          className="float-right mb-3"
          loading={createBarcodeLoading}
        >
          {Texts.createBarcode}
        </CustomButton>
      )}
    </Form>
  );
};

export default CreateBarcodeForm;
