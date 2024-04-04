import { Link } from "react-router-dom";
import { User } from "../models/User";
import { FaCaretRight } from "react-icons/fa";

const UserCell = (props: { data: User & { id: string } }) => {
  console.log(props.data);
  return (
    <Link to={`/student/${props.data.id}`}>
      <div className="flex border w-min p-2 rounded cursor-pointer">
        <section className="">
          <p className="font-semibold	">
            {props.data.firstName} {props.data.lastName}
          </p>
          <p>{props.data.email}</p>
        </section>
        <i className="ml-6">
          <FaCaretRight />
        </i>
      </div>
    </Link>
  );
};

export default UserCell;
