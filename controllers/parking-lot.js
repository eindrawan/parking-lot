const Joi = require("joi");
const { validate } = require("../utils/validation");
const ParkingLot = require("../models/parking-lot");
const { param } = require("../routes/parking-lot");

const PARKING_SLOTS = parseInt(process.env.PARKING_SLOTS);
var parkingLot = new ParkingLot(PARKING_SLOTS);
module.exports = {
  park: (req, res) => {
    try {
      // validate parameters:
      // carNumber: string, required
      let params = validate(req.body, {
        carNumber: Joi.string().required()
      });

      let slotId = parkingLot.park(params.carNumber);
      res.send({ success: true, slot: slotId });
    } catch (ex) {
      res.send({ success: false, error: ex.message });
    }
  },
  unpark: (req, res) => {
    try {
      // validate parameters:
      // slot: integer, positive, required
      let params = validate(req.body, {
        slot: Joi.number()
          .integer()
          .positive()
          .min(1)
          .max(PARKING_SLOTS)
          .required()
      });

      parkingLot.unpark(params.slot);
      res.send({ success: true });
    } catch (ex) {
      res.send({ success: false, error: ex.message });
    }
  },
  info: (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        // is NOT a number, which means its a car number
        res.send({
          success: true,
          ...parkingLot.infoCarNumber(req.params.id)
        });
      } else {
        let params = validate(req.params, {
          id: Joi.number()
            .integer()
            .positive()
            .min(1)
            .max(PARKING_SLOTS)
            .required()
        });
        // is a number, which means its a slot id
        res.send({
          success: true,
          ...parkingLot.infoSlot(req.params.id)
        });
      }
    } catch (ex) {
      res.send({ success: false, error: ex.message });
    }
  }
};
