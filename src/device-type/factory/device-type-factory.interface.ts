import type { TXubeGetDeviceModelsResponse } from "../../constants";
import type { IDeviceType } from "../device-type.interface";

export interface IDeviceTypeFactory {
  createDeviceType(
    model: TXubeGetDeviceModelsResponse[number]
  ): IDeviceType | undefined;
}
