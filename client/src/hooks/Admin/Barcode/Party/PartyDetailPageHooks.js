import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Texts from "../../../../constants/Texts";
import {
  deleteParty,
  fetchParty,
  updateParty,
} from "../../../../store/actions/Party/party";
import {
  createExcelFile,
  createPartyLineItem,
  deletePartyLineItem,
  fetchPartyLineItems,
} from "../../../../store/actions/Party/partyLineItems";

export function useFetchPartyDetails(id) {
  const dispatch = useDispatch();

  const [partyLineItemsDataPagination, setPartyLineItemsDataPagination] =
    useState();
  const [paginationItems, setPaginationItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [divisionNum, setDivisionNum] = useState();
  const [additionNum, setAdditionNum] = useState();
  const [partyMainValues, setPartyMainValues] = useState([]);
  const [enteredLineItemValues, setEnteredLineItemValues] = useState([]);
  const [lineItemHeaders, setLineItemHeaders] = useState([]);
  const [lastLineItemNum, setLastLineItemNum] = useState(0);
  const [createdRollNo, setCreatedRollNo] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const partyLoading = useSelector((state) => state.party.fetchLoading);
  const partyLoaded = useSelector((state) => state.party.fetchLoaded);
  const partyData = useSelector((state) => state.party.fetchData);

  const partyLineItemsLoading = useSelector(
    (state) => state.party.lineItemsLoading
  );
  const partyLineItemsLoaded = useSelector(
    (state) => state.party.lineItemsLoaded
  );
  const partyLineItemsData = useSelector((state) => state.party.lineItemsData);

  const fetchPartyDetails = useCallback(() => {
    dispatch(fetchParty(id))
      .then((data) => {
        setDivisionNum(data.net_weight_division_num);
        setAdditionNum(data.gross_weight_addition_num);
        let mainValues = [...data.mainValues];
        let copyMainValues = [];
        mainValues.forEach((p) => {
          copyMainValues.push({
            id: p.id,
            columnName: p.columnName,
            value: p.value,
          });
        });
        setPartyMainValues([...copyMainValues]);
        setEnteredLineItemValues([]);

        data?.enteredValues?.forEach((x) => {
          setEnteredLineItemValues((oldState) => [
            ...oldState,
            { ...x, value: "" },
          ]);
        });
      })
      .catch((err) => {
        toast.error(Texts.partyDetailsError);
      });
  }, [dispatch, id]);

  const fetchSelectedPartyLineItems = useCallback(() => {
    dispatch(fetchPartyLineItems(id))
      .then((res) => {
        let newArr = [];
        if (res.data.length > 0) {
          res.data[0].lineItemValues.forEach((p) => {
            newArr.push(p.columnName);
          });

          let sortedArr = res.data.sort(function (a, b) {
            return parseFloat(b.lineItemNum) - parseFloat(a.lineItemNum);
          });

          setLastLineItemNum(sortedArr[0].lineItemNum + 1);
          setCreatedRollNo(sortedArr[0].lineItemNum + 1);
        }
        setLineItemHeaders(newArr);

        let itemCount = res.data.length;
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
        toast.error(Texts.partyLineItemsError);
      });
  }, [dispatch, id, perPage]);

  useEffect(() => {
    fetchPartyDetails();
    fetchSelectedPartyLineItems();
  }, [fetchPartyDetails, fetchSelectedPartyLineItems]);

  useEffect(() => {
    paginationItems.forEach((x) => {
      var element = document.getElementById(x.key + "-page")?.parentElement;
      element?.classList.remove("active");

      if (parseInt(x.key) === parseInt(activePage)) {
        var parent = document.getElementById(x.key + "-page")?.parentElement;
        parent?.classList.add("active");
      }
    });

    if (partyLineItemsData?.data) {
      let mainValues = [...partyLineItemsData?.data];
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
      setPartyLineItemsDataPagination([...rangeValues]);
    }
  }, [activePage, paginationItems, partyLineItemsData, perPage]);

  return {
    fetchPartyDetails,
    fetchSelectedPartyLineItems,
    partyLineItemsDataPagination,
    setPartyLineItemsDataPagination,
    paginationItems,
    setPaginationItems,
    activePage,
    setActivePage,
    perPage,
    setPerPage,
    divisionNum,
    setDivisionNum,
    additionNum,
    setAdditionNum,
    partyMainValues,
    setPartyMainValues,
    enteredLineItemValues,
    setEnteredLineItemValues,
    lineItemHeaders,
    setLineItemHeaders,
    lastLineItemNum,
    setLastLineItemNum,
    createdRollNo,
    setCreatedRollNo,
    pageCount,
    setPageCount,
    partyLoading,
    partyLoaded,
    partyData,
    partyLineItemsLoading,
    partyLineItemsLoaded,
    partyLineItemsData,
  };
}

export function usePartyOperations({
  id,
  divisionNum,
  additionNum,
  partyMainValues,
  partyData,
  fetchPartyDetails,
  fetchSelectedPartyLineItems,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);

  const updateSelectedParty = () => {
    if (!divisionNum || !additionNum) {
      toast.error(Texts.fillBlanks);
      return;
    }

    let newData = {
      mainValues: partyMainValues,
      id: partyData.id,
      net_weight_division_num: parseFloat(divisionNum),
      gross_weight_addition_num: parseFloat(additionNum),
    };

    dispatch(updateParty(newData))
      .then((data) => {
        toast.success(Texts.partyUpdateSuccess);
        setIsEditMode(false);
        fetchPartyDetails();
        fetchSelectedPartyLineItems();
      })
      .catch((err) => {
        toast.error(Texts.partyUpdateError);
      });
  };

  const deleteSelectedParty = () => {
    if (window.confirm(Texts.partyDeleteConfirm)) {
      dispatch(deleteParty(partyData?.id))
        .then((data) => {
          history.push("/barcode/parties");
          toast.success(Texts.partyDeleteSuccess);
        })
        .catch((err) => {
          toast.error(Texts.partyDeleteError);
        });
    } else {
    }
  };
  const createPartyExcel = () => {
    dispatch(createExcelFile(id))
      .then((data) => {
        window.open(data.file, "_blank");
      })
      .catch((err) => {
        toast.error(Texts.createExcelFileError);
      });
  };

  const partyUpdateLoading = useSelector((state) => state.party.updateLoading);
  const partyDeleteLoading = useSelector((state) => state.party.deleteLoading);
  const createExcelFileLoading = useSelector(
    (state) => state.party.createExcelFileLoading
  );

  return {
    isEditMode,
    setIsEditMode,
    updateSelectedParty,
    deleteSelectedParty,
    createPartyExcel,
    partyUpdateLoading,
    partyDeleteLoading,
    createExcelFileLoading,
  };
}

export function usePartyLineItemOperations({
  id,
  fetchSelectedPartyLineItems,
  setActivePage,
  createdRollNo,
  enteredLineItemValues,
  setEnteredLineItemValues,
  partyData,
}) {
  const dispatch = useDispatch();

  const [lastlyDeletedLineItemId, setLastlyDeletedLineItemId] = useState();
  const [isCreateMode, setIsCreateMode] = useState(false);

  const deleteSelectedPartyLineItem = (id) => {
    setLastlyDeletedLineItemId(id);
    dispatch(deletePartyLineItem(id))
      .then(() => {
        toast.success(Texts.partyLineItemDeleteSuccess);
        fetchSelectedPartyLineItems();
        setActivePage(1);
      })
      .catch((err) => {
        toast.error(Texts.partyLineItemDeleteError);
      });
  };

  const createNewLineItem = () => {
    let isEmpty = false;

    if (!createdRollNo) {
      isEmpty = true;
    }

    console.log(createdRollNo);

    enteredLineItemValues.forEach((x) => {
      console.log(x);
      if (!x.value) {
        isEmpty = true;
      }
      return;
    });

    if (isEmpty) {
      toast.error(Texts.fillBlanks);
      return;
    }

    let data = {
      partyId: id,
      rollNo: createdRollNo,
      enteredLineItemValues,
    };

    dispatch(createPartyLineItem(data))
      .then((res) => {
        toast.success(Texts.createPartyLineItemSuccess);
        fetchSelectedPartyLineItems();
        setIsCreateMode(false);
        setEnteredLineItemValues([]);

        partyData?.enteredValues?.forEach((x) => {
          setEnteredLineItemValues((oldState) => [
            ...oldState,
            { ...x, value: "" },
          ]);
        });
        setActivePage(1);

        window.open(res.htmlPath, "_blank");
      })
      .catch((err) => {
        toast.error(Texts.createPartyLineItemError);
      });
  };

  const partyLineItemDeleteLoading = useSelector(
    (state) => state.party.lineItemDeleteLoading
  );

  const partyLineItemCreateLoading = useSelector(
    (state) => state.party.lineItemCreateLoading
  );

  return {
    lastlyDeletedLineItemId,
    setLastlyDeletedLineItemId,
    isCreateMode,
    setIsCreateMode,
    deleteSelectedPartyLineItem,
    createNewLineItem,
    partyLineItemDeleteLoading,
    partyLineItemCreateLoading,
  };
}
