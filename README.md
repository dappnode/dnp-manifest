# DNP Manifest

dnp-manifest is a tool define the DNP manifest format by providing its JSON schema and a manifest to docker-compose.yml conversion function.

## Request additional features

To request additional features in the DNP manifest, please [open an issue](https://github.com/dappnode/dnp-manifest/issues)

## Reference manifest

See https://dappnode.github.io/DAppNodeDocs/manifest-reference/

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

Note, the DAppNodeDocs are generated with the NPM package [git://github.com/dapplion/jsonschema2md.git](https://github.com/dapplion/jsonschema2md/releases/tag/v1.1.2) from the schema in this repository.
```
npx git://github.com/dapplion/jsonschema2md.git -d $MANIFEST_PATH -x - -o docs
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
