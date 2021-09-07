import Texts from "../../../constants/Texts";
import { apiWrapper } from "../../../helpers/ApiWrapper";

const endpoints = {
  updateParty: (data) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper(
        "parties/" + data.partyId,
        "PATCH",
        data
      );

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  deleteParty: (id) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("parties/" + id, "DELETE");

      if (!response) {
        return reject({ message: Texts.somethingWrong });
      } else if (response.error) {
        return reject({ message: response.error });
      } else {
        return resolve(response);
      }
    }),

  createParty: (data) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("parties", "POST", data);

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
