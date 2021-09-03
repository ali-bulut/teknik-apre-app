import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AdminHomePage = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/barcode/parties");
  }, [history]);
  return <div>Admin Homepage</div>;
};

export default AdminHomePage;
