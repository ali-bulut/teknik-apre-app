import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CustomButton from "../../../../components/Common/CustomButton";
import CustomSpinner from "../../../../components/Common/CustomSpinner";
import Texts from "../../../../constants/Texts";
import {
  deleteParty,
  fetchParty,
  updateParty,
} from "../../../../store/actions/Party/party";
import { fetchPartyLineItems } from "../../../../store/actions/Party/partyLineItems";

const PartyDetailPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [partyMainValues, setPartyMainValues] = useState([]);
  const [divisionNum, setDivisionNum] = useState();
  const [additionNum, setAdditionNum] = useState();
  const [lineItemHeaders, setLineItemHeaders] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const fetchSelectedPartyLineItems = () => {
    dispatch(fetchPartyLineItems(id))
      .then((res) => {
        let newArr = [];
        if (res.data.length > 0) {
          res.data[0].lineItemValues.forEach((p) => {
            newArr.push(p.columnName);
          });
        }
        setLineItemHeaders(newArr);
      })
      .catch((err) => {
        toast.error(Texts.partyLineItemsError);
      });
  };

  const fetchPartyDetails = () => {
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
      })
      .catch((err) => {
        toast.error(Texts.partyDetailsError);
      });
  };

  const updateSelectedParty = () => {
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

  const partyLoading = useSelector((state) => state.party.fetchLoading);
  const partyLoaded = useSelector((state) => state.party.fetchLoaded);
  const partyData = useSelector((state) => state.party.fetchData);

  const partyUpdateLoading = useSelector((state) => state.party.updateLoading);
  const partyDeleteLoading = useSelector((state) => state.party.deleteLoading);

  const partyLineItemsLoading = useSelector(
    (state) => state.party.lineItemsLoading
  );
  const partyLineItemsLoaded = useSelector(
    (state) => state.party.lineItemsLoaded
  );
  const partyLineItemsData = useSelector((state) => state.party.lineItemsData);

  console.log(partyLineItemsData);

  useEffect(() => {
    fetchPartyDetails();
    fetchSelectedPartyLineItems();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col md="12">
          <Button
            variant={"link"}
            className="float-left"
            as={Link}
            to="/barcode/parties"
          >
            {Texts.backToParties}
          </Button>
        </Col>
      </Row>

      <div style={{ height: 20 }}></div>

      <div>
        <Row>
          <Col md="12" lg="6">
            {partyLoading && !partyLoaded ? (
              <CustomSpinner />
            ) : (
              <div className="card">
                <img
                  src={partyData?.template_img}
                  className="card-img-top"
                  alt="template_img"
                  style={{ borderBottom: "1px dashed black" }}
                />
                <div className="card-body">
                  <div>
                    <h4 style={{ display: "inline" }} className="card-title">
                      {partyData?.name}
                    </h4>
                    <CustomButton
                      style={{ position: "relative", bottom: 6 }}
                      className="float-right"
                      variant="link"
                      loading={partyUpdateLoading}
                      onClick={() => {
                        if (!isEditMode) {
                          setIsEditMode(true);
                        } else {
                          updateSelectedParty();
                        }
                      }}
                    >
                      {isEditMode ? Texts.save : Texts.update}
                    </CustomButton>

                    <Button
                      style={{
                        position: "relative",
                        bottom: 6,
                        color: "violet",
                        display: !isEditMode && "none",
                      }}
                      className="float-right"
                      variant="link"
                      onClick={() => {
                        let mainValues = [...partyData.mainValues];
                        let copyMainValues = [];
                        mainValues.forEach((p) => {
                          copyMainValues.push({
                            columnName: p.columnName,
                            value: p.value,
                          });
                        });
                        setPartyMainValues([...copyMainValues]);
                        setAdditionNum(partyData.gross_weight_addition_num);
                        setDivisionNum(partyData.net_weight_division_num);

                        setIsEditMode(false);
                      }}
                    >
                      {Texts.cancel}
                    </Button>
                  </div>

                  <div className="clearfix"></div>

                  <Row>
                    {partyMainValues?.map((p, i) => {
                      return (
                        <Col key={i} md="6" style={{ marginBottom: 5 }}>
                          <b>{p.columnName.toUpperCase()}:</b>

                          {!isEditMode ? (
                            <span>{p.value}</span>
                          ) : (
                            <Form.Control
                              type="text"
                              value={p.value}
                              onChange={(e) => {
                                const copyMainValues = [...partyMainValues];
                                copyMainValues[i].value = e.target.value;
                                setPartyMainValues(copyMainValues);
                              }}
                            />
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Metre{" "}
                    {isEditMode ? (
                      <input
                        value={divisionNum}
                        onChange={(e) => setDivisionNum(e.target.value)}
                        type="number"
                      />
                    ) : (
                      <b>{partyData?.net_weight_division_num}</b>
                    )}
                    {"'e "} Bölünecek. Net Kiloya{" "}
                    {isEditMode ? (
                      <input
                        value={additionNum}
                        onChange={(e) => setAdditionNum(e.target.value)}
                        type="number"
                      />
                    ) : (
                      <b>{partyData?.gross_weight_addition_num}</b>
                    )}{" "}
                    Eklenecek.
                  </small>

                  <CustomButton
                    style={{ padding: 0, color: "red" }}
                    className="float-right"
                    variant="link"
                    loading={partyDeleteLoading}
                    onClick={() => {
                      deleteSelectedParty();
                    }}
                  >
                    {Texts.deleteParty}
                  </CustomButton>
                </div>
              </div>
            )}
          </Col>

          <Col md="12" lg="6">
            {partyLineItemsLoading && !partyLineItemsLoaded ? (
              <CustomSpinner />
            ) : (
              <div style={{ height: 670, overflowY: "scroll" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>{Texts.rollNo}</th>
                      {lineItemHeaders.map((p) => {
                        return <th>{p.toUpperCase()}</th>;
                      })}
                      <th>{Texts.operations}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partyLineItemsData?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.lineItemNum}</td>
                        {item.lineItemValues.map((p, i) => (
                          <td key={i}>{p.value}</td>
                        ))}
                        <td>
                          <CustomButton style={{ color: "red" }} variant="link">
                            {Texts.delete}
                          </CustomButton>

                          <CustomButton
                            as={Link}
                            variant="link"
                            style={{ color: "#7c4dff" }}
                            to={item.htmlPath}
                            target="_blank"
                          >
                            {Texts.openBarcode}
                          </CustomButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <div style={{ height: 20 }}></div>
    </React.Fragment>
  );
};

export default PartyDetailPage;
