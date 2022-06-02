import { useState } from "react";
import BasicNavBar from "../../../components/BasicNavBar/BasicNavBar";
import Down from "../Settings/Down";
import Up from "./Up";

export default function Privacy() {
  return (
    <>
      <BasicNavBar />
      <Up isSettings={true} />
      {/* <Down /> */}
    </>
  );
}
