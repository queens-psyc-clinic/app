import { User } from "./User";

export interface Test {
  EditionNumber: string;
  ID: string;
  LevelOfUser: string;
  MeasureOf: string;
  Name: string;
  OrderingCompany: String;
}

export interface Item {
  Ages: string;
  ID: string;
  IsArchived: Number; //
  ItemName: string;
  ItemType: string;
  Location: string;
  Status: Boolean;
  Stock: Number;
  TestID: string;
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

export interface OverdueItem {
  ID: string;
  Name: string;
  ItemName: string;
  MeasureOf: string;
  Acronym: string;
  UserID: User;
  StartDate: Date;
  EndDate: Date;
  LastNotified: Date;
}
