import { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Texts from "../../../../constants/Texts";
import { fetchParties } from "../../../../store/actions/Party/party";

export function useFetchParties() {
  const dispatch = useDispatch();

  const [paginationItems, setPaginationItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState();

  const fetchAllParties = useCallback(() => {
    dispatch(fetchParties())
      .then((data) => {
        console.log(data.length);
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
        toast.error(Texts.partiesFetchError);
      });
  }, [dispatch, perPage]);

  const barcodeTemplatesLoading = useSelector(
    (state) => state.party.fetchAllLoading
  );

  const barcodeTemplatesLoaded = useSelector(
    (state) => state.party.fetchAllLoaded
  );

  const barcodeTemplatesData = useSelector((state) => state.party.fetchAllData);

  useEffect(() => {
    fetchAllParties();
  }, [fetchAllParties]);

  useEffect(() => {
    paginationItems.forEach((x) => {
      var element = document.getElementById(x.key + "-page")?.parentElement;
      element?.classList.remove("active");

      if (parseInt(x.key) === parseInt(activePage)) {
        var parent = document.getElementById(x.key + "-page")?.parentElement;
        parent?.classList.add("active");
      }
    });

    if (barcodeTemplatesData) {
      let mainValues = [...barcodeTemplatesData];
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
  }, [activePage, paginationItems, barcodeTemplatesData, perPage]);

  return {
    barcodeTemplatesLoading,
    barcodeTemplatesLoaded,
    activePage,
    setActivePage,
    pageCount,
    paginationItems,
    paginatedData,
  };
}
