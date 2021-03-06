import { useState } from "react";
import { useSelector } from "react-redux";
import BasicNavBar from "../../../components/BasicNavBar/BasicNavBar";
import Down from "./Down";
import Left from "./Left";
import Up from "./Up";

export default function Settings() {
  return (
    <>
      <BasicNavBar />
      <Up isSettings={true} />
      <Down />
    </>
  );
}
