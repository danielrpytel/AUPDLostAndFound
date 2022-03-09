// "use strict";

// import { use, request } from "chai";
// import chaiHttp from "chai-http";

// use(chaiHttp);

// describe("GET /items", () => {
//   it("should return a list of items when called", (done) => {
//     chai
//       .request(app)
//       .get("/items")
//       .end((err, res) => {
//         res.should.have.status(200);
//         //expect(res.body).to.deep.equal("{}");
//         done();
//       });
//   });

// request(app)
//   .put("/api/auth")
//   .send({ username: "scott@stackabuse.com", passsword: "abc123" })
//   .end(function (err, res) {
//     expect(err).to.be.null;
//     expect(res).to.have.status(200);
//   });

describe("Class Scheduler", function () {
  context("Tests Valid", function () {
    it("Should be true is classList is less than or equal to classSize", function () {
      //should allow add students to be added when spaces are available for classSize
      let classList = [
        "Susan",
        "Sam",
        "Sally",
        "jack",
        "john",
        "marcus",
        "dan",
        "lash",
        "nate",
      ];
      let maxClassSize = 15;
      let reservedSlots = 2;
      let classSize = maxClassSize - reservedSlots;

      chai.assert.isTrue(
        canAddAStudent(classList, maxClassSize, reservedSlots)
      );
    });
  });

  context("Tests Not Valid", function () {
    it("Should be false if classList is larger than classSize", function () {
      //should not allow add students to be added when spaces are not available for classSize
      let classList = [
        "Susan",
        "Sam",
        "Sally",
        "jack",
        "john",
        "marcus",
        "dan",
        "lash",
        "nate",
      ];
      let maxClassSize = 10;
      let reservedSlots = 2;
      let classSize = maxClassSize - reservedSlots;

      chai.assert.isFalse(
        canAddAStudent(classList, maxClassSize, reservedSlots)
      );
    });

    it("Should be -1 if reservedSlots is greater than maxClassSize", function () {
      //return -1 when reservedSpots is greater than maxClassSize
      let classList = [
        "Susan",
        "Sam",
        "Sally",
        "jack",
        "john",
        "marcus",
        "dan",
        "lash",
        "nate",
      ];
      let maxClassSize = 10;
      let reservedSlots = 11;
      let classSize = maxClassSize - reservedSlots;

      chai.assert(canAddAStudent(classList, maxClassSize, reservedSlots), -1);
    });

    it("Should return error when maxClassSize is negative", function () {
      //return error when maxClassSize is negative
      let classList = [];
      let maxClassSize = -1;
      let reservedSlots = 0;
      let classSize = maxClassSize - reservedSlots;
      let error = "Error: Cannot have negative max class size";

      chai.assert(
        canAddAStudent(classList, maxClassSize, reservedSlots),
        error
      );
    });

    it("Should return error when reservedSpots is negative", function () {
      //return error when maxClassSize is negative
      let classList = [];
      let maxClassSize = 10;
      let reservedSlots = -1;
      let classSize = maxClassSize - reservedSlots;
      let error = "Error: Cannot have negative reserved spots";

      chai.assert(
        canAddAStudent(classList, maxClassSize, reservedSlots),
        error
      );
    });
  });
});
