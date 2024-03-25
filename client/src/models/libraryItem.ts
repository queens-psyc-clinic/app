import { User } from "./User";

export interface LibraryItem {
  id?: string;
  Name: string;
  "Item Name": string;
  Item: ItemType;
  Measure: Measure;
  Level: LevelOfUse;
  Acronym: string;
  Edition: number;
  Quantity: number;
  Location?: string;
  isAvailable: boolean;
  borrower: User;
  minAge: number;
  maxAge: number;
  orderingCompanyUrl: string;
}

export type CartItem = {
  id: string;
  Name: string;
  "Item Name": string;
  Item: ItemType;
  minAge: number;
  maxAge: number;
} & Partial<LibraryItem>;

export const getPillColor = (pillName: string) => {
  switch (pillName) {
    case "Book":
      return "yellow";
    case "CD":
      return "blue";
    case "Form":
      return "green";
    case "Install Disk":
      return "teal";
    case "Kit":
      return "orange";
    case "Manual":
      return "red";
    case "Scoring":
      return "pink";
    case "USB Stick":
      return "purple";
    default:
      return "gray";
  }
};

export type ItemType =
  | "Book"
  | "CD"
  | "Form"
  | "Install Disk"
  | "Kit"
  | "Manual"
  | "Scoring"
  | "USB Stick"
  | "Textbook";

export const ItemTypeOptions: ItemType[] = [
  "Book",
  "CD",
  "Form",
  "Install Disk",
  "Kit",
  "Manual",
  "Scoring",
  "USB Stick",
  "Textbook",
];

export const itemTypeOptions: string[] = [
  "Book",
  "CD",
  "Form",
  "Install Disk",
  "Kit",
  "Manual",
  "Scoring",
  "USB Stick",
  "Textbook",
];

export enum Measure {
  AcademicAchievement = "Academic Achievement",
  AdaptiveFunctioning = "Adaptive Functioning",
  AttentionADHD = "Attention/ ADHD",
  Autism = "Autism",
  CopingResiliancy = "Coping/ Resiliency",
  EatingDisorder = "Eating Disorder",
  GeneralBehaviourAndEmotion = "General Behaviour and Emotion",
  IntellectualFunctioning = "Intellectual Functioning",
  Language = "Language",
  Malingering = "Malingering",
  Memory = "Memory",
  MoodAnxiety = "Mood/ Anxiety",
  Neuropsych = "Neuropsych",
  Personality = "Personality",
  Projective = "Projective",
  SocialAndFamily = "Social and Family",
  Trauma = "Trauma",
  VisualMotor = "Visual-Motor",
  Vocational = "Vocational",
  Other = "Other",
}

export enum LevelOfUse {
  A = "A",
  B = "B",
  C = "C",
  S = "S",
}