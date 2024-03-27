import { User } from "./User";

export interface Test {
  EditionNumber: string;
  ID: string;
  LevelOfUser: string;
  MeasureOf: string;
  Name: string;
  OrderingCompany: String;
}

export interface SignedOutItem {
  ID: string;
  Name: string;
  ItemName: string;
  MeasureOf: string;
  Acronym: string;
  UserID: User;
  StartDate: Date;
  EndDate: Date;
}
