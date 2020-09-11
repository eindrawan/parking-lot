class ParkingLot {
  constructor(total) {
    this.slots = [];
    for (let i = 0; i < total; i++) {
      this.slots.push(null);
    }
    this.cars = {};
  }

  park(carNumber) {
    if (Object.keys(this.cars).length == this.slots.length)
      throw new Error("Parking Lot is full");
    if (this.cars[carNumber] !== undefined)
      throw new Error("A car with that number is already parked.");

    let i = 0;
    while (this.slots[i]) i++;
    this.slots[i] = carNumber;
    this.cars[carNumber] = i;

    return i + 1;
  }

  unpark(slotId) {
    if (!this.slots[slotId - 1]) throw new Error("No car parked on that slot.");

    delete this.cars[this.slots[slotId - 1]];
    this.slots[slotId - 1] = null;
  }

  infoSlot(slotId) {
    // return null if slot is empty
    return {
      carNumber: this.slots[slotId - 1] || null,
      slot: slotId
    };
  }

  infoCarNumber(carNumber) {
    // return null if no car parked with that number
    return {
      carNumber: carNumber,
      slot: this.cars[carNumber] ? this.cars[carNumber] + 1 : null
    };
  }
}

module.exports = ParkingLot;
