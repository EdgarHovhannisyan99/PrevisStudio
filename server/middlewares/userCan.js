import HttpErrors from "http-errors";
export const roles = (role) => {
  return (req, res, next) => {
    if (!req.role.includes(role)) {
      throw HttpErrors(403, "Permission denied");
    }
    next();
  };
};
