import React from "react";
import { useParams } from "react-router-dom";
import BarcodeDetailCard from "../../../components/Admin/Barcode/BarcodeDetailPage/BarcodeDetailCard";
import BarcodePartiesTable from "../../../components/Admin/Barcode/BarcodeDetailPage/BarcodePartiesTable";

import BlankSpace from "../../../components/Common/BlankSpace";
import CustomPagination from "../../../components/Common/CustomPagination";
import CustomSpinner from "../../../components/Common/CustomSpinner";
import HeaderContent from "../../../components/Common/HeaderContent";
import Texts from "../../../constants/Texts";
import {
  useBarcodeOperations,
  useCreateParty,
  useFetchBarcodeDetails,
  useFetchBarcodeParties,
} from "../../../hooks/Admin/Barcode/BarcodeDetailPageHooks";

const BarcodeDetailPage = () => {
  const { id } = useParams();

  const {
    divisionNum,
    setDivisionNum,
    additionNum,
    setAdditionNum,
    fetchBarcodeDetails,
    barcodeMainValues,
    setBarcodeMainValues,
    barcodeLoading,
    barcodeLoaded,
    barcodeData,
    updatedBarcodeName,
    setUpdatedBarcodeName,
  } = useFetchBarcodeDetails(id);

  const {
    isEditMode,
    setIsEditMode,
    updateSelectedBarcode,
    deleteSelectedBarcode,
    barcodeUpdateLoading,
    barcodeDeleteLoading,
  } = useBarcodeOperations({
    id,
    divisionNum,
    additionNum,
    updatedBarcodeName,
    barcodeMainValues,
    barcodeData,
    fetchBarcodeDetails,
  });

  const {
    barcodePartiesLoading,
    barcodePartiesLoaded,
    barcodePartiesDataPagination,
    setActivePage,
    activePage,
    pageCount,
    paginationItems,
    fetchSelectedBarcodeParties,
  } = useFetchBarcodeParties(id);

  const {
    isCreateMode,
    setIsCreateMode,
    createdPartyNum,
    setCreatedPartyNum,
    partyCreateLoading,
    createNewParty,
  } = useCreateParty({ fetchSelectedBarcodeParties });

  return (
    <React.Fragment>
      <HeaderContent buttonText={Texts.backToBarcodes} to="/barcodes" />

      <BlankSpace />

      {barcodeLoading && !barcodeLoaded ? (
        <CustomSpinner />
      ) : (
        <BarcodeDetailCard
          barcodeData={barcodeData}
          barcodeUpdateLoading={barcodeUpdateLoading}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          updateSelectedBarcode={updateSelectedBarcode}
          setBarcodeMainValues={setBarcodeMainValues}
          additionNum={additionNum}
          setAdditionNum={setAdditionNum}
          divisionNum={divisionNum}
          setDivisionNum={setDivisionNum}
          barcodeMainValues={barcodeMainValues}
          barcodeDeleteLoading={barcodeDeleteLoading}
          deleteSelectedBarcode={deleteSelectedBarcode}
          updatedBarcodeName={updatedBarcodeName}
          setUpdatedBarcodeName={setUpdatedBarcodeName}
        />
      )}

      <BlankSpace />

      {barcodePartiesLoading && !barcodePartiesLoaded ? (
        <CustomSpinner />
      ) : (
        <div>
          <BarcodePartiesTable
            barcodePartiesData={barcodePartiesDataPagination}
            barcodeId={id}
            isCreateMode={isCreateMode}
            setIsCreateMode={setIsCreateMode}
            createdPartyNum={createdPartyNum}
            setCreatedPartyNum={setCreatedPartyNum}
            partyCreateLoading={partyCreateLoading}
            createNewParty={createNewParty}
          />

          <CustomPagination
            setActivePage={setActivePage}
            activePage={activePage}
            paginationItems={paginationItems}
            pageCount={pageCount}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default BarcodeDetailPage;
