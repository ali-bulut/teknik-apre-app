import React from "react";

import HeaderContent from "../../../../components/Common/HeaderContent";
import Texts from "../../../../constants/Texts";

import { useFetchParties } from "../../../../hooks/Admin/Barcode/Party/PartiesPageHooks";
import CustomSpinner from "../../../../components/Common/CustomSpinner";
import BlankSpace from "../../../../components/Common/BlankSpace";
import PartiesTable from "../../../../components/Admin/Barcode/Party/PartiesPage/PartiesTable";

const PartiesPage = () => {
  const {
    barcodeTemplatesLoading,
    barcodeTemplatesLoaded,
    activePage,
    setActivePage,
    pageCount,
    paginationItems,
    paginatedData,
  } = useFetchParties();

  return (
    <React.Fragment>
      <HeaderContent
        buttonText={Texts.createParty}
        to="/barcode/parties/create"
        className="float-right"
        headerTitle={Texts.partyList}
      />

      <BlankSpace />

      {barcodeTemplatesLoading && !barcodeTemplatesLoaded ? (
        <CustomSpinner />
      ) : (
        <PartiesTable
          paginatedData={paginatedData}
          activePage={activePage}
          setActivePage={setActivePage}
          pageCount={pageCount}
          paginationItems={paginationItems}
        />
      )}
    </React.Fragment>
  );
};

export default PartiesPage;
