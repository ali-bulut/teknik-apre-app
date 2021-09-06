import Texts from "../../../constants/Texts";
import { apiWrapper } from "../../../helpers/ApiWrapper";

const endpoints = {
  userLogin: (email, password) =>
    new Promise(async function (resolve, reject) {
      const response = await apiWrapper("auth/sign_in", "POST", {
        email,
        password,
      });

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
