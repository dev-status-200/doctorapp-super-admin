import React, { useState } from "react";
import Router, { useRouter } from "next/router";

import "@/styles/globals.css";
import "@/styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Loader from "@/components/shared/Loader";
import Layout from "@/components/shared/Layout";
import UserProvider from "@/components/layout/User/UserProvider";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <>
      {router.pathname !== "/auth" && router.pathname !== "/" && (
        <>
          {loading ? (
            <Layout>
              <Loader />
            </Layout>
          ) : (
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          )}
        </>
      )}
      {(router.pathname === "/" || router.pathname === "/auth") && (
        <Component {...pageProps} />
      )}
    </>
  );
}
