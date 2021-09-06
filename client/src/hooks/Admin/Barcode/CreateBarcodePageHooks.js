import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { fetchTemplatesData } from "../../../store/actions/BarcodeTemplate/barcodeTemplate";
import Texts from "../../../constants/Texts";
import { createBarcode } from "../../../store/actions/Barcode/barcode";

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

export function useCreateNewBarcode(createdTemplateValuesData) {
  const [createdBarcodeData, setCreatedBarcodeData] = useState({
    barcodeName: "",
    barcodeCode: "",
    netWeightDivisionNum: "",
    grossWeightAdditionNum: 0,
    templateId: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const createBarcodeLoading = useSelector(
    (state) => state.barcode.createLoading
  );

  const addNewBarcode = () => {
    const data = {
      ...createdBarcodeData,
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

    dispatch(createBarcode(data))
      .then(() => {
        toast.success(Texts.barcodeCreateSuccess);
        history.push("/barcodes");
      })
      .catch((err) => {
        toast.error(Texts.barcodeCreateError);
      });
  };

  return {
    createdBarcodeData,
    setCreatedBarcodeData,
    createBarcodeLoading,
    addNewBarcode,
  };
}
