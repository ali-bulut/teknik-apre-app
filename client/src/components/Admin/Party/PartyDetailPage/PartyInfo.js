import React from "react";
import { Col, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import Texts from "../../../../constants/Texts";
import BlankSpace from "../../../Common/BlankSpace";
import CustomButton from "../../../Common/CustomButton";

const PartyInfo = ({
  partyLineItemsData,
  isEditMode,
  setIsEditMode,
  updatedPartyNum,
  setUpdatedPartyNum,
  partyUpdateLoading,
  updateSelectedParty,
  deleteSelectedParty,
  partyDeleteLoading,
}) => {
  return (
    <React.Fragment>
      <BlankSpace />

      <Row>
        <Col md="6">
          <span style={{ fontSize: 21 }}>
            <b>{Texts.barcode}: </b> {partyLineItemsData?.barcodeName}
          </span>
          <br />

          <span style={{ fontSize: 21, cursor: "pointer" }}>
            <b>{Texts.partyNum}: </b>
            {!isEditMode ? (
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 400 }}
                overlay={
                  <Tooltip id="tooltip-disabled">{Texts.clickToUpdate}</Tooltip>
                }
              >
                <span
                  onClick={() => {
                    setIsEditMode(true);
                    setUpdatedPartyNum(partyLineItemsData?.partyNum);
                  }}
                >
                  {partyLineItemsData?.partyNum}
                </span>
              </OverlayTrigger>
            ) : (
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={updatedPartyNum}
                  onChange={(e) => setUpdatedPartyNum(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    disabled={partyUpdateLoading}
                  >
                    {Texts.cancel}
                  </button>

                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={updateSelectedParty}
                    disabled={partyUpdateLoading}
                  >
                    {partyUpdateLoading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : (
                      Texts.update
                    )}
                  </button>
                </div>
              </div>
            )}
          </span>
        </Col>
        <Col md="6">
          <CustomButton
            onClick={deleteSelectedParty}
            loading={partyDeleteLoading}
            className="float-right"
            variant="danger"
          >
            {Texts.deleteParty}
          </CustomButton>
        </Col>
      </Row>

      <BlankSpace />
    </React.Fragment>
  );
};

export default PartyInfo;
