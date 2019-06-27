/**
 * Special case with "cap_add" and "cap_drop" fields
 */
exports.name = "08. Chain driver field";

exports.manifest = {
  name: "custom-chain.dnp.dappnode.eth",
  version: "0.1.0",
  type: "service",
  description: "",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  chain: "ethereum",
  image: {
    path: "custom-chain.dnp.dappnode.eth_0.2.0.tar.xz",
    hash: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
    size: 12000000
  },
  dependencies: {
    "another-chain.dnp.dappnode.eth": "*"
  },
  license: "GPL-3.0"
};

exports.valid = true;
exports.errors = [];

exports.dc = `version: '3.4'
services:
  custom-chain.dnp.dappnode.eth:
    container_name: DAppNodePackage-custom-chain.dnp.dappnode.eth
    image: 'custom-chain.dnp.dappnode.eth:0.1.0'
    networks:
      - dncore_network
    dns: 172.33.1.2
    labels:
      dappnode.dnp.dependencies: '{"another-chain.dnp.dappnode.eth":"*"}'
      dappnode.dnp.chain: ethereum
    logging:
      options:
        max-size: 10m
        max-file: '3'
networks:
  dncore_network:
    external: true
`;
