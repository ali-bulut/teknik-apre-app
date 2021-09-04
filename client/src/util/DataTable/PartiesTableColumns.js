import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Texts from "../../constants/Texts";

export const columns = [
  {
    name: Texts.name,
    selector: "name",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>{row.name}</p>
        </div>
      </div>
    ),
  },
  {
    name: Texts.netWeightDivisionNum,
    selector: "netWeightDivisionNum",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {row.netWeightDivisionNum ? row.netWeightDivisionNum : "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    name: Texts.grossWeightAdditionNum,
    selector: "grossWeightAdditionNum",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {row.grossWeightAdditionNum ? row.grossWeightAdditionNum : "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    name: Texts.templateImage,
    selector: "templateImage",
    sortable: true,
    cell: (row) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px dashed black",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <div>
          <img
            style={{ width: 200, height: 100 }}
            src={row.templateImage}
            alt="templateImage"
          />
        </div>
      </div>
    ),
  },
  {
    name: Texts.details,
    selector: "detail",
    sortable: false,
    cell: (row) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Button
            as={Link}
            to={"/barcode/parties/" + row.id}
            style={{ color: "#7c4dff" }}
            variant={null}
          >
            {Texts.viewDetails}
          </Button>
        </div>
      </div>
    ),
  },
];
