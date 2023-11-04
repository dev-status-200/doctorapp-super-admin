import React from "react";
import Cookies from "cookies";

import verifyToken from "@/apis/verifyToken";
import Clinics from '../components/layout/Clinics/index'

const clinics = ({ sessionData }) => {

  return <Clinics sessionData={sessionData} />;
};

export default clinics;
export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
