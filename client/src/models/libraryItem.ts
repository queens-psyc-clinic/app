import { User } from "./User";

export interface LibraryItem {
  name: string;
  itemName: string;
  itemType: ItemType;
  measure: Measure;
  levelOfUse: LevelOfUse;
  acronym: string;
  editionNumber: number;
  quantity: number;
  location: string;
  isAvailable: boolean;
  borrower: User;
  minAge: number;
  maxAge: number;
  orderingCompanyUrl: string;
}

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
  A,
  B,
  C,
  S,
}
