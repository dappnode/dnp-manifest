# DNP Manifest

dnp-manifest is a tool define the DNP manifest format by providing its JSON schema and a manifest to docker-compose.yml conversion function.

## Request additional features

To request additional features in the DNP manifest, please [open an issue](https://github.com/dappnode/dnp-manifest/issues)

## Reference manifest

```json
{
  "name": "ipfs.dnp.dappnode.eth",
  "version": "0.2.0",
  "description": "Dappnode package responsible for providing IPFS connectivity (go-ipfs v0.4.20)",
  "avatar": "/ipfs/QmViXy8BVb8dQ7J9jLK626kcB5Tz2pvvKE43KHo8RNDXxL",
  "type": "service",
  "chain": "ethereum",
  "image": {
    "path": "ipfs.dnp.dappnode.eth_0.2.0.tar.xz",
    "hash": "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
    "size": 25738523,
    "volumes": [
      "/var/run/docker.sock:/var/run/docker.sock",
      "/usr/src/dappnode/config:/usr/src/app/config:ro",
      "ipfsdnpdappnodeeth_data:/data/ipfs"
    ],
    "external_vol": [
      "dncore_ethchaindnpdappnodeeth_data:/app/.ethchain:ro",
      "nginxproxydnpdappnodeeth_vhost.d:/etc/nginx/vhost.d",
      "nginxproxydnpdappnodeeth_html:/usr/share/nginx/html"
    ],
    "ports": ["1194:1194/udp", "8090:3000/udp", "4001/udp", "4001/tcp"],
    "environment": [
      "RACK_ENV=development",
      "SHOW=true",
      "EXTRA_OPTS=",
      "EMPTY_ENV"
    ],
    "labels": ["eth.dappnode.dnp.my-dnp.developer=Awesome_Name"],
    "privileged": true,
    "restart": "always",
    "subnet": "172.33.0.0/16",
    "ipv4_address": "172.33.1.4",
    "cap_add": ["ALL"],
    "cap_drop": ["NET_ADMIN", "SYS_ADMIN"],
    "network_mode": "host",
    "command": "bundle exec thin -p 3000"
  },
  "dependencies": {
    "bitcoin.dnp.dappnode.eth": "^0.1.2",
    "swarm.dnp.dappnode.eth": "latest",
    "dont-use-on-produccion.dappnode.eth": "/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o"
  },
  "changelog": "Brief summary of the most relevant changes that the user must known before installing",
  "warnings": {
    "onInstall": "You must set the PASSWORD ENV before installing the DNP in order for the setup to work correctly.",
    "onUpdate": "Your VPN connection will be lost when the VPN finalizes updating. Leave 1-2 minutes after executing the update and then reconnect and refresh this site.",
    "onReset": "You MUST properly close your open channels before reseting this DNP or you may lose your funds.",
    "onRemove": "You MUST properly close your open channels before stopping this DNP or you may lose your funds."
  },
  "updateAlerts": [
    {
      "from": "0.1.x",
      "to": "^0.2.0",
      "message": "Major update to OpenVPN: This update breaks compatibility with the last VPN version. Please read the migration guide at: https://migration020.dappnode.io"
    }
  ],
  "author": "DAppNode Association <admin@dappnode.io> (https://github.com/dappnode)",
  "contributors": [
    "Michael First <developerHanlder@project.io> (https://github.com/developerHanlder)",
    "Michael Second <developerHanlder@project.io> (https://github.com/developerHanlder)"
  ],
  "keywords": ["DAppNodeCore", "IPFS", "File sharing"],
  "links": {
    "homepage": "https://github.com/dappnode/DNP_IPFS#readme",
    "ui": "http://ipfs.dappnode:5001/webui",
    "api": "http://ipfs.dappnode:5001/api/v0",
    "gateway": "http://ipfs.dappnode:8080/ipfs"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/dappnode/DNP_IPFS.git"
  },
  "bugs": {
    "url": "https://github.com/dappnode/DNP_IPFS/issues"
  },
  "disclaimer": {
    "message": "This software is experimental, presented “as is” and inherently carries risks."
  },
  "license": "GPL-3.0"
}
```

## Install

```
$ npm install -g @dappnode/dnp-manifest
```

## Usage

```js
const { validateManifest } = require("@dappnode/dnp-manifest");

const manifest = {
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

const { valid, errors } = validateManifest(manifest);
// valid = false,
// errors = [
//   "manifest.version should be a semantic version in the format x.y.z"
//   "manifest.avatar should be /ipfs/<hash> or /bzz/<hash>",
//   "manifest.image.path should be an non-empty string",
//   "manifest.image.hash should be /ipfs/<hash> or /bzz/<hash>",
//   "manifest.image.size should be >= 1"
// ];
```

```js
const { manifestToCompose } = require("@dappnode/dnp-manifest");

const manifest = {
  name: "letsencrypt-nginx.dnp.dappnode.eth",
  version: "0.0.1",
  description: "letsencrypt-nginx-proxy-companion version for DAppNode",
  avatar: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
  type: "service",
  image: {
    path: "letsencrypt-nginx.dnp.dappnode.eth_0.0.1.tar.xz",
    hash: "/ipfs/QmWwMb3XhuCH6JnCF6m6EQzA4mW9pHHtg7rqAfhDr2ofi8",
    size: 23781268,
    volumes: ["~/certs:/etc/nginx/certs:rw"],
    external_vol: ["nginxproxydnpdappnodeeth_vhost.d:/etc/nginx/vhost.d"]
  },
  license: "MIT"
};

const dockerCompose = manifestToCompose(manifest);
// dockerCompose = `version: '3.4'
// services:
//   letsencrypt-nginx.dnp.dappnode.eth:
//     container_name: DAppNodePackage-letsencrypt-nginx.dnp.dappnode.eth
//     image: 'letsencrypt-nginx.dnp.dappnode.eth:0.0.1'
//     volumes:
//       - '~/certs:/etc/nginx/certs:rw'
//       - 'nginxproxydnpdappnodeeth_vhost.d:/etc/nginx/vhost.d'
//     networks:
//       - dncore_network
//     dns: 172.33.1.2
//     logging:
//       options:
//         max-size: 10m
//         max-file: 3
// volumes:
//   nginxproxydnpdappnodeeth_vhost.d:
//     external:
//       name: nginxproxydnpdappnodeeth_vhost.d
// networks:
//   dncore_network:
//     external: true
// `
```

Note, the DAppNodeDocs are generated with [@adobe/jsonschema2md](https://github.com/adobe/jsonschema2md) from the schema in this repository.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
