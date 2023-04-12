import React from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

function MyClasses() {
  const demoColumns = ["Course name", "Action"];
  const columnArea = {
    "Course name": "70%",
    Action: "30%",
  };
  const demoData = [
    {
      "Course name": "Artificial Intelligence",
      Action: <Button version="danger">Drop Class</Button>,
    },
    {
      "Course name": "Machine Learning",
      Action: <Button version="danger">Drop Class</Button>,
    },
    {
      "Course name": "Networking",
      Action: <Button version="danger">Drop Class</Button>,
    },
  ];
  return (
    <div>
      <Table column={demoColumns} data={demoData} area={columnArea} />
    </div>
  );
}

export default MyClasses;
