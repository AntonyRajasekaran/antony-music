import express from 'express';
const app = express();
import morgan from "morgan";
import { urlencoded, json } from "body-parser";
import { connect, Promise } from 'mongoose';
import albumRoutes from './api/routes/albums';
const uri = "mongodb+srv://antony-music:EKyavLAq3pqZ7ObE@cluster0-ih4kd.mongodb.net/test?retryWrites=true&w=majority";

connect(uri);
Promise = global.Promise;

app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use('/albums', albumRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});

export default app;
