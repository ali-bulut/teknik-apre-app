import React from "react";

import CustomTable from "../../../../components/Common/CustomTable";
import HeaderContent from "../../../../components/Common/HeaderContent";
import Texts from "../../../../constants/Texts";
import { columns } from "../../../../util/DataTable/PartiesTableColumns";

import { useFetchParties } from "../../../../hooks/Admin/Barcode/Party/PartiesPageHooks";

const PartiesPage = () => {
  const { refreshTable, setRefreshTable, onRowClick, fetchData } =
    useFetchParties();

  return (
    <React.Fragment>
      <HeaderContent
        buttonText={Texts.createParty}
        to="/barcode/parties/create"
      />

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
