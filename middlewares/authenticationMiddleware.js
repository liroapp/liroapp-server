import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.user === "user") {
        next();
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { isAuth };
