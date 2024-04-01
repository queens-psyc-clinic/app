import Table from "../components/Table";
import { Role, User } from "../models/User";
import { IoMdArrowBack } from "react-icons/io";
import { defaultMockData, signedOutMockData } from "../utils/mockData";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OverdueItem, SignedOutItem, Test } from "../models/BEModels";
import PageNotFound from "./PageNotFound";
import {
  getAllOverdueTestsByUser,
  getAllSignedOutItemsByUser,
  getItemById,
  getItemMeasure,
} from "../services/TestService";
import {
  BackendUser,
  getSessionId,
  getUserSettingsData,
} from "../services/UserService";
import _ from "lodash";
import SignedOutTable from "../components/SignedOutTable";
import OverdueTable from "../components/OverdueTable";
import LoadingSpinner from "../components/LoadingSpinner";

const StudentPage = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [signedOutData, setSignedOutData] = useState<SignedOutItem[]>([]);
  const [overdueData, setoverdueData] = useState<OverdueItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<BackendUser>({
    ID: "",
    FirstName: "",
    LastName: "",
    Email: "",
    IsAdmin: false,
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      getUserSettingsData(id || "").then((res) => setUserData(res));
      const signedOut = await getAllSignedOutItemsByUser(id || "");
      console.log(signedOut);
      for (const signedOutItem of signedOut) {
        const itemMeasure = await getItemMeasure(signedOutItem.Acronym);
        const item = await getItemById(signedOutItem.Acronym);
        setSignedOutData((prev) =>
          _.unionBy(
            [
              ...prev,
              {
                ...item,
                MeasureOf: itemMeasure,
                EditionNumber: "",
                LevelOfUser: "",
                LoanID: signedOutItem.ID,
                Name: signedOutItem.Name,
                ID: signedOutItem.ID,
                StartDate: signedOutItem.StartDate,
                EndDate: signedOutItem.EndDate,
                Quantity: signedOutItem.Quantity,
              },
            ],
            "LoanID"
          )
        );
      }

      const overdue = await getAllOverdueTestsByUser(id || "");
      console.log(overdue);
      for (const overdueItem of overdue) {
        const itemMeasure = await getItemMeasure(overdueItem.Acronym);
        const item = await getItemById(overdueItem.Acronym);
        setoverdueData((prev) =>
          _.unionBy(
            [
              ...prev,
              {
                ...item,
                MeasureOf: itemMeasure,
                EditionNumber: "",
                LevelOfUser: "",
                LoanID: overdueItem.ID,
                StartDate: overdueItem.StartDate,
                EndDate: overdueItem.EndDate,
              },
            ],
            "LoanID"
          )
        );
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, []);

  console.log(signedOutData);

  if (props.userRole === "admin") {
    return (
      <div className="flex flex-col overflow-x-hidden px-16 py-10 w-full h-full">
        <Link to="/">
          <i>
            <IoMdArrowBack size={30} />
          </i>
        </Link>
        <h1 className="text-4xl font-bold mt-8 mb-4">
          {userData.FirstName} {userData.LastName}
        </h1>
        <h2 className="text-2xl">{userData.Email}</h2>
        <hr className="mt-8 mb-8 border-gray-100"></hr>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <section className="h-[30vh] min-h-[30vh] overflow-y-scroll">
              <p className="font-semibold mb-6">Signed Out Items</p>
              <SignedOutTable
                tableType="signedOut"
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                data={signedOutData}
                isEditable={false}
                isCheckable={true}
              />
            </section>
            <section className="mt-6">
              <p className="font-semibold mb-6">Overdue Items</p>
              <OverdueTable
                tableType="overdue"
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                data={overdueData}
                isEditable={false}
                isCheckable={true}
              />
            </section>
          </>
        )}
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};

export default StudentPage;
