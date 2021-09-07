import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Texts from "../../../constants/Texts";
import { deleteParty, updateParty } from "../../../store/actions/Party/party";
import {
  createExcelFile,
  createPartyLineItem,
  deletePartyLineItem,
  fetchPartyLineItems,
} from "../../../store/actions/Party/partyLineItems";

export function useFetchPartyLineItems(id) {
  const dispatch = useDispatch();

  const [partyLineItemsDataPagination, setPartyLineItemsDataPagination] =
    useState();
  const [paginationItems, setPaginationItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [enteredLineItemValues, setEnteredLineItemValues] = useState([]);
  const [lineItemHeaders, setLineItemHeaders] = useState([]);
  const [lastLineItemNum, setLastLineItemNum] = useState(1);
  const [createdRollNo, setCreatedRollNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const partyLineItemsLoading = useSelector(
    (state) => state.party.lineItemsLoading
  );
  const partyLineItemsLoaded = useSelector(
    (state) => state.party.lineItemsLoaded
  );
  const partyLineItemsData = useSelector((state) => state.party.lineItemsData);

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
        } else {
          setLastLineItemNum(1);
          setCreatedRollNo(1);
        }
        setLineItemHeaders(newArr);

        setEnteredLineItemValues([]);

        res.enteredValues?.forEach((x) => {
          setEnteredLineItemValues((oldState) => [
            ...oldState,
            { ...x, value: "" },
          ]);
        });

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
    fetchSelectedPartyLineItems();
  }, [fetchSelectedPartyLineItems]);

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
    fetchSelectedPartyLineItems,
    partyLineItemsDataPagination,
    setPartyLineItemsDataPagination,
    paginationItems,
    setPaginationItems,
    activePage,
    setActivePage,
    perPage,
    setPerPage,
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
    partyLineItemsLoading,
    partyLineItemsLoaded,
    partyLineItemsData,
  };
}

export function usePartyOperations({
  id,
  barcodeId,
  fetchSelectedPartyLineItems,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedPartyNum, setUpdatedPartyNum] = useState();

  const updateSelectedParty = () => {
    let data = {
      partyId: id,
      updatedPartyNum,
    };
    dispatch(updateParty(data))
      .then(() => {
        toast.success(Texts.partyUpdateSuccess);
        setIsEditMode(false);
        fetchSelectedPartyLineItems();
      })
      .catch((err) => {
        toast.error(Texts.partyUpdateError);
      });
  };

  const deleteSelectedParty = () => {
    if (window.confirm(Texts.partyDeleteConfirm)) {
      dispatch(deleteParty(id))
        .then((data) => {
          history.push("/barcodes/" + barcodeId);
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
    deleteSelectedParty,
    createPartyExcel,
    partyDeleteLoading,
    createExcelFileLoading,
    isEditMode,
    setIsEditMode,
    updatedPartyNum,
    setUpdatedPartyNum,
    updateSelectedParty,
    partyUpdateLoading,
  };
}

export function usePartyLineItemOperations({
  id,
  fetchSelectedPartyLineItems,
  setActivePage,
  createdRollNo,
  enteredLineItemValues,
  setEnteredLineItemValues,
  partyLineItemsData,
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

    enteredLineItemValues.forEach((x) => {
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

    dispatch(createPartyLineItem(data)).then((res) => {
      toast.success(Texts.createPartyLineItemSuccess);
      fetchSelectedPartyLineItems();
      setIsCreateMode(false);
      setEnteredLineItemValues([]);

      partyLineItemsData?.enteredValues?.forEach((x) => {
        setEnteredLineItemValues((oldState) => [
          ...oldState,
          { ...x, value: "" },
        ]);
      });
      setActivePage(1);

      let url = "http://" + process.env.REACT_APP_API_URL + "/" + res.htmlPath;
      openPrintDialog(url);
    });
  };

  const openPrintDialog = (url) => {
    var proxyIframe = document.createElement("iframe");
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(proxyIframe);
    proxyIframe.style.width = "100%";
    proxyIframe.style.height = "100%";
    proxyIframe.style.display = "none";

    var contentWindow = proxyIframe.contentWindow;
    contentWindow.document.open();
    contentWindow.document.write(
      '<iframe src="' +
        url +
        '" onload="print();" width="600" height="600" frameborder="0" marginheight="0" marginwidth="0">'
    );
    contentWindow.document.close();
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
