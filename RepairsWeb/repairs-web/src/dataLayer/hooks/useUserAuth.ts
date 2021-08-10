import { useSelector } from "react-redux";
import { userAccessInformaionSelector } from "../../selectors/common-selectors";

export default (roles?: string[]) => {
  const user = useSelector(userAccessInformaionSelector);
  const isAuth = user.isAuth ?? false;
  const userRoles = user?.roles ?? [];

  const hasAccess = roles
    ? roles.some((role) => userRoles.includes(role))
    : isAuth;

  return {
    isAuth,
    userRoles,
    hasAccess,
  };
};
