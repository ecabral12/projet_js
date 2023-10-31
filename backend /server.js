const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

//app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application backend." });
});

const clientRoutes = require("./routes/clientsRoutes.js");
const tableRoutes = require("./routes/tablesRoutes.js");
const reservationRoutes = require("./routes/reservationRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

app.use("/api/client", clientRoutes); 
app.use("/api/table",tableRoutes );
app.use("/api/reservation",reservationRoutes);
app.use("/api/login",authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

