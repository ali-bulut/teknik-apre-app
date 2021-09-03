import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { toast } from "react-toastify";
import * as yup from "yup";

import Texts from "../../constants/Texts";
import { userLogin } from "../../store/actions/Authentication/auth";

const LoginSchema = yup.object().shape({
  email: yup.string().required(Texts.requiredField),
  password: yup
    .string()
    .min(8, Texts.atLeastEightCharacters)
    .required(Texts.requiredField),
});

export function useLogin() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const userAuthenticationLoading = useSelector(
    (state) => state.auth.userAuthenticationLoading
  );

  const onSubmit = (data) => {
    dispatch(userLogin(data.email, data.password))
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return {
    register,
    handleSubmit,
    errors,
    userAuthenticationLoading,
    onSubmit,
  };
}
