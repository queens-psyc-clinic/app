import React from "react";
import { Role } from "../models/User";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

const Overdue = (props: { userRole: Role }) => {
  return (
    <div className="flex flex-col overflow-x-hidden p-6 py-10 w-full h-full">
      <h1 className="text-3xl mb-4">Overdue Items </h1>
      <section className="mt-6 space-y-6 mb-6">
        <SearchBar />
        <Filter />
      </section>
    </div>
  );
};

export default Overdue;
