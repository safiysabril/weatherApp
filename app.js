const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Import route
const weatherRoutes = require("./routes/weather.route");

// Use route
app.use("/", weatherRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});