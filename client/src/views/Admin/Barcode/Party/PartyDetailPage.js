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
import {
  createExcelFile,
  createPartyLineItem,
  deletePartyLineItem,
  fetchPartyLineItems,
} from "../../../../store/actions/Party/partyLineItems";

const PartyDetailPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [partyMainValues, setPartyMainValues] = useState([]);
  const [divisionNum, setDivisionNum] = useState();
  const [additionNum, setAdditionNum] = useState();
  const [lineItemHeaders, setLineItemHeaders] = useState([]);
  const [lastLineItemNum, setLastLineItemNum] = useState(0);
  const [createdRollNo, setCreatedRollNo] = useState(0);

  const [isCreateMode, setIsCreateMode] = useState(false);
  const [enteredLineItemValues, setEnteredLineItemValues] = useState([]);

  const [lastlyDeletedLineItemId, setLastlyDeletedLineItemId] = useState();

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

          let sortedArr = res.data.sort(function (a, b) {
            return parseFloat(b.lineItemNum) - parseFloat(a.lineItemNum);
          });

          setLastLineItemNum(sortedArr[0].lineItemNum + 1);
          setCreatedRollNo(sortedArr[0].lineItemNum + 1);
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

        data?.enteredValues?.forEach((x) => {
          setEnteredLineItemValues((oldState) => [
            ...oldState,
            { ...x, value: "" },
          ]);
        });
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
        fetchSelectedPartyLineItems();
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

  const deleteSelectedPartyLineItem = (id) => {
    setLastlyDeletedLineItemId(id);
    dispatch(deletePartyLineItem(id))
      .then(() => {
        toast.success(Texts.partyLineItemDeleteSuccess);
        fetchSelectedPartyLineItems();
      })
      .catch((err) => {
        toast.error(Texts.partyLineItemDeleteError);
      });
  };

  const createPartyExcel = () => {
    dispatch(createExcelFile(id))
      .then((data) => {
        var a = document.getElementById("excelDownload");
        a.href = data.file;
        a.target = "_blank";
        a.click();
      })
      .catch((err) => {
        toast.error(Texts.createExcelFileError);
      });
  };

  const createNewLineItem = () => {
    let data = {
      partyId: id,
      rollNo: createdRollNo,
      enteredLineItemValues,
    };

    dispatch(createPartyLineItem(data))
      .then(() => {
        toast.success(Texts.createPartyLineItemSuccess);
        fetchSelectedPartyLineItems();
        setIsCreateMode(false);
        setEnteredLineItemValues([]);

        partyData?.enteredValues?.forEach((x) => {
          setEnteredLineItemValues((oldState) => [
            ...oldState,
            { ...x, value: "" },
          ]);
        });
      })
      .catch((err) => {
        toast.error(Texts.createPartyLineItemError);
      });
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

  const partyLineItemDeleteLoading = useSelector(
    (state) => state.party.lineItemDeleteLoading
  );

  const createExcelFileLoading = useSelector(
    (state) => state.party.createExcelFileLoading
  );

  const partyLineItemCreateLoading = useSelector(
    (state) => state.party.lineItemCreateLoading
  );

  useEffect(() => {
    fetchPartyDetails();
    fetchSelectedPartyLineItems();
  }, []);

  return (
    <React.Fragment>
      <a href="/" style={{ display: "none" }} id="excelDownload" download>
        excelDownload
      </a>

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

          <CustomButton
            variant={"link"}
            className="float-right"
            style={{ color: "#7c4dff" }}
            onClick={createPartyExcel}
            loading={createExcelFileLoading}
          >
            Excel Dosyası Oluştur
          </CustomButton>
        </Col>
      </Row>

      <div style={{ height: 20 }}></div>

      <div>
        {partyLoading && !partyLoaded ? (
          <CustomSpinner />
        ) : (
          <Row style={{ border: "1px dashed grey", padding: 10, margin: 0 }}>
            <Col lg="9">
              <div
                className="card"
                style={{
                  height: "100%",
                }}
              >
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
            </Col>

            <Col lg="3">
              <img
                src={partyData?.template_img}
                className="card-img-top"
                alt="template_img"
                style={{
                  borderBottom: "1px dashed black",
                  maxHeight: "100%",
                }}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col md="12">
            {partyLineItemsLoading && !partyLineItemsLoaded ? (
              <CustomSpinner />
            ) : (
              <div style={{ marginTop: 20 }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>{Texts.rollNo}</th>
                      {lineItemHeaders.map((p, i) => {
                        return <th key={i}>{p.toUpperCase()}</th>;
                      })}
                      <th>
                        {Texts.operations}
                        <CustomButton
                          className="float-right"
                          style={{
                            padding: 0,
                            color: "#7c4dff",
                            fontWeight: "bold",
                            display: isCreateMode && "none",
                          }}
                          variant="link"
                          onClick={() => setIsCreateMode(true)}
                        >
                          Yeni Kayıt
                        </CustomButton>
                        <div className="clearfix"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isCreateMode && (
                      <tr>
                        <td>
                          <Form.Control
                            type="number"
                            value={createdRollNo}
                            onChange={(e) => {
                              setCreatedRollNo(e.target.value);
                            }}
                          />
                        </td>
                        {lineItemHeaders.map((p, i) => {
                          let enteredValue = partyData.enteredValues.find(
                            (x) => x.columnName === p
                          );

                          if (enteredValue) {
                            return (
                              <td key={i}>
                                <Form.Control
                                  placeholder={p.toUpperCase()}
                                  type="number"
                                  value={
                                    enteredLineItemValues.find(
                                      (x) => x.id === enteredValue.id
                                    ).value
                                  }
                                  onChange={(e) => {
                                    let newArr = [...enteredLineItemValues];
                                    newArr.find(
                                      (x) => x.id === enteredValue.id
                                    ).value = e.target.value;
                                    setEnteredLineItemValues([...newArr]);
                                  }}
                                />
                              </td>
                            );
                          } else {
                            return (
                              <td key={i}>
                                <Form.Control
                                  placeholder={p.toUpperCase()}
                                  type="number"
                                  disabled
                                />
                              </td>
                            );
                          }
                        })}

                        <td style={{ textAlign: "center" }}>
                          <CustomButton
                            variant="link"
                            onClick={createNewLineItem}
                            loading={partyLineItemCreateLoading}
                          >
                            Kaydet
                          </CustomButton>
                          <CustomButton
                            variant="link"
                            style={{ color: "red" }}
                            onClick={() => {
                              setIsCreateMode(false);
                              setCreatedRollNo(lastLineItemNum);
                              enteredLineItemValues.forEach((x) => {
                                x.value = "";
                              });
                            }}
                          >
                            İptal
                          </CustomButton>
                        </td>
                      </tr>
                    )}
                    {partyLineItemsData?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.lineItemNum}</td>
                        {item.lineItemValues.map((p, i) => (
                          <td key={i}>{p.value}</td>
                        ))}
                        <td style={{ textAlign: "center" }}>
                          <CustomButton
                            as={Link}
                            variant="link"
                            style={{ color: "#7c4dff" }}
                            to={item.htmlPath}
                            target="_blank"
                          >
                            {Texts.openBarcode}
                          </CustomButton>
                          <CustomButton
                            style={{ color: "red" }}
                            variant="link"
                            onClick={() => deleteSelectedPartyLineItem(item.id)}
                            loading={
                              lastlyDeletedLineItemId === item.id
                                ? partyLineItemDeleteLoading
                                : false
                            }
                          >
                            {Texts.delete}
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
