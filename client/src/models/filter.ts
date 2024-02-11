import { ItemType, LevelOfUse, Measure } from "./libraryItem";

export interface filter {
  acronym?: string;
  level?: LevelOfUse;
  measure?: Measure;
  itemType?: ItemType;
  minAge?: number;
  maxAge?: number;
}
