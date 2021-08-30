export const getRedirectedRoute = (role) => {
  let redirectedUrl = "/";

  if (role === "admin") {
    redirectedUrl = "/admin";
  }

  return redirectedUrl;
};
