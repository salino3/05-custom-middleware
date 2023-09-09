import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import url from "url";
import { booksApi } from "./books.api.js";
// npm install cors --save
// npm install @types/cors --save-dev
// npm install cookie-parser --save
// npm install @types/cookie-parser --save-dev


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  methods: "GET",
  origin: "http://localhost:8080",
}));

// TODO: Feed env variable in production
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use("/", express.static(path.resolve(__dirname, "../public")));

app.use(async (req, res, next) => {
  console.log(req.url);
  next();
});

app.use("/api/books", booksApi);

app.use(async (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => {
  console.log("Server ready at port 3000");
});
