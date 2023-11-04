import React, { Fragment } from "react";
import Cookies from "cookies";


import Login from "@/components/layout/Auth/Login";
import verifyToken from "@/apis/verifyToken";

const auth = ({ sessionData }) => {

  return (
    <Login sessionData={sessionData} />
  );
};

export default auth;

export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
