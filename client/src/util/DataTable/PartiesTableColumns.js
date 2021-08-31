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
    name: Texts.net_weight_division_num,
    selector: "net_weight_division_num",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {row.net_weight_division_num ? row.net_weight_division_num : "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    name: Texts.gross_weight_addition_num,
    selector: "gross_weight_addition_num",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {row.gross_weight_addition_num
              ? row.gross_weight_addition_num
              : "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    name: Texts.template_img,
    selector: "template_img",
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
            src={row.template_img}
            alt="template_img"
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
