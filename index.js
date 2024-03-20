import express from "express";
import dotenv from "dotenv";
import dbConnction from "./config/dbConfig.js";
import router from "./routes/userRoute.js";

const app = express();

app.use(express.json());

dotenv.config();
dbConnction();

app.use(router);

app.listen(process.env.PORT, () => { 
  console.log(`Server started on port: ${process.env.PORT}`);
});
