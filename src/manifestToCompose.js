const yaml = require("js-yaml");
// Parsers
const parseNameEqualValue = require("./parsers/parseNameEqualValue");
const parseVolumes = require("./parsers/parseVolumes");

// Define docker compose parameters
const dnsService = "172.33.1.2";
const dnpNetwork = "dncore_network";
const containerNamePrefix = "DAppNodePackage-";
const containerCoreNamePrefix = "DAppNodeCore-";

/**
 * Generates a docker-compose.yml from a DNP manifest (dappnode_package.json)
 *
 * @param {object|string} manifest DNP manifest. See this npm package reference for details
 * @param {object} params = {
 *   dnsService: "172.33.1.2",
 *   dnpNetwork: "dncore_network",
 *   containerNamePrefix: "DAppNodePackage-",
 *   containerCoreNamePrefix: "DAppNodeCore-"
 * }
 */
function manifestToCompose(manifest) {
  const packageName = manifest.name.replace("/", "_").replace("@", "");

  // Assume not allowed core condition is already verified
  const isCore = manifest.type === "dncore";

  /**
   * docker-compose.yml
   * ==================
   * `service` section
   * ==================
   */
  const service = {};

  /**
   * @param {string} `service.container_name`
   * - Mandatory
   * - Computed from `manifest.name` and `manifest.type`
   */
  service.container_name =
    (isCore ? containerCoreNamePrefix : containerNamePrefix) + packageName;

  /**
   * @param {string} `service.image`
   * - Mandatory
   * - Computed from `manifest.name` and `manifest.version`
   */
  service.image = manifest.name + ":" + manifest.version;

  /**
   * @param {array} `service.volumes`
   * - Optional
   * - Computed from `manifest.image.volumes` and `manifest.image.external_vol`
   */
  if (manifest.image.volumes || manifest.image.external_vol)
    service.volumes = [
      ...(manifest.image.volumes || []),
      ...(manifest.image.external_vol || [])
    ];

  /**
   * @param {array} `service.ports`
   * - Optional
   * - Computed from `manifest.image.ports`
   */
  if (manifest.image.ports) service.ports = manifest.image.ports;

  /**
   * @param {array} `service.env_file`
   * - Optional
   * - If there are ENVs declared, the installer will create a .env file,
   *   which must be referenced in the docker-compose.yml
   */
  if (manifest.image.environment) service.env_file = [packageName + ".env"];

  /**
   * @param {object|array} `service.networks`
   * - Mandatory
   * - For core DNPs, a specific ipv4 is assigned to them and referenced in the docker-compose.yml
   *   for non-core DNPs, they just join the dappnode network
   */
  if (isCore) {
    if (manifest.image.ipv4_address)
      service.networks = {
        network: {
          ipv4_address: manifest.image.ipv4_address
        }
      };
  } else {
    service.networks = [dnpNetwork];
  }

  /**
   * @param {string} `service.dns`
   * - Mandatory
   * - All DNPs must point their DNS to the DNP_BIND, at a specific IP
   */
  service.dns = dnsService;

  /**
   * @param {Bool} `service.privileged`
   * - Optional
   * - Declared on `manifest.image.privileged`
   * - Only allowed for core DNPs
   */
  if (isCore && manifest.image.privileged) service.privileged = true;

  /**
   * @param {string} `service.restart`
   * - Optional
   * - Declared on `manifest.image.restart`
   */
  if (manifest.image.restart) service.restart = manifest.image.restart;

  /**
   * @param {object} `servies.labels`
   * - Mandatory
   * - Labels serve multiple purposes
   *   1. "dappnode.dnp.dependencies" describes the DNP dependencies
   *   2. "dappnode.dnp.origin" points if comes from IPFS or an APM
   *   3. "dappnode.dnp.chain" triggers the chain watcher
   *   4. Add any other labels defined in the manifest
   */
  const addLabels = labels => {
    service.labels = { ...(service.labels || {}), ...labels };
  };
  /**
   * Merge labels:
   * service.labels = {
   *   label: "value",
   *   label-without-value: ""
   * }
   * [NOTE] Correct labels as array to be an object
   */
  if (manifest.image.labels)
    addLabels(
      Array.isArray(manifest.image.labels)
        ? parseNameEqualValue(manifest.image.labels)
        : manifest.image.labels
    );
  /**
   * Add the dependencies of the package in its labels
   * Prevents the resolver to access IPFS (and ENS) to know its dependencies
   */
  if (manifest.dependencies)
    addLabels({
      "dappnode.dnp.dependencies": JSON.stringify(manifest.dependencies)
    });
  /**
   * Adding the origin of the package as a label to be used in the resolve
   * This is important to recognize if this package comes from IPFS or ENS
   * origin is critical for dappGet/aggregate on IPFS DNPs
   */
  if (manifest.origin)
    addLabels({
      "dappnode.dnp.origin": manifest.origin
    });
  /**
   * Add the chain driver
   * This will automatically trigger the chain watcher
   */
  if (manifest.chain)
    addLabels({
      "dappnode.dnp.chain": manifest.chain
    });

  // Extra features
  if (manifest.image.cap_add) service.cap_add = manifest.image.cap_add;
  if (manifest.image.cap_drop) service.cap_drop = manifest.image.cap_drop;
  if (manifest.image.devices) service.devices = manifest.image.devices;
  if (manifest.image.network_mode)
    service.network_mode = manifest.image.network_mode;
  if (manifest.image.command) service.command = manifest.image.command;

  /**
   * [NOTE] add last to the service object
   * @param {object} `service.logging`
   * - Mandatory
   * - Limit logs size, chains can grow the logs to > 20 GB
   *   "json-file" is the default driver https://docs.docker.com/config/containers/logging/configure/#configure-the-default-logging-driver
   */
  service.logging = {
    options: {
      "max-size": "10m",
      "max-file": "3"
    }
  };

  /**
   * docker-compose.yml
   * ==================
   * `volumes` section
   * ==================
   */
  const volumes = {};

  /**
   * Regular volumes
   * - Computed from `manifest.image.volumes`
   */
  if (manifest.image.volumes)
    parseVolumes(manifest.image.volumes).forEach(vol => {
      if (vol.isNamed) volumes[vol.name] = {};
    });

  /**
   * External volumes
   * - Computed from `manifest.image.external_vol`
   */
  if (manifest.image.external_vol)
    parseVolumes(manifest.image.external_vol).forEach(vol => {
      volumes[vol.name] = {
        external: {
          name: vol.name
        }
      };
    });

  /**
   * docker-compose.yml
   * ==================
   * `networks` section
   * ==================
   */
  const networks = {};
  if (isCore && manifest.image.subnet) {
    networks.network = {
      driver: "bridge",
      ipam: {
        config: [{ subnet: manifest.image.subnet }]
      }
    };
  } else {
    networks[dnpNetwork] = {
      external: true
    };
  }

  /**
   * Construct the final json yaml object
   * - Only add the volumes section if necessary
   * - Only add the networks section if necessary
   */
  const dockerComposeJson = {
    version: "3.4",
    services: {
      [packageName]: service
    },
    ...(Object.keys(volumes).length ? { volumes } : {}),
    ...(Object.keys(networks).length ? { networks } : {})
  };

  return yaml.dump(dockerComposeJson, { indent: 2 });
}

module.exports = manifestToCompose;
