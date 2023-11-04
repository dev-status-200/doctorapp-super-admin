import React, { Fragment, useEffect } from "react";
import Cookies from "cookies";
import { useRouter } from "next/router";

import Login from "@/components/layout/Auth/Login";
import verifyToken from "@/apis/verifyToken";

const auth = ({ sessionData }) => {
  const router = useRouter();

  useEffect(() => {
    if (sessionData.isAuthorized) {
      router.push("/dashboard");
    } else {
      return ;
    }
  }, []);

  return (
    <React.Fragment>
      <Login />
    </React.Fragment>
  );
};

export default auth;

export async function getServerSideProps({ req, res }) {
  const sessionRequest = await verifyToken(Cookies, req, res);

  return {
    props: { sessionData: sessionRequest },
  };
}
