import RolesPrefix from "../constants/RolesPrefix";

const ADMIN_PREFIX = RolesPrefix.admin;

export const getRedirectedRoute = (role) => {
  let redirectedUrl = "/";

  if (role === ADMIN_PREFIX) {
    redirectedUrl = "/";
  }

  return redirectedUrl;
};

export const subdomainRedirection = (allowedSubdomains) => {
  let adminSub = getSubDomain() === ADMIN_PREFIX;
  // if url does not have admin subdomain and still client tries to access routes that belong to admin subdomain.
  if (!adminSub && allowedSubdomains?.includes(ADMIN_PREFIX)) {
    return true;
  }

  // if url does have admin subdomain but client tries to access routes that don't belong to admin subdomain.
  else if (adminSub && !allowedSubdomains?.includes(ADMIN_PREFIX)) {
    return true;
  }

  return false;
};

export const getSubDomain = () => {
  return window.location.host.split(".")[0];
};
