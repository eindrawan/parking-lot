const parkingLot = require("./parking-lot");

// prettier-ignore
module.exports = (app) => {
  app.use("/parking-lot", parkingLot)
}
