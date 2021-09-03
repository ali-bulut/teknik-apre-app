import React from "react";

import LoginPanel from "../../components/Authentication/LoginPanel";
import { useLogin } from "../../hooks/Authentication/LoginHooks";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    userAuthenticationLoading,
    onSubmit,
  } = useLogin();

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
