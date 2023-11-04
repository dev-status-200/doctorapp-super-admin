"use client"
import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

import Notification from "@/components/shared/Notification";
import { Spinner } from "react-bootstrap";
import VectorArt from "../../../public/images/sheild.png";
import Image from "next/image";

const Login = ({sessionData}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (sessionData.isAuthorized) {
      router.push("/dashboard");
    }
  }, [sessionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(process.env.NEXT_PUBLIC_ADMIN_LOGIN, {
        headers: {
          username: username,
          password: password,
        },
      })
      .then((r) => {
        if (r.data.status == "success") {
          setLoading(false);
          console.log(r.data);
          let token = jwt_decode(r.data.token);
          Cookies.set("token", r.data.token, { expires: 1 });
          Cookies.set("user", JSON.stringify(r.data.payload), { expires: 1 });
          Cookies.set("id", token.loginId, { expires: 1 });
          router.push("/");
        } else {
          setLoading(false);
          Notification(
            "Error",
            "The Username or Password does not match",
            "red"
          );
        }
      });
  };

  return (
    <div className="admin-panel">
      <div className="admin-form">
        <div className="text-center">
          <Image src={VectorArt} width={110} height={110} />
        </div>
        <h2 className="mt-4">Admininstrator</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Please put your credentials to access. </p>
        <button disabled={loading ? true : false} onClick={handleSubmit}>
          {loading ? <Spinner size="sm" color="white" /> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default memo(Login);
