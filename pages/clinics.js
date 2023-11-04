import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "cookies";

import verifyToken from "@/apis/verifyToken";
import Clinics from '../components/layout/Clinics/index'

const clinics = ({ sessionData }) => {
  const router = useRouter()
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    }
  }, []);
  return <React.Fragment><Clinics/></React.Fragment>;
};

export default clinics;
export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
