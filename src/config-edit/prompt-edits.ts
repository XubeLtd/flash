import { checkbox, select } from "@inquirer/prompts";
import type { TDeviceTypeOption } from "../device-type/device-type.interface";
import {
  editableFieldsForDeviceType,
  type EditableFieldDef,
} from "./editable-fields";

export const promptEditBeforeFlash = async (): Promise<boolean> => {
  return await select<boolean>({
    message: "Would you like to change anything in the configuration before flashing?",
    choices: [
      { name: "No, use the fetched version as-is", value: false },
      { name: "Yes, edit some fields", value: true },
    ],
    default: false,
  });
};

export const promptEditableFields = async (
  deviceType: TDeviceTypeOption
): Promise<EditableFieldDef[]> => {
  const available = editableFieldsForDeviceType(deviceType);

  if (available.length === 0) {
    console.log(`ℹ️  No editable fields are available for ${deviceType} devices.`);
    return [];
  }

  const selectedKeys = await checkbox<string>({
    message: "Which fields would you like to edit?",
    choices: available.map((f) => ({ name: f.label, value: f.key })),
  });

  return available.filter((f) => selectedKeys.includes(f.key));
};

export const promptReadyToFlash = async (): Promise<boolean> => {
  return await select<boolean>({
    message: "Ready to flash the device?",
    choices: [
      { name: "Yes, flash now", value: true },
      { name: "No, cancel", value: false },
    ],
    default: true,
  });
};
