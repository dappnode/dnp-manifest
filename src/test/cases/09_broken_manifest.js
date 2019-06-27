/**
 * Special case with "cap_add" and "cap_drop" fields
 */
exports.name = "09. Broken manifest";

exports.manifest = {
  name: "custom-chain.dnp.dappnode.eth",
  version: "0.1.x",
  type: "service",
  description: "",
  avatar: "/ipfs/",
  image: {
    path: "",
    hash: "/ipfs/Qm",
    size: 0
  },
  license: "GPL-3.0"
};

exports.valid = false;
exports.errors = [
  "manifest.version should be a semantic version in the format x.y.z",
  "manifest.avatar should be /ipfs/<hash> or /bzz/<hash>",
  "manifest.image.hash should be /ipfs/<hash> or /bzz/<hash>",
  "manifest.image.size should be >= 1",
  "manifest.image.path should be an non-empty string"
];

exports.dc = null;
