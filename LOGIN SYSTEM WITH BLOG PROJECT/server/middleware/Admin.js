const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(400)
      .json({ message: "you have not permission to get notes" });
  }
  next();
};

module.exports = isAdmin;
