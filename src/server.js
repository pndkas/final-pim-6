import express from "express";
import authRoute from "./routes/auth.routes.js";
import dataRoute from "./routes/users.routes.js";
import errHandler from "./middlewares/errHdl.js";

const app = express();
const PORT = 9000;

app.use(express.json());

app.use("/auth", authRoute);
app.use("/", dataRoute);

// app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
