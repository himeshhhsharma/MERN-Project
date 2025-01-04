import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//configuring cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//we have to make configuration for accepting json data from front end part, post data in json
app.use(
  express.json({
    limit: "16kb",
  })
);

//we have to make configuration for accepting data coming from url, from the front end part
app.use(urlencoded({ extended: true, limit: "16kb" }));

//this is not mandatory, just for staoring some images/favicons on server, we make public folder,in this project, this is for that
app.use(express.static("public"));

// for configuration of cookie parser=> to access and maniplate cookies on user's system from server
app.use(cookieParser());

export { app };
