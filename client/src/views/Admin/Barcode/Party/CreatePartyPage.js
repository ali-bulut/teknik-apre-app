import React from "react";

import CustomSpinner from "../../../../components/Common/CustomSpinner";
import HeaderContent from "../../../../components/Common/HeaderContent";
import CreatePartyForm from "../../../../components/Admin/Barcode/Party/CreatePartyPage/CreatePartyForm";
import Texts from "../../../../constants/Texts";

import {
  useCreateNewParty,
  useFetchBarcodeTemplatesData,
} from "../../../../hooks/Admin/Barcode/Party/CreatePartyPageHooks";

const CreatePartyPage = () => {
  const {
    createdTemplateValuesData,
    setCreatedTemplateValuesData,
    barcodeTemplatesLoading,
    barcodeTemplatesLoaded,
    barcodeTemplatesData,
  } = useFetchBarcodeTemplatesData();

  const {
    createdPartyData,
    setCreatedPartyData,
    createPartyLoading,
    addNewParty,
  } = useCreateNewParty(createdTemplateValuesData);

  return (
    <React.Fragment>
      <HeaderContent buttonText={Texts.backToParties} to="/barcode/parties" />

      {barcodeTemplatesLoading && !barcodeTemplatesLoaded ? (
        <CustomSpinner />
      ) : (
        <CreatePartyForm
          createdPartyData={createdPartyData}
          setCreatedPartyData={setCreatedPartyData}
          barcodeTemplatesData={barcodeTemplatesData}
          createdTemplateValuesData={createdTemplateValuesData}
          setCreatedTemplateValuesData={setCreatedTemplateValuesData}
          addNewParty={addNewParty}
          createPartyLoading={createPartyLoading}
        />
      )}
    </React.Fragment>
  );
};

export default CreatePartyPage;
