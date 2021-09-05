import React from "react";

import CustomSpinner from "../../../components/Common/CustomSpinner";
import HeaderContent from "../../../components/Common/HeaderContent";
import Texts from "../../../constants/Texts";

import {
  useCreateNewBarcode,
  useFetchBarcodeTemplatesData,
} from "../../../hooks/Admin/Barcode/CreateBarcodePageHooks";
import CreateBarcodeForm from "../../../components/Admin/Barcode/CreateBarcodePage/CreateBarcodeForm";

const CreateBarcodePage = () => {
  const {
    createdTemplateValuesData,
    setCreatedTemplateValuesData,
    barcodeTemplatesLoading,
    barcodeTemplatesLoaded,
    barcodeTemplatesData,
  } = useFetchBarcodeTemplatesData();

  const {
    createdBarcodeData,
    setCreatedBarcodeData,
    createBarcodeLoading,
    addNewBarcode,
  } = useCreateNewBarcode(createdTemplateValuesData);

  return (
    <React.Fragment>
      <HeaderContent buttonText={Texts.backToBarcodes} to="/barcodes" />

      {barcodeTemplatesLoading && !barcodeTemplatesLoaded ? (
        <CustomSpinner />
      ) : (
        <CreateBarcodeForm
          createdBarcodeData={createdBarcodeData}
          setCreatedBarcodeData={setCreatedBarcodeData}
          barcodeTemplatesData={barcodeTemplatesData}
          createdTemplateValuesData={createdTemplateValuesData}
          setCreatedTemplateValuesData={setCreatedTemplateValuesData}
          addNewBarcode={addNewBarcode}
          createBarcodeLoading={createBarcodeLoading}
        />
      )}
    </React.Fragment>
  );
};

export default CreateBarcodePage;
