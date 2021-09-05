import { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Texts from "../../../constants/Texts";
import {
  deleteBarcode,
  fetchBarcode,
  fetchBarcodeParties,
  updateBarcode,
} from "../../../store/actions/Barcode/barcode";
import { createParty } from "../../../store/actions/Party/party";

export function useFetchBarcodeDetails(id) {
  const dispatch = useDispatch();

  const [divisionNum, setDivisionNum] = useState();
  const [additionNum, setAdditionNum] = useState();
  const [barcodeMainValues, setBarcodeMainValues] = useState([]);

  const barcodeLoading = useSelector((state) => state.barcode.fetchLoading);
  const barcodeLoaded = useSelector((state) => state.barcode.fetchLoaded);
  const barcodeData = useSelector((state) => state.barcode.fetchData);

  const fetchBarcodeDetails = useCallback(() => {
    dispatch(fetchBarcode(id))
      .then((data) => {
        setDivisionNum(data.netWeightDivisionNum);
        setAdditionNum(data.grossWeightAdditionNum);

        let mainValues = [...data.mainValues];
        let copyMainValues = [];
        mainValues.forEach((p) => {
          copyMainValues.push({
            id: p.id,
            columnName: p.columnName,
            value: p.value,
          });
        });
        setBarcodeMainValues([...copyMainValues]);
      })
      .catch((err) => {
        toast.error(Texts.barcodeDetailsError);
      });
  }, [dispatch, id]);

  useEffect(() => {
    fetchBarcodeDetails();
  }, [fetchBarcodeDetails]);

  return {
    fetchBarcodeDetails,
    divisionNum,
    setDivisionNum,
    additionNum,
    setAdditionNum,
    barcodeMainValues,
    setBarcodeMainValues,
    barcodeLoading,
    barcodeLoaded,
    barcodeData,
  };
}

export function useBarcodeOperations({
  id,
  divisionNum,
  additionNum,
  barcodeMainValues,
  barcodeData,
  fetchBarcodeDetails,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);

  const updateSelectedBarcode = () => {
    if (!divisionNum || !additionNum) {
      toast.error(Texts.fillBlanks);
      return;
    }

    let newData = {
      mainValues: barcodeMainValues,
      id: barcodeData.id,
      netWeightDivisionNum: parseFloat(divisionNum),
      grossWeightAdditionNum: parseFloat(additionNum),
    };

    dispatch(updateBarcode(newData))
      .then((data) => {
        toast.success(Texts.barcodeUpdateSuccess);
        setIsEditMode(false);
        fetchBarcodeDetails();
      })
      .catch((err) => {
        toast.error(Texts.barcodeUpdateError);
      });
  };

  const deleteSelectedBarcode = () => {
    if (window.confirm(Texts.barcodeDeleteConfirm)) {
      dispatch(deleteBarcode(barcodeData?.id))
        .then((data) => {
          history.push("/barcodes");
          toast.success(Texts.barcodeDeleteSuccess);
        })
        .catch((err) => {
          toast.error(Texts.barcodeDeleteError);
        });
    } else {
    }
  };

  const barcodeUpdateLoading = useSelector(
    (state) => state.barcode.updateLoading
  );
  const barcodeDeleteLoading = useSelector(
    (state) => state.barcode.deleteLoading
  );

  return {
    isEditMode,
    setIsEditMode,
    updateSelectedBarcode,
    deleteSelectedBarcode,
    barcodeUpdateLoading,
    barcodeDeleteLoading,
  };
}

export function useFetchBarcodeParties(id) {
  const dispatch = useDispatch();

  const [barcodePartiesDataPagination, setBarcodePartiesDataPagination] =
    useState();
  const [paginationItems, setPaginationItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const barcodePartiesLoading = useSelector(
    (state) => state.barcode.fetchAllPartiesLoading
  );
  const barcodePartiesLoaded = useSelector(
    (state) => state.barcode.fetchAllPartiesLoaded
  );
  const barcodePartiesData = useSelector(
    (state) => state.barcode.fetchAllPartiesData
  );

  const fetchSelectedBarcodeParties = useCallback(() => {
    dispatch(fetchBarcodeParties(id))
      .then((data) => {
        let itemCount = data.length;
        let pageCount = 1;
        if (itemCount % perPage !== 0) {
          pageCount = parseInt(itemCount / perPage) + 1;
        } else {
          pageCount = parseInt(itemCount / perPage);
        }

        setPageCount(pageCount);

        let items = [];
        for (let number = 1; number <= pageCount; number++) {
          items.push(
            <Pagination.Item
              id={number + "-page"}
              key={number}
              onClick={() => setActivePage(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        setPaginationItems([...items]);
      })
      .catch((err) => {
        toast.error(Texts.barcodePartiesError);
      });
  }, [dispatch, id, perPage]);

  useEffect(() => {
    fetchSelectedBarcodeParties();
  }, [fetchSelectedBarcodeParties]);

  useEffect(() => {
    paginationItems.forEach((x) => {
      var element = document.getElementById(x.key + "-page")?.parentElement;
      element?.classList.remove("active");

      if (parseInt(x.key) === parseInt(activePage)) {
        var parent = document.getElementById(x.key + "-page")?.parentElement;
        parent?.classList.add("active");
      }
    });

    if (barcodePartiesData) {
      let mainValues = [...barcodePartiesData];
      let copyMainValues = [];

      mainValues.forEach((p) => {
        copyMainValues.push({
          ...p,
        });
      });
      var rangeValues = copyMainValues.slice(
        (activePage - 1) * perPage,
        activePage * perPage
      );
      setBarcodePartiesDataPagination([...rangeValues]);
    }
  }, [activePage, paginationItems, barcodePartiesData, perPage]);

  return {
    barcodePartiesLoading,
    barcodePartiesLoaded,
    barcodePartiesDataPagination,
    setActivePage,
    activePage,
    pageCount,
    paginationItems,
    fetchSelectedBarcodeParties,
  };
}

export function useCreateParty({ fetchSelectedBarcodeParties }) {
  const dispatch = useDispatch();

  const [isCreateMode, setIsCreateMode] = useState(false);
  const [createdPartyNum, setCreatedPartyNum] = useState("");

  const partyCreateLoading = useSelector((state) => state.party.createLoading);

  const createNewParty = useCallback(() => {
    let data = {
      createdPartyNum,
    };

    if (!data.createdPartyNum) {
      toast.error(Texts.fillBlanks);
      return false;
    }

    dispatch(createParty(data))
      .then((data) => {
        toast.success(Texts.partyCreateSuccess);
        setCreatedPartyNum("");
        setIsCreateMode(false);
        fetchSelectedBarcodeParties();
      })
      .catch((err) => {
        toast.error(Texts.partyCreateError);
      });
  }, [dispatch, createdPartyNum, fetchSelectedBarcodeParties]);

  return {
    isCreateMode,
    setIsCreateMode,
    createdPartyNum,
    setCreatedPartyNum,
    partyCreateLoading,
    createNewParty,
  };
}
