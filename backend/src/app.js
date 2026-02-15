const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json())

const userRoutes = require("./modules/user/routes/user.routes");
const meetingRoutes = require("./modules/meeting/routes/meeting.routes");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

module.exports = app;
