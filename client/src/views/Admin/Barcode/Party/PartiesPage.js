import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CustomTable from "../../../../components/Common/CustomTable";
import Texts from "../../../../constants/Texts";
import { fetchParties } from "../../../../store/actions/Party/party";
import { columns } from "../../../../util/DataTable/PartiesTableColumns";

const PartiesPage = () => {
  const dispatch = useDispatch();
  const [refreshTable, setRefreshTable] = useState(false);

  const onRowClick = (data) => {};

  const fetchData = async (data) => {
    try {
      const responseData = await dispatch(fetchParties(data));
      return responseData;
    } catch (err) {
      toast.error(Texts.partiesFetchError);
    }
    return null;
  };

  return (
    <React.Fragment>
      <CustomTable
        onRowClick={onRowClick}
        columns={columns}
        title={Texts.parties}
        fetchData={fetchData}
        defaultSortColumns={[]}
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
    </React.Fragment>
  );
};

export default PartiesPage;
