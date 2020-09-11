var assert = require("assert");
var expect = require("chai").expect;

// add 2 slots just for testing purpose
const PARKING_SLOTS = 2;
const parkingLotTest = {
  park: server => {
    describe("/park", async function() {
      it("Should handle wrong parameter", async () => {
        let ret = await server.post("/parking-lot/park", { carNumber: 1 });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.false;
        expect(ret.data.error).to.be.exist;
      });
      it("Should handle correct parameter", async () => {
        let ret = await server.post("/parking-lot/park", {
          carNumber: "H001"
        });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
        expect(ret.data.slot).to.eq(1);
      });
      it("Should handle car that already parked", async () => {
        let ret = await server.post("/parking-lot/park", {
          carNumber: "H001"
        });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.false;
        expect(ret.data.error).to.exist;
      });
      it("Should handle full parking lot", async () => {
        await server.post("/parking-lot/park", {
          carNumber: "H002"
        });
        let ret = await server.post("/parking-lot/park", {
          carNumber: "H003"
        });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.false;
        expect(ret.data.error).to.exist;
      });
    });
  },
  unpark: server => {
    describe("/unpark", async function() {
      it("Should handle wrong parameter", async () => {
        let ret = await server.post("/parking-lot/unpark", { slot: 0 });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.false;
        expect(ret.data.error).to.be.exist;
      });
      it("Should handle correct parameter", async () => {
        let ret = await server.post("/parking-lot/unpark", { slot: 1 });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
      });
      it("Should handle unpark on empty slot", async () => {
        let ret = await server.post("/parking-lot/unpark", { slot: 1 });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.false;
      });
      it("Should fill the slot that already empty", async () => {
        let ret = await server.post("/parking-lot/park", { carNumber: "H003" });
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
        expect(ret.data.slot).to.eq(1);
      });
    });
  },
  info: server => {
    describe("/info", async function() {
      it("Should handle get info by car number", async () => {
        let ret = await server.get("/parking-lot/info/H002");
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
        expect(ret.data.slot).to.eq(2);
      });
      it("Should handle get info by slot number", async () => {
        let ret = await server.get("/parking-lot/info/1");
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
        expect(ret.data.carNumber).to.eq("H003");
      });
      it("Should handle empty slot info", async () => {
        await server.post("/parking-lot/unpark", { slot: 1 });
        let ret = await server.get("/parking-lot/info/1");
        expect(ret).to.be.exist;
        expect(ret.data).to.be.exist;
        expect(ret.data.success).to.be.true;
        expect(ret.data.carNumber).to.eq(null);
      });
    });
  }
};

module.exports = {
  test: server => {
    describe("Parking Lot", function() {
      parkingLotTest.park(server);
      parkingLotTest.unpark(server);
      parkingLotTest.info(server);
    });
  }
};
