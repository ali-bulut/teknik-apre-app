import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { fetchTemplatesData } from "../../../../store/actions/BarcodeTemplate/barcodeTemplate";
import { createParty } from "../../../../store/actions/Party/party";
import Texts from "../../../../constants/Texts";

export function useFetchBarcodeTemplatesData() {
  const [createdTemplateValuesData, setCreatedTemplateValuesData] = useState(
    []
  );

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

  const barcodeTemplatesData = useSelector(
    (state) => state.barcodeTemplate.fetchAllData
  );

  useEffect(() => {
    fetchAllBarcodeTemplates();
  }, [fetchAllBarcodeTemplates]);

  return {
    createdTemplateValuesData,
    setCreatedTemplateValuesData,
    barcodeTemplatesLoading,
    barcodeTemplatesLoaded,
    barcodeTemplatesData,
  };
}

export function useCreateNewParty(createdTemplateValuesData) {
  const [createdPartyData, setCreatedPartyData] = useState({
    partyName: "",
    partyCode: "",
    netWeightDivisonNum: "",
    grossWeightAdditionNum: 0,
    templateId: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const createPartyLoading = useSelector((state) => state.party.createLoading);

  const addNewParty = () => {
    const data = {
      ...createdPartyData,
      staticTemplateValues: [...createdTemplateValuesData],
    };

    let isValid = true;

    for (var key in data) {
      if (data[key] === null || data[key] === "") {
        isValid = false;
        break;
      }
    }

    data.staticTemplateValues?.forEach((x) => {
      if (x.value === null || x.value === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      toast.error(Texts.fillBlanks);
      return false;
    }

    dispatch(createParty(data))
      .then(() => {
        toast.success(Texts.partyCreateSuccess);
        history.push("/barcode/parties");
      })
      .catch((err) => {
        toast.error(Texts.partyCreateError);
      });
  };

  return {
    createdPartyData,
    setCreatedPartyData,
    createPartyLoading,
    addNewParty,
  };
}
