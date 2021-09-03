import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import PartyDetailCard from "../../../../components/Admin/Barcode/Party/PartyDetailPage/PartyDetailCard";
import PartyLineItemsTable from "../../../../components/Admin/Barcode/Party/PartyDetailPage/PartyLineItemsTable";
import BlankSpace from "../../../../components/Common/BlankSpace";
import CustomPagination from "../../../../components/Common/CustomPagination";
import CustomSpinner from "../../../../components/Common/CustomSpinner";
import HeaderContent from "../../../../components/Common/HeaderContent";
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
      <HeaderContent
        buttonText={Texts.backToParties}
        to="/barcode/parties"
        extraButtonText={Texts.createExcelFile}
        onClick={createPartyExcel}
        loading={createExcelFileLoading}
      />

      <BlankSpace />

      {partyLoading && !partyLoaded ? (
        <CustomSpinner />
      ) : (
        <PartyDetailCard
          partyData={partyData}
          partyUpdateLoading={partyUpdateLoading}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          updateSelectedParty={updateSelectedParty}
          setPartyMainValues={setPartyMainValues}
          additionNum={additionNum}
          setAdditionNum={setAdditionNum}
          divisionNum={divisionNum}
          setDivisionNum={setDivisionNum}
          partyMainValues={partyMainValues}
          partyDeleteLoading={partyDeleteLoading}
          deleteSelectedParty={deleteSelectedParty}
        />
      )}

      <Row>
        <Col md="12">
          {partyLineItemsLoading && !partyLineItemsLoaded ? (
            <CustomSpinner />
          ) : (
            <div>
              <BlankSpace />

              <PartyLineItemsTable
                lineItemHeaders={lineItemHeaders}
                isCreateMode={isCreateMode}
                setIsCreateMode={setIsCreateMode}
                createdRollNo={createdRollNo}
                setCreatedRollNo={setCreatedRollNo}
                partyData={partyData}
                enteredLineItemValues={enteredLineItemValues}
                setEnteredLineItemValues={setEnteredLineItemValues}
                createNewLineItem={createNewLineItem}
                partyLineItemCreateLoading={partyLineItemCreateLoading}
                lastLineItemNum={lastLineItemNum}
                partyLineItemsDataPagination={partyLineItemsDataPagination}
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
