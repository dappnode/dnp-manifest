/**
 * Special case with "cap_add" and "cap_drop" fields
 */
exports.name = '07. Special case with "cap_add" and "cap_drop" fields';

exports.manifest = {
  name: "Mysterium",
  version: "0.1.0",
  description: "",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  type: "service",
  image: {
    path: "mysterium.dnp.dappnode.eth_0.2.0.tar.xz",
    hash: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
    size: 12000000,
    cap_add: ["SYS_ADMIN"],
    cap_drop: ["NET_ADMIN"],
    network_mode: "host",
    command: "--command"
  },
  license: "GPL-3.0"
};

exports.valid = true;
exports.errors = [];

exports.dc = `version: '3.4'
services:
  Mysterium:
    container_name: DAppNodePackage-Mysterium
    image: 'Mysterium:0.1.0'
    networks:
      - dncore_network
    dns: 172.33.1.2
    cap_add:
      - SYS_ADMIN
    cap_drop:
      - NET_ADMIN
    network_mode: host
    command: '--command'
    logging:
      options:
        max-size: 10m
        max-file: 3
networks:
  dncore_network:
    external: true
`;
