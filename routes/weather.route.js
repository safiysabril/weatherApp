const { Router } = require("express");
const { searchPage, getForecast } = require("../controllers/weather.controller");
const router = Router();

router.route("/").get(searchPage);

router.route("/forecast").get(getForecast);

module.exports = router;