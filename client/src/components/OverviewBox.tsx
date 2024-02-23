import lowStockColor from "../assets/icons/low-stock-color.svg";
import signOutColor from "../assets/icons/sign-out-color.svg";
import overdueColor from "../assets/icons/overdue-color.svg";
import "./OverviewBox.css";

const OverviewBox = (props: {
  type: "signedOut" | "overdue" | "lowStock";
  quantity: Number;
}) => {
  const tagMap = {
    signedOut: "Signed Out Items",
    overdue: "Overdue Items",
    lowStock: "Low Stock Items",
  };
  const imgMap = {
    signedOut: signOutColor,
    overdue: overdueColor,
    lowStock: lowStockColor,
  };
  return (
    <div className="flex p-6 rounded-lg" id="overview-container">
      <section>
        <h1 className="font-bold text-2xl">{props.quantity.toString()}</h1>
        <p className="text-[#636363]">{tagMap[props.type]}</p>
      </section>
      <i className="ml-8">
        <img src={imgMap[props.type]} className="w-8"></img>
      </i>
    </div>
  );
};

export default OverviewBox;
