import type { TXubeGetDeviceModelsResponse } from "../../constants";
import type { IDeviceType } from "../device-type.interface";
import {
  Gen1PlanetDeviceType,
  Gen2PlanetDeviceType,
} from "../device-types/planet";
import { Gen1SunDeviceType, Gen2SunDeviceType } from "../device-types/sun";
import type { IDeviceTypeFactory } from "./device-type-factory.interface";

export class DeviceTypeFactory implements IDeviceTypeFactory {
  createDeviceType(
    model: TXubeGetDeviceModelsResponse[number]
  ): IDeviceType | undefined {
    const key = `${model.model}:${model.generation}`;
    switch (key) {
      case "SUN:1":
        return new Gen1SunDeviceType(model);
      case "SUN:2":
        return new Gen2SunDeviceType(model);
      case "PLANET:1":
        return new Gen1PlanetDeviceType(model);
      case "PLANET:2":
        return new Gen2PlanetDeviceType(model);
      default:
        console.log(`Unknown device type: ${key}`);
        return undefined;
    }
  }
}
