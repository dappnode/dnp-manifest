/**
 * Deal with empty fields without throwing errors
 */
exports.name = "04. Deal with empty fields without throwing errors";

exports.manifest = {
  name: "EmptyArray",
  version: "0.1.0",
  description: "",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  type: "service",
  image: {
    path: "empty-array.dnp.dappnode.eth_0.1.0.tar.xz",
    hash: "/ipfs/QmcVHo2T6qVCZHGPuVJumcDzHyyrGTRHPe3zJ55jitSt7C",
    size: 0,
    volumes: [""],
    ports: [""],
    command: "--command"
  },
  license: "GPL-3.0"
};

exports.valid = false;
exports.errors = [
  "manifest.image.size should be >= 1",
  "manifest.image.volumes.0 should be a docker volume mapping as HOST:CONTAINER:ro",
  "manifest.image.ports.0 should be an non-empty string"
];

exports.dc = `version: '3.4'
services:
  EmptyArray:
    container_name: DAppNodePackage-EmptyArray
    image: 'EmptyArray:'
    volumes:
      - ''
    ports:
      - ''
    networks:
      - dncore_network
    dns: 172.33.1.2
      command: '--command'
      logging:
        options:
          max-size: 10m
          max-file: '3'
volumes:
  '': {}
networks:
  dncore_network:
    external: true
`;
