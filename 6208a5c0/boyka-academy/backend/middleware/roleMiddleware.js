// Role authorization middleware
module.exports = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.length) return next();
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};
