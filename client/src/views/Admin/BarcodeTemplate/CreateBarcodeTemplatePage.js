import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import HeaderContent from "../../../components/Common/HeaderContent";
import Texts from "../../../constants/Texts";

import "../../../styles/BarcodeTemplate/barcodeTemplate.css";

const CreateBarcodeTemplatePage = () => {
  const [barcodeValues, setBarcodeValues] = useState({
    line_1: [],
    line_2: [],
    line_3: [],
    line_4: [],
    line_5: [],
    line_6: [
      {
        name: "gross kg",
        text: "GROSS KG",
      },
      {
        name: "net kg",
        text: "NET KG",
      },
      {
        name: "gross mt",
        text: "GROSS MT",
      },
      {
        name: "net mt",
        text: "NET MT",
      },
    ],
  });

  const addNewValue = (line) => {
    let values = { ...barcodeValues };

    values[line].push({
      name: "",
      text: "",
    });

    setBarcodeValues({ ...values });
  };

  const removeValue = (line, index = -1) => {
    let values = { ...barcodeValues };

    if (index === -1) values[line].pop();
    else values[line].splice(index, 1);

    setBarcodeValues({ ...values });
  };

  const setRollNo = (line, index) => {
    let values = { ...barcodeValues };

    Object.keys(values).forEach((key) => {
      values[key].forEach((x) => {
        x.isRollNo = false;
      });
    });

    values[line][index].isRollNo = true;

    setBarcodeValues({ ...values });
  };

  console.log(barcodeValues);

  return (
    <React.Fragment>
      <HeaderContent buttonText={Texts.backToBarcodes} to="/barcodes" />

      <div style={{ height: 50 }}></div>

      <div className="barcode_main">
        <div className="barcode_container">
          <div className="informations">
            {Object.keys(barcodeValues).map((key, ind) => {
              if (key !== "line_6") {
                return (
                  <div key={ind} className="barcode_info">
                    {barcodeValues[key].length === 0 && (
                      <div>
                        <div className="barcode_label">
                          <strong></strong>
                        </div>
                        <div className="barcode_desc">
                          <strong></strong>
                        </div>

                        <i
                          style={{
                            fontSize: 16,
                            position: "absolute",
                            left: 336,
                            cursor: "pointer",
                          }}
                          className="material-icons"
                          onClick={() => addNewValue(key)}
                        >
                          add_circle_outline
                        </i>
                      </div>
                    )}
                    {key !== "line_6" &&
                      barcodeValues[key].map((value, i) => (
                        <React.Fragment key={i}>
                          <div>
                            <div className="barcode_label">
                              <input
                                value={value.text}
                                onChange={(e) => {
                                  let values = { ...barcodeValues };

                                  values[key][i].text = e.target.value;
                                  values[key][i].name = e.target.value;

                                  setBarcodeValues({ ...values });
                                }}
                              />
                              <OverlayTrigger
                                placement="right"
                                delay={{ show: 100, hide: 100 }}
                                overlay={
                                  <Tooltip id="tooltip-disabled">
                                    {Texts.clickIfRollNo}
                                  </Tooltip>
                                }
                              >
                                <input
                                  type="checkbox"
                                  style={{
                                    position: "relative",
                                    bottom: 14.5,
                                    left: 128,
                                  }}
                                  checked={value.isRollNo}
                                  onClick={() => setRollNo(key, i)}
                                />
                              </OverlayTrigger>
                            </div>
                            <div
                              className="barcode_desc"
                              style={{
                                borderRight:
                                  barcodeValues[key].length > 1 &&
                                  barcodeValues[key].length !== i + 1 &&
                                  "solid 0.5px black",
                              }}
                            >
                              <strong></strong>
                            </div>
                            <i
                              style={{
                                fontSize: 16,
                                position: "absolute",
                                left: 23,
                                cursor: "pointer",
                              }}
                              className="material-icons"
                              onClick={() => removeValue(key)}
                            >
                              remove_circle_outline
                            </i>
                          </div>
                          {i === 0 && barcodeValues[key].length < 2 && (
                            <i
                              style={{
                                fontSize: 16,
                                position: "absolute",
                                left: 336,
                                cursor: "pointer",
                              }}
                              className="material-icons"
                              onClick={() => addNewValue(key)}
                            >
                              add_circle_outline
                            </i>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                );
              }
            })}

            <div
              className="barcode_info"
              style={{ border: "none", height: 41 }}
            >
              {barcodeValues.line_6.map((x, i) => (
                <React.Fragment key={i}>
                  <div
                    className="labelbottom"
                    style={{
                      width: 303 / barcodeValues.line_6.length,
                      height: 41,
                      textAlign: "center",
                    }}
                  >
                    <input
                      className="labelbottomstrong"
                      style={{ width: "100%" }}
                      value={x.text}
                      onChange={(e) => {
                        let values = { ...barcodeValues };

                        values.line_6[i].text = e.target.value;

                        setBarcodeValues({ ...values });
                      }}
                    />
                    <i
                      style={{
                        fontSize: 16,
                        cursor: "pointer",
                      }}
                      className="material-icons"
                      onClick={() => removeValue("line_6", i)}
                    >
                      remove_circle_outline
                    </i>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{ height: 25 }}></div>

          <div className="qrcode" style={{ height: 34 }}>
            <img src="@barcode_img" alt="QR Kodu" style={{ height: 50 }} />
            <div style={{ height: 15 }}></div>
            <p className="barcode_text">...</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateBarcodeTemplatePage;
