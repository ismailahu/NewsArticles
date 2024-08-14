const express = require("express");
const mongoose = require("mongoose");
const ErrorHandler = require("./Middlewares/ErrorHandling/ErrorHandler");

require("dotenv").config();

const NewsRouter = require("./Routes/NewsRouter");
const UserRouter = require("./Routes/UserRouter");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      (
        "Connected to db and Listening for request on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    (error);
  });

  const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));

app.use('/api/news/', NewsRouter);
app.use('/api/auth/', UserRouter);

app.use(ErrorHandler);