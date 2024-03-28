export const mapColumnTitleToDataIndex = (colTitle: string) => {
  switch (colTitle) {
    case "Acronym":
      return "ID";
    case "Name":
      return "Name";
    case "Measure":
      return "MeasureOf";
    case "Level":
      return "LevelOfUser";
    case "Edition":
      return "EditionNumber";
    case "Edition":
      return "EditionNumber";
    case "Ordering Company":
      return "OrderingCompany";
    default:
      return colTitle;
  }
};
