import Texts from "../../../constants/Texts";
import { apiWrapper } from "../../../helpers/ApiWrapper";

const endpoints = {
  fetchBarcodes: () =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("barcodes", "GET");

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  fetchBarcode: (id) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("barcodes/" + id, "GET");

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  updateBarcode: (data) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("barcodes/" + data.id, "PATCH", data);

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  deleteBarcode: (id) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("barcodes/" + id, "DELETE");

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  createBarcode: (data) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("barcodes", "POST", data);

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  fetchBarcodeParties: (barcodeId) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper(
        "barcodes/" + barcodeId + "/parties",
        "GET"
      );

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),
};

export default endpoints;
