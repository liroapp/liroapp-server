import express from "express";
import dotenv from "dotenv";
import dbConnction from "./config/dbConfig.js";
import router from "./routes/userRoute.js"
import https from 'https';
import cron from 'node-cron';
const app = express();

app.use(express.json());

dotenv.config();
dbConnction();

app.use(router);

app.listen(process.env.PORT, () => { 
  console.log(`Server started on port: ${process.env.PORT}`);
});



app.get('/',(req,res)=>{
    res.send('Welcome to Liro App');
  });

cron.schedule('*/10 * * * *', () => {
    console.log('Pinging server to keep it alive...');
    
    const options = {
      hostname: 'liroapp-server-node-js-mongob-jwt.onrender.com',
      method: 'GET',
      timeout: 60000 // Timeout set to 60 seconds
    };
  
    const req = https.request(options, (res) => {
      console.log(`Ping response: ${res.statusCode}`);
    });
  
    req.on('timeout', () => {
      req.abort();
      console.error('Request timed out');
    });
  
    req.on('error', (err) => {
      console.error('Ping error:', err.message);
    });
  
    req.end();
  });