const validateRequest = (req, res, next) => {
    const { username, password } = req.body;0
    console.log(req.body);
    if (!username || username.trim() === "") {
  
      res.status(400).json({ message: "Invalid username" });
    } else if (
      !password ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      res.status(400).json({ message: "Invalid password" });
    } else {
      next();
    }
  };
  
  export default validateRequest;
  