import uuid from "react-uuid";

const PillCell = (props: {
  data: {
    type: string;
    title: string;
  };
}) => {
  /*Configure pill styling for the default item type column*/
  const getPillColor = (pillName: string) => {
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

  const getPillStyle = (pillName: string) => {
    const pillColor = getPillColor(pillName);
    return `text-xs text-${pillColor}-200 bg-${pillColor}-100 text-center px-4 py-2 rounded-full w-fit max-w-60 flex justify-center items-center`;
  };
  if (props.data.type == "measure") {
    return (
      <p
        id="measure-pill"
        className="inline-block text-xs text-blue-200 border border-blue-200 border-solid text-center px-4 py-2 rounded-full w-fit max-w-64 flex justify-center items-center"
      >
        {props.data.title}
      </p>
    );
  } else {
    return (
      <p
        className={`${getPillStyle(props.data.title)} 
            flex justify-center items-center
              inline-block`}
      >
        {props.data.title}
      </p>
    );
  }
};

export default PillCell;
