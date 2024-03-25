import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import polyline from "@mapbox/polyline";
import User from "../models/userModel.js";

const userRegister = async (req, res) => {
    try {
      const { username, password } = req.body;
      const isUserExist = await User.findOne({ username: username.trim() });
      if (isUserExist) {
        return res.status(400).json({ message: "username already exist" });
      }
      const hashedPassword = await bcrypt.hash(password.trim(), 12);
      const user = new User({
        username: username.trim(),
        password: hashedPassword,
      });
      await user.save();
      const token = jwt.sign({ user: "user" }, process.env.JWT_SECRET);
      res.status(201).json({
        status: "success",
        message: "User signed up successfully",
        user: user.username,
        userId: user.id,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const userLogin = async (req, res) => {
    try {
      console.log(req.body, "body");
      const { username, password } = req.body;
      const isUserExist = await User.findOne({ username: username.trim() });
      if (isUserExist) {
        console.log(isUserExist);
        const validpassword = await bcrypt.compare(password, isUserExist.password );
        if (validpassword) {
          console.log(validpassword,"vald");
          const token = jwt.sign({ user: "user" }, process.env.JWT_SECRET);
          res.status(200).json({
            status:"success",
            message: "User signed in successfully",
            user: isUserExist.username,
            userId: isUserExist.id,
            token,
          });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      } else {
        res.status(400).json({ message: "User not exist" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const fetchDirection = async (req, res) => {
    try {
      const {
        fromCoordinateslatitude,
        fromCoordinateslongitude,
        toCoordinateslatitude,
        toCoordinateslongitude,
      } = req.body;
      console.log(req.body);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${fromCoordinateslatitude},${fromCoordinateslongitude}&destination=${toCoordinateslatitude},${toCoordinateslongitude}&mode=driving&key=${process.env.GOOGLE_MAP_API_KEY}`
      );
  
      
     
      const data = await response.json();
      // console.log(response);
      const result = {};
      result.distance = data["routes"][0].legs[0].distance;
      result.duration = data["routes"][0].legs[0].duration;
      const polylineSyntax = data["routes"][0].overview_polyline.points;
      const decoded = polyline.decode(polylineSyntax);
      result.polyline = decoded;
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500);
    }
  };

  export { userLogin, userRegister, fetchDirection };