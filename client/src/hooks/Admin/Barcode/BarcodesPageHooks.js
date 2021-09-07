import { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Texts from "../../../constants/Texts";
import { fetchBarcodes } from "../../../store/actions/Barcode/barcode";

export function useFetchBarcodes() {
  const dispatch = useDispatch();

  const [paginationItems, setPaginationItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState();

  const fetchAllBarcodes = useCallback(() => {
    dispatch(fetchBarcodes())
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
        toast.error(Texts.barcodesFetchError);
      });
  }, [dispatch, perPage]);

  const barcodesLoading = useSelector((state) => state.barcode.fetchAllLoading);

  const barcodesLoaded = useSelector((state) => state.barcode.fetchAllLoaded);

  const barcodesData = useSelector((state) => state.barcode.fetchAllData);

  useEffect(() => {
    fetchAllBarcodes();
  }, [fetchAllBarcodes]);

  useEffect(() => {
    paginationItems.forEach((x) => {
      var element = document.getElementById(x.key + "-page")?.parentElement;
      element?.classList.remove("active");

      if (parseInt(x.key) === parseInt(activePage)) {
        var parent = document.getElementById(x.key + "-page")?.parentElement;
        parent?.classList.add("active");
      }
    });

    if (barcodesData) {
      let mainValues = [...barcodesData];
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
      setPaginatedData([...rangeValues]);
    }
  }, [activePage, paginationItems, barcodesData, perPage]);

  return {
    barcodesLoading,
    barcodesLoaded,
    activePage,
    setActivePage,
    pageCount,
    paginationItems,
    paginatedData,
  };
}
