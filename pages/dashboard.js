import React from "react";
import axios from "axios";
import Cookies from "cookies";

import verifyToken from "@/apis/verifyToken";
import Dashboard from "@/components/layout/Dashboard/Dashboard";

const dashboard = ({ sessionData, doctors, clients, clinics }) => {
  return (
    <>
      <Dashboard
        sessionData={sessionData}
        doctors={doctors.result||[]}
        clients={clients.result||[]}
        clinics={clinics.result||[]}
      />
    </>
  );
};

export default dashboard;

export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  const doctors = await axios
    .get(process.env.NEXT_PUBLIC_GET_DOCTORS,{headers:{page:0,limit:5}})
    .then((r) => r.data);
  const clinics = await axios
    .get(process.env.NEXT_PUBLIC_GET_CLINICS,{headers:{page:0,limit:5}})
    .then((r) => r.data);
  const clients = await axios
    .get(process.env.NEXT_PUBLIC_GET_CLIENTS,{headers:{page:0,limit:5}})
    .then((r) => r.data);

  return {
    props: {
      sessionData: sessionRequest,
      clients: clients,
      clinics: clinics,
      doctors: doctors,
    },
  };
}
