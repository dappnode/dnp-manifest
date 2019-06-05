/**
 * Parse NAME=VALUE pairs
 *
 * @param {array|string} s single or multiline string with NAME=VALUE pairs
 * s = [
 *   "NAME1=VALUE1",
 *   "NAME2=VALUE2"
 * ]
 * s =
 * `NAME1=VALUE1
 * NAME2=VALUE2`
 * s = "NAME=VALUE"
 * @returns {object} keypairs = {
 *   NAME1: "VALUE1"
 *   NAME2: "VALUE2"
 * }
 */
function parseNameEqualValue(s) {
  const rows = Array.isArray(s) ? s : s.split("\n");
  return rows.reduce((obj, row) => {
    const [key, value] = row.split("=");
    return { ...obj, [key]: value || "" };
  }, {});
}

module.exports = parseNameEqualValue;
