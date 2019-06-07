const expect = require("chai").expect;
const validateManifest = require("../validateManifest");
const fs = require("fs");
const path = require("path");

describe("validateManifest", () => {
  /**
   * Loads all files in the ./cases folder
   * Each file describes a case with a source manifest and a destination compose
   */
  const casesFolder = path.resolve(__dirname, "cases");
  fs.readdirSync(casesFolder)
    .map(casePath => require(path.resolve(casesFolder, casePath)))
    .forEach(({ name, manifest, valid, errors }) => {
      it(`Case: ${name}`, () => {
        const res = validateManifest(manifest);
        expect(res.valid).to.equal(valid, "Wrong valid state");
        expect(res.errors).to.deep.equal(errors, "Wrong list of errors");
      });
    });
});
