import unmappedTransportData from "./json/reittiopas.json";
import TransportDataMapper from "./mapper/TransportDataMapper";
import { TransportData } from "./mapper/types";

export default (function () {
  let instance: TransportData;

  function createInstance() {
    const transportData = new TransportDataMapper().map(unmappedTransportData);
    //Quick validations to create warnings to console if something seems to be wrong with the data
    if (!transportData.lines.length) {
      console.error("No lines were included in the transport data!");
    }
    if (!transportData.stopMap.size) {
      console.error("No stops were included in the transport data!");
    }
    return transportData;
  }

  return {
    getInstance: function (): TransportData {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
