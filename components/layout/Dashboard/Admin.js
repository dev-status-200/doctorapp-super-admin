"use client"
import React, { memo, useState, useEffect } from "react";
import moment from "moment";

import Table from "../../shared/Table/Table";
import Card from "../../shared/Card/Card";
import BarChart from "@/components/shared/Charts/BarChart";

const Doctor = ({ user, clients, doctors, clinics }) => {
  const [data, setData] = useState({
    clients: clients,
    doctors: doctors,
    clinics: clinics,
    approved: { clients: [], doctors: [] },
    unapproved: { clients: [], doctors: [] },
    verified: [],
    notverified: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const updatedData = {
      clients: clients,
      doctors: doctors,
      clinics: clinics,
      approved: { clients: [], doctors: [] },
      unapproved: { clients: [], doctors: [] },
      verified: [],
      notverified: [],
    };

    data.clients.forEach((client) => {
      if (client.approved === "1") {
        updatedData.approved.clients.push(client);
      } else if (client.approved === "0") {
        updatedData.unapproved.clients.push(client);
      }
      if (client.verified === "1") {
        updatedData.verified.push(client);
      } else if (client.verified === "0") {
        updatedData.notverified.push(client);
      }
    });

    data.doctors.forEach((doctor) => {
      if (doctor.approved === "1") {
        updatedData.approved.doctors.push(doctor);
      } else if (doctor.approved === "0") {
        updatedData.unapproved.doctors.push(doctor);
      }
      if (doctor.verified === "1") {
        updatedData.verified.push(doctor);
      } else if (doctor.verified === "0") {
        updatedData.notverified.push(doctor);
      }
    });

    setData(updatedData);
    setLoading(false);
  }, []);

  const deleteDoctor = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_DELETE_DOCTORS, { headers: { id: id } })
      .then((r) => {
        const newData = data.doctors?.filter((item) => item.id !== id);
        setData((prevData) => ({
          ...prevData,
          doctors: newData,
        }));
      });
  };

  const deleteClinic = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_DELETE_CLINICS, { headers: { id: id } })
      .then((r) => {
        const newData = data.clinics?.filter((item) => item.id !== id);
        setData((prevData) => ({
          ...prevData,
          clinics: newData,
        }));
      });
  };

  const deleteClient = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_DELETE_DOCTORS, { headers: { id: id } })
      .then((r) => {
        const newData = data.clients?.filter((item) => item.id !== id);
        setData((prevData) => ({
          ...prevData,
          clients: newData,
        }));
      });
  };

  const verifyDoctor = (id, status) => {
    let approved = "0";
    if (status === null || status === "0") {
      approved = "1";
    }
    if (status === null || status === "1") {
      approved = "0";
    }
    axios
      .post(process.env.NEXT_PUBLIC_APPROVE_DOCTORS, {
        id: id,
        approved: approved,
      })
      .then((r) => {
        if (r.data.status === "success") {
          let tempState = [...data];
          let i = tempState.findIndex((item) => item.id === id);
          tempState[i].approved = approved;
          setData((prevData) => ({
            ...prevData,
            doctors: tempState,
          }));
        }
      });
  };

  const verifyClient = (id, status) => {
    let approved = "0";
    if (status === null || status === "0") {
      approved = "1";
    }
    if (status === null || status === "1") {
      approved = "0";
    }
    axios
      .post(process.env.NEXT_PUBLIC_APPROVE_CLIENT, {
        id: id,
        approved: approved,
      })
      .then((r) => {
        if (r.data.status === "success") {
          let tempState = [...data];
          let i = tempState.findIndex((item) => item.id === id);
          tempState[i].approved = approved;
          setData((prevData) => ({
            ...prevData,
            clients: tempState,
          }));
        }
      });
  };

  const chartData = {
    labels: [
      "Approved Users",
      "Uapproved Users",
      "Users",
      "Approved Doctors",
      "Uapproved Doctors",
      "Doctors",
    ],
    data: [
      data.approved.clients.length,
      data.unapproved.clients.length,
      data.clients.length,
      data.approved.doctors.length,
      data.unapproved.doctors.length,
      data.doctors.length,
    ],
    backgroundColor: [
      "rgba(13, 255, 223)",
      "rgba(255, 13, 122)",
      "rgba(247, 233, 139)",
      "rgba(192, 156, 255)",
      "rgba(158, 247, 159)",
      "rgba(158, 169, 247)",
    ],
    borderColor: [
      "rgba(13, 255, 223)",
      "rgba(255, 13, 122)",
      "rgba(247, 233, 139)",
      "rgba(192, 156, 255)",
      "rgba(158, 247, 159)",
      "rgba(158, 169, 247)",
    ],
  };

  return (
    <div className="container-fluid ">
      <div className="top-section mb-4 ">
        <h4>My Dashboard</h4>
      </div>
      <div className="row middle-section rounded">
        <div className="col-md-6">
          <h3>Good Evening, {user?.name || ""}</h3>
          <p>{moment().format("MMMM Do YYYY")}</p>
        </div>
        <div className="col-md-6 d-flex mb-2">
          <div className="row group-box">
            <div className="col">
              {data.approved.clients.length}
              <p>Approved Users</p>
            </div>
            <div className="col">
              {data.unapproved.clients.length}
              <p>Unapproved Users</p>
            </div>
            <div className="col">
              {data.approved.doctors.length}
              <p>Approved Doctors</p>
            </div>
            <div className="col">
              {data.unapproved.doctors.length}
              <p>Unapproved Doctors</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row main-section">
        <div className="col-md-6">
          <Card
            length={doctors.length}
            pagination={false}
            viewTable={false}
            title={"Doctors"}
          >
            <Table
              loading={loading}
              handleDelete={deleteDoctor}
              onClick={verifyDoctor}
              data={data.doctors}
            />
          </Card>
        </div>
        <div className="col-md-6">
          <Card
            length={clients.length}
            pagination={false}
            viewTable={false}
            title={"Users"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClient}
              onClick={verifyClient}
              data={data.clients}
            />
          </Card>
        </div>
        <div className="col-md-6 mt-5">
          <Card
            length={clinics.length}
            pagination={false}
            viewTable={false}
            title={"Clinics"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClinic}
              onClick={null}
              data={data.clinics}
            />
          </Card>
        </div>
        <div className="col-md-6 mt-5">
          <Card
            length={clinics.length}
            pagination={false}
            viewTable={false}
            title={"Data Chart"}
          >
            <BarChart
              title={"Data Chart"}
              labels={chartData.labels}
              data={chartData.data}
              backgroundColor={chartData.backgroundColor}
              borderColor={chartData.borderColor}
            />
          </Card>
        </div>
        <h2 className="mt-5 ">Approved & Unapproved Doctors</h2>
        <div className="col-md-6 mt-5">
          <Card
            length={data.approved.doctors.length}
            pagination={false}
            viewTable={false}
            title={"Approved"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClinic}
              onClick={null}
              data={data.approved.doctors}
            />
          </Card>
        </div>
        <div className="col-md-6 mt-5">
          <Card
            length={data.unapproved.doctors.length}
            pagination={false}
            viewTable={false}
            title={"Unapproved"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClinic}
              onClick={null}
              data={data.unapproved.doctors}
            />
          </Card>
        </div>
        <h2 className="mt-5">Approved & Unapproved Users</h2>
        <div className="col-md-6 mt-5">
          <Card
            length={data.approved.clients.length}
            pagination={false}
            viewTable={false}
            title={"Approved"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClinic}
              onClick={null}
              data={data.approved.clients}
            />
          </Card>
        </div>
        <div className="col-md-6 mt-5">
          <Card
            length={data.unapproved.clients.length}
            pagination={false}
            viewTable={false}
            title={"Unapproved"}
          >
            <Table
              loading={loading}
              handleDelete={deleteClinic}
              onClick={null}
              data={data.unapproved.clients}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default memo(Doctor);
