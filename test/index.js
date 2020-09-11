require("dotenv").config();
const axios = require("axios");
const parkingLot = require("./parking-lot");

const server = axios.create({
  baseURL: "http://localhost:8001/"
});

parkingLot.test(server);
