import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Texts from "../../../../constants/Texts";
import { fetchParties } from "../../../../store/actions/Party/party";

export function useFetchParties() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [refreshTable, setRefreshTable] = useState(false);

  const onRowClick = (data) => {
    history.push("/barcode/parties/" + data.id);
  };

  const fetchData = async (data) => {
    try {
      const responseData = await dispatch(fetchParties(data));
      return responseData;
    } catch (err) {
      toast.error(Texts.partiesFetchError);
    }
    return null;
  };

  return {
    refreshTable,
    setRefreshTable,
    onRowClick,
    fetchData,
  };
}
