/**
 * Complete reference
 */
exports.name = "01. Complete manifest reference";

exports.manifest = {
  name: "ipfs.dnp.dappnode.eth",
  version: "0.2.0",
  upstreamVersion: "2.6.0-beta",
  shortDescription: "Distributed file system for storing and accessing data.",
  description:
    "Welcome! IPFS is a distributed system for storing and accessing files, websites, applications, and data. If you’re new to IPFS, check our [introductory page](https://ipfs.io/#why) for an easy overview. \n\nWith this node you can upload and download files from IPFS using it own fancy web console at [http://ipfs.dappnode:5001/webui](http://ipfs.dappnode:5001/webui). Other DAppNode Packages and external applications can use its API at the endpoint `http://ipfs.dappnode:5001/api`. Go to the [IPFS HTTP API full reference](https://docs.ipfs.io/reference/api/http/) to check all the features of the API.",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  type: "service",
  image: {
    hash: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
    size: 25738523,
    path: "ipfs.dnp.dappnode.eth_0.2.0.tar.xz",
    volumes: [
      "/var/run/docker.sock:/var/run/docker.sock",
      "/usr/src/dappnode/config:/usr/src/app/config:ro",
      "ipfsdnpdappnodeeth_data:/data/ipfs"
    ],
    external_vol: ["dncore_ethchaindnpdappnodeeth_data:/app/.ethchain:ro"],
    ports: ["1194:1194/udp", "8090:3000/udp", "4001/tcp"],
    environment: [
      "RACK_ENV=development",
      "SHOW=true",
      "EXTRA_OPTS=",
      "EMPTY_ENV"
    ],
    restart: "always",
    privileged: true,
    cap_add: ["ALL"],
    cap_drop: ["NET_ADMIN", "SYS_ADMIN"],
    devices: ["/dev/ttyUSB0:/dev/ttyUSB0", "/dev/sda:/dev/xvdc:rwm"],
    subnet: "172.33.0.0/16",
    ipv4_address: "172.33.1.4",
    network_mode: "host",
    command: "bundle exec thin -p 3000",
    labels: ["eth.dappnode.dnp.my-dnp.developer=Awesome_Name"]
  },
  chain: "ethereum",
  dependencies: {
    "bitcoin.dnp.dappnode.eth": "^0.1.2",
    "swarm.dnp.dappnode.eth": "latest"
  },
  requirements: {
    minimumDappnodeVersion: "0.2.0"
  },
  backup: [
    {
      name: "keystore",
      path: "/root/.raiden/secret/keystore"
    }
  ],
  changelog:
    "Brief summary of the most relevant changes that the user must known before installing",
  warnings: {
    onInstall:
      "You must set the PASSWORD ENV before installing the DAppNode Package in order for the setup to work correctly.",
    onUpdate:
      "Your VPN connection will be lost when the VPN finalizes updating. Leave 1-2 minutes after executing the update and then reconnect and refresh this site.",
    onReset:
      "You MUST properly close your open channels before resetting this DAppNode Package or you may lose your funds.",
    onRemove:
      "You MUST properly close your open channels before removing this DAppNode Package or you may lose your funds."
  },
  updateAlerts: [
    {
      from: "0.1.x",
      to: "0.1.x",
      message:
        "Major update to OpenVPN: This update breaks compatibility with the last VPN version. Please read the migration guide: https://migration020.dappnode.io"
    }
  ],
  disclaimer: {
    message:
      "This software is experimental, presented “as is” and inherently carries risks."
  },
  style: {
    featuredBackground: "linear-gradient(to right, #323131, #395353)",
    featuredColor: "white",
    featuredAvatarFilter: "invert(1)"
  },
  author:
    "DAppNode Association <admin@dappnode.io> (https://github.com/dappnode)",
  contributors: [
    "Michael First <developerHanlder@project.io> (https://github.com/developerHanlder)",
    "Michael Second <developerHanlder@project.io> (https://github.com/developerHanlder)"
  ],
  categories: ["Developer tools", "Blockchain"],
  keywords: ["DAppNodeCore"],
  links: {
    homepage: "https://github.com/dappnode/DNP_IPFS#readme",
    ui: "http://ipfs.dappnode:5001/webui",
    api: "http://ipfs.dappnode:5001/api/v0",
    gateway: "http://ipfs.dappnode:8080/ipfs"
  },
  repository: {
    type: "git",
    url: "https://github.com/dappnode/DNP_IPFS.git",
    directory: "packages/react-dom"
  },
  bugs: {
    url: "https://github.com/dappnode/DNP_IPFS/issues"
  },
  license: "GPL-3.0"
};

exports.valid = true;
exports.errors = [];

exports.dc = `version: '3.4'
services:
  ipfs.dnp.dappnode.eth:
    container_name: DAppNodePackage-ipfs.dnp.dappnode.eth
    image: 'ipfs.dnp.dappnode.eth:0.2.0'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
      - '/usr/src/dappnode/config:/usr/src/app/config:ro'
      - 'ipfsdnpdappnodeeth_data:/data/ipfs'
      - 'dncore_ethchaindnpdappnodeeth_data:/app/.ethchain:ro'
    ports:
      - '1194:1194/udp'
      - '8090:3000/udp'
      - 4001/tcp
    env_file:
      - ipfs.dnp.dappnode.eth.env
    networks:
      - dncore_network
    dns: 172.33.1.2
    restart: always
    labels:
      eth.dappnode.dnp.my-dnp.developer: Awesome_Name
      dappnode.dnp.dependencies: '{"bitcoin.dnp.dappnode.eth":"^0.1.2","swarm.dnp.dappnode.eth":"latest"}'
      dappnode.dnp.chain: ethereum
    cap_add:
      - ALL
    cap_drop:
      - NET_ADMIN
      - SYS_ADMIN
    devices:
      - '/dev/ttyUSB0:/dev/ttyUSB0'
      - '/dev/sda:/dev/xvdc:rwm'
    network_mode: host
    command: bundle exec thin -p 3000
    logging:
      options:
        max-size: 10m
        max-file: '3'
volumes:
  ipfsdnpdappnodeeth_data: {}
  dncore_ethchaindnpdappnodeeth_data:
    external:
      name: dncore_ethchaindnpdappnodeeth_data
networks:
  dncore_network:
    external: true
`;
