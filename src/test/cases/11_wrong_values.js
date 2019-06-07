/**
 * Special case with "cap_add" and "cap_drop" fields
 */
exports.name = "11. Wrong values for properties with enums";

exports.manifest = {
  name: "wrong-values.dnp.dappnode.eth",
  version: "0.1.0",
  type: "none",
  description: "",
  chain: "none",
  avatar: "/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o",
  image: {
    path: "wrong-values.dnp.dappnode.eth:0.1.0",
    hash: "/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o",
    size: 12000000,
    restart: "none"
  },
  license: "GPL-3.0"
};

exports.valid = false;
exports.errors = [
  "manifest.type should be equal to one of the allowed values",
  "manifest.chain should be equal to one of the allowed values",
  "manifest.image.restart should be equal to one of the allowed values"
];

exports.dc = null;
