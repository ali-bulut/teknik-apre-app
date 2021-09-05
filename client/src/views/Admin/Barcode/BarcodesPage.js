import React from "react";

import HeaderContent from "../../../components/Common/HeaderContent";
import Texts from "../../../constants/Texts";

import CustomSpinner from "../../../components/Common/CustomSpinner";
import BlankSpace from "../../../components/Common/BlankSpace";
import BarcodesTable from "../../../components/Admin/Barcode/BarcodesPage/BarcodesTable";
import { useFetchBarcodes } from "../../../hooks/Admin/Barcode/BarcodesPageHooks";

const BarcodesPage = () => {
  const {
    barcodesLoading,
    barcodesLoaded,
    activePage,
    setActivePage,
    pageCount,
    paginationItems,
    paginatedData,
  } = useFetchBarcodes();

  return (
    <React.Fragment>
      <HeaderContent
        buttonText={Texts.createBarcode}
        to="/barcodes/create"
        className="float-right"
        headerTitle={Texts.barcodeList}
      />

      <BlankSpace />

      {barcodesLoading && !barcodesLoaded ? (
        <CustomSpinner />
      ) : (
        <BarcodesTable
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

export default BarcodesPage;
