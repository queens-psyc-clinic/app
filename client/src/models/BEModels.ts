import { User } from "./User";

export interface Test {
  EditionNumber: string;
  ID: string;
  LevelOfUser: string;
  MeasureOf: string;
  Name: string;
  OrderingCompany: string;
}

export interface Item {
  Ages: string;
  ID: string;
  IsArchived: Number;
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

export interface UserSettings {
  Email: string;
  FirstName: string;
  ID: string;
  IsAdmin: boolean;
  LastName: string;
  IsSubscribed: boolean;
}
