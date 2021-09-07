import Texts from "../../../constants/Texts";
import { apiWrapper } from "../../../helpers/ApiWrapper";

const endpoints = {
  fetchPartyLineItems: (partyId) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper(
        "parties/" + partyId + "/party_line_items",
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

  deletePartyLineItem: (id) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("party_line_items/" + id, "DELETE");

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  createExcelFile: (id) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(id);
        resolve({
          file: "https://i.hizliresim.com/itfc8ab.png",
        });
      }, 1000);
    }),

  createPartyLineItem: (data) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("party_line_items", "POST", data);

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
