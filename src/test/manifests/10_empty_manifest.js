/**
 * Special case with "cap_add" and "cap_drop" fields
 */
exports.name = "10. Empty manifest";

exports.manifest = {};

exports.valid = false;
exports.errors = [
  "manifest should have required property 'name'",
  "manifest should have required property 'version'",
  "manifest should have required property 'description'",
  "manifest should have required property 'avatar'",
  "manifest should have required property 'type'",
  "manifest should have required property 'image'",
  "manifest should have required property 'license'"
];

exports.dc = null;
