import { PlanetDeviceType } from "../device-types/planet";
import type { IDeviceTypeFactory } from "./device-type-factory.interface";
import type { IDeviceType } from "../device-type.interface";
import { SunDeviceType } from "../device-types/sun";
import type { TXubeGetDeviceModelsResponse } from "../../constants";

export class DeviceTypeFactory implements IDeviceTypeFactory {
  createDeviceType(
    model: TXubeGetDeviceModelsResponse[number]
  ): IDeviceType | undefined {
    switch (model.name) {
      case "PLANET":
        return new PlanetDeviceType(model);
      case "SUN":
        return new SunDeviceType(model);
      default:
        console.log(`Unknown device type: ${model.name}`);
        return undefined;
    }
  }
}
