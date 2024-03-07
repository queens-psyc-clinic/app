import profilePic from "../assets/profile.svg";
import { Role } from "../models/User";

const Settings = (props: { userRole: Role }) => {
  return (
    <div className="bg-red-100 w-full h-full pt-24 pl-16">
      <section className="border flex">
        <img className="w-20" src={profilePic} />
        <input type="file" className="border h-max"></input>
      </section>
    </div>
  );
};

export default Settings;
