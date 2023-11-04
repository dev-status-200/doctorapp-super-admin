import React, { memo, useState, useEffect } from "react";

import Doctor from "./Admin";
import { useUser } from "../User/UserProvider";
import { useRouter } from "next/router";

const Dashboard = ({ sessionData, doctors, clinics, clients }) => {
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (sessionData.isAuthorized) {
      setIsClient(true);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      {isClient ? (
        <Doctor
          user={user}
          doctors={doctors}
          clients={clients}
          clinics={clinics}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(Dashboard);
