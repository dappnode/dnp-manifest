/**
 * Deal with arrays and ignore them at the compose
 */
exports.name = "12. Deal with arrays and ignore them at the compose";

exports.manifest = {
  name: "EmptyArrayValues",
  version: "0.1.0",
  description: "",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  type: "service",
  image: {
    path: "empty-array.dnp.dappnode.eth_0.1.0.tar.xz",
    hash: "/ipfs/QmcVHo2T6qVCZHGPuVJumcDzHyyrGTRHPe3zJ55jitSt7C",
    size: 12000000,
    volumes: [],
    ports: [],
    environment: [],
    command: "--command"
  },
  dependencies: {},
  license: "GPL-3.0"
};

exports.valid = true;
exports.errors = [];

exports.dc = `version: '3.4'
services:
  EmptyArrayValues:
    container_name: DAppNodePackage-EmptyArrayValues
    image: 'EmptyArrayValues:0.1.0'
    networks:
      - dncore_network
    dns: 172.33.1.2
    command: '--command'
    logging:
      options:
        max-size: 10m
        max-file: '3'
networks:
  dncore_network:
    external: true
`;
