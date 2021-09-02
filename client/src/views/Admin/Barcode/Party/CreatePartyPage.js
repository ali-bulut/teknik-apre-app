import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Texts from "../../../../constants/Texts";
import CustomSpinner from "../../../../components/Common/CustomSpinner";

import { fetchTemplatesData } from "../../../../store/actions/BarcodeTemplate/barcodeTemplate";

const CreatePartyPage = () => {
  const dispatch = useDispatch();

  const fetchAllBarcodeTemplates = useCallback(() => {
    dispatch(fetchTemplatesData()).catch((err) => {
      toast.error(Texts.fetchBarcodeTemplatesError);
    });
  }, [dispatch]);

  const barcodeTemplatesLoading = useSelector(
    (state) => state.barcodeTemplate.fetchAllLoading
  );

  const barcodeTemplatesLoaded = useSelector(
    (state) => state.barcodeTemplate.fetchAllLoaded
  );

  useEffect(() => {
    fetchAllBarcodeTemplates();
  }, [fetchAllBarcodeTemplates]);

  if (barcodeTemplatesLoading && !barcodeTemplatesLoaded) {
    return <CustomSpinner />;
  }

  return <div></div>;
};

export default CreatePartyPage;
