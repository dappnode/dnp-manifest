const expect = require("chai").expect;
const manifestToCompose = require("../manifestToCompose");
const fs = require("fs");
const path = require("path");

describe("manifestToCompose", () => {
  /**
   * Loads all files in the ./manifestToCompose folder
   * Each file describes a case with a source manifest and a destination compose
   */
  const casesFolder = path.resolve(__dirname, "manifests");
  fs.readdirSync(casesFolder)
    .map(casePath => require(path.resolve(casesFolder, casePath)))
    .filter(({ valid, dc }) => valid && dc)
    .forEach(({ name, manifest, dc }) => {
      it(`Case: ${name}`, () => {
        const computedDc = manifestToCompose(manifest);
        expect(computedDc).to.equal(dc, "Invalid docker-compose");
      });
    });
});
