import Table from "../components/Table";
import { Role } from "../models/User";
import { IoMdArrowBack } from "react-icons/io";
import { defaultMockData, signedOutMockData } from "../utils/mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Test } from "../models/BEModels";
import PageNotFound from "./PageNotFound";

const StudentPage = (props: { userRole: Role }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [signedOutData, setSignedOutData] = useState<Test[]>([]);
  const [overdueData, setoverdueData] = useState<Test[]>([]);

  useEffect(() => {
    // WAITING ON me to connect to backend
    setSignedOutData([]);
    setoverdueData([]);
  }, []);

  if (props.userRole !== "admin") {
    return <PageNotFound />;
  }

  return (
    <div className="flex flex-col overflow-x-hidden px-16 py-10 w-full h-full">
      <Link to="/admin">
        <i>
          <IoMdArrowBack size={30} />
        </i>
      </Link>
      <h1 className="text-4xl font-bold mt-8 mb-4">John Doe</h1>
      <h2 className="text-2xl">18dasta@queensu.ca</h2>
      <hr className="mt-8 mb-8 border-gray-100"></hr>
      <p className="font-semibold mb-6">Signed Out Items</p>
      <Table
        tableType="default"
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        data={signedOutData}
        isEditable={false}
        isCheckable={true}
      />
      <section className="mt-6">
        <p className="font-semibold mb-6">Overdue Items</p>
        <Table
          tableType="signedOut"
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          data={overdueData}
          isEditable={false}
          isCheckable={true}
        />
      </section>
    </div>
  );
};

export default StudentPage;
