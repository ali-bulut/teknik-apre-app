import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

import LoginPanel from "../../components/Authentication/LoginPanel";
import Texts from "../../constants/Texts";

const LoginSchema = yup.object().shape({
  email: yup.string().required(Texts.requiredField),
  password: yup
    .string()
    .min(8, Texts.atLeastEightCharacters)
    .required(Texts.requiredField),
});

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const userAuthenticationLoading = false;

  const onSubmit = (data) => {};

  return (
    <LoginPanel
      userAuthenticationLoading={userAuthenticationLoading}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default Login;
