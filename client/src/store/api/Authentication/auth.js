const endpoints = {
  userLogin: (email, password) =>
    new Promise(async function (resolve, reject) {
      console.log({ email, password });
      setTimeout(() => {
        resolve({
          username: "teknikapre_admin",
          role: "admin",
          token: "test-admin-token",
        });
      }, 2000);
    }),
};

export default endpoints;
