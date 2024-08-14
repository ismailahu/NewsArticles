const express = require("express");
const mongoose = require("mongoose");
const ErrorHandler = require("./Middlewares/ErrorHandling/ErrorHandler");

require("dotenv").config();

const NewsRouter = require("./Routes/NewsRouter");
const UserRouter = require("./Routes/UserRouter");
const cors = require('cors');
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://ismail:Jackgrealish123@newsarticles.zz4vw.mongodb.net/?retryWrites=true&w=majority&appName=NewsArticles')
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        "Connected to db and Listening for request on port",
        process.env.PORT || 5000
      );
    });
  })
  .catch((error) => {
    console.log(error);
    (error);
  });

  const corsOptions = {
    credentials: true,
    origin: true // Allows all domains
};

const _dirname = path.dirname("");



if(process.env.NODE_ENV == 'production'){
  app.use(express.static('../frontend/my-app/build'));
}


app.use(cors(corsOptions));

app.use('/api/news/', NewsRouter);
app.use('/api/auth/', UserRouter);

app.use(ErrorHandler);

app.get("/*", function(req,res) {
  res.sendFile(
    path.join(__dirname, "../frontend/my-app/public/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  );
});
