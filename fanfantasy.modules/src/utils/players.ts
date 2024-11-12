import { POSITION_ID, ROSTER_SLOT_ID } from "./constants";

export const getPositionNameById = (positionId:number):string => {
  return POSITION_ID[positionId] || "UNKNOWN";
};

export const getSlotNameById = (slotId:number): string => {
  return ROSTER_SLOT_ID[slotId] || "UNKNOWN";
}