function parseVolumes(volsStringArray = []) {
  return volsStringArray.map(volString => {
    const [host, container] = volString.split(":");
    const isNamed = !host.startsWith("/") && !host.startsWith("~");
    return {
      host,
      container,
      isNamed,
      name: isNamed ? host : null
    };
  });
}

module.exports = parseVolumes;
