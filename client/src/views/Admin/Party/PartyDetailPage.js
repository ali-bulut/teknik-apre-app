import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PartyInfo from "../../../components/Admin/Party/PartyDetailPage/PartyInfo";

import PartyLineItemsTable from "../../../components/Admin/Party/PartyDetailPage/PartyLineItemsTable";
import BlankSpace from "../../../components/Common/BlankSpace";
import CustomPagination from "../../../components/Common/CustomPagination";
import CustomSpinner from "../../../components/Common/CustomSpinner";
import HeaderContent from "../../../components/Common/HeaderContent";
import Texts from "../../../constants/Texts";

import {
  useFetchPartyLineItems,
  usePartyLineItemOperations,
  usePartyOperations,
} from "../../../hooks/Admin/Party/PartyDetailPageHooks";

const PartyDetailPage = () => {
  const id = useParams().partyId;
  const barcodeId = useParams().barcodeId;

  const {
    fetchSelectedPartyLineItems,
    partyLineItemsDataPagination,
    paginationItems,
    activePage,
    setActivePage,
    enteredLineItemValues,
    setEnteredLineItemValues,
    lineItemHeaders,
    lastLineItemNum,
    createdRollNo,
    setCreatedRollNo,
    pageCount,
    partyLineItemsLoading,
    partyLineItemsLoaded,
    partyLineItemsData,
  } = useFetchPartyLineItems(id);

  const {
    deleteSelectedParty,
    createPartyExcel,
    partyDeleteLoading,
    createExcelFileLoading,
    isEditMode,
    setIsEditMode,
    setUpdatedPartyNum,
    updatedPartyNum,
    partyUpdateLoading,
    updateSelectedParty,
  } = usePartyOperations({
    id,
    barcodeId,
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
    partyLineItemsData,
  });

  return (
    <React.Fragment>
      <HeaderContent
        buttonText={Texts.backToBarcodePage}
        to={"/barcodes/" + barcodeId}
        extraButtonText={Texts.createExcelFile}
        onClick={createPartyExcel}
        loading={createExcelFileLoading}
      />

      <Row>
        <Col md="12">
          {partyLineItemsLoading && !partyLineItemsLoaded ? (
            <CustomSpinner />
          ) : (
            <div>
              <PartyInfo
                partyLineItemsData={partyLineItemsData}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                updatedPartyNum={updatedPartyNum}
                setUpdatedPartyNum={setUpdatedPartyNum}
                partyUpdateLoading={partyUpdateLoading}
                updateSelectedParty={updateSelectedParty}
                deleteSelectedParty={deleteSelectedParty}
                partyDeleteLoading={partyDeleteLoading}
              />

              <PartyLineItemsTable
                lineItemHeaders={lineItemHeaders}
                isCreateMode={isCreateMode}
                setIsCreateMode={setIsCreateMode}
                createdRollNo={createdRollNo}
                setCreatedRollNo={setCreatedRollNo}
                enteredLineItemValues={enteredLineItemValues}
                setEnteredLineItemValues={setEnteredLineItemValues}
                createNewLineItem={createNewLineItem}
                partyLineItemCreateLoading={partyLineItemCreateLoading}
                lastLineItemNum={lastLineItemNum}
                partyLineItemsDataPagination={partyLineItemsDataPagination}
                partyLineItemsData={partyLineItemsData}
                deleteSelectedPartyLineItem={deleteSelectedPartyLineItem}
                lastlyDeletedLineItemId={lastlyDeletedLineItemId}
                partyLineItemDeleteLoading={partyLineItemDeleteLoading}
              />

              <CustomPagination
                setActivePage={setActivePage}
                activePage={activePage}
                paginationItems={paginationItems}
                pageCount={pageCount}
              />
            </div>
          )}
        </Col>
      </Row>

      <BlankSpace />
    </React.Fragment>
  );
};

export default PartyDetailPage;
