import { type TXubeGetDeviceModelsResponse } from "../../constants";
import { DeviceType } from "../device-type";
import { DEVICE_TYPE_PLANET, type IDeviceType } from "../device-type.interface";

export class PlanetDeviceType extends DeviceType implements IDeviceType {
  hasFileSystem = false;

  constructor(model: TXubeGetDeviceModelsResponse[number]) {
    super(model, DEVICE_TYPE_PLANET);
  }

  flash = async (deviceId: string): Promise<boolean> => {
    throw new Error(`Flashing planet devices is not currently supported`);
  };
}
