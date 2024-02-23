import { User } from "../models/User";
import { columnCustomComponents } from "../models/tableColumns";
import PillCell from "./PillCell";
import UserCell from "./UserCell";

const ColumnComponent = (props: {
  type: columnCustomComponents;
  data: Object;
}) => {
  console.log(props);
  switch (props.type) {
    case columnCustomComponents.pill:
      var pillData = props.data as {
        type: string;
        title: string;
      };
      return <PillCell data={pillData} />;
    case columnCustomComponents.link:
      var linkData = props.data as {
        link: string;
      };
      console.log("WE GOT  A LINK");
      return (
        <a
          href={linkData.link}
          className="text-blue-200 font-semibold underline underline-offset-4"
        >
          {linkData.link}
        </a>
      );
    case columnCustomComponents.user:
      var userData = props.data as User;
      return <UserCell data={userData} />;
    default:
      return <p>N/A</p>;
  }
};

export default ColumnComponent;
