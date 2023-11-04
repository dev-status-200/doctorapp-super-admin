"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

import TableCom from "@/components/shared/Table/Table";
import TableFooter from "@/components/shared/Table/TableFooter";
import TableHeader from "@/components/shared/Table/TableHeader";

import { useRouter } from 'next/router';

const Clients = ({sessionData}) => {

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [data, setData] = useState([]);
  const [searchedData, setSearchData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function getAllClients() {
    await axios
      .get(process.env.NEXT_PUBLIC_GET_CLIENTS, {
        headers: { page: currentPage, limit: pageSize },
      })
      .then((r) => {
        if (r.data.status === "success") {
          setData(r.data.result);
          setTotalPages(Math.ceil(r.data.totalItems / pageSize));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }

  const deleteClient = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_DELETE_DOCTORS, { headers: { id: id } })
      .then((r) => {
        const newData = data?.filter((item) => item.id !== id);
        setData(newData);
        setLoading(false);
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
          setData(tempState);
        }
      });
  };

  const searchClient = async (term) => {
    if (term.length > 2) {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_SEARCH_CLIENTS, {
          headers: { searchTerm: `${term}` },
        })
        .then((r) => {
          setSearchData(r.data.result);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    searchClient(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getAllClients();
  }, [currentPage]);

  
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    } 
  }, []);

  return (
    <div className="border rounded shadow m-5 p-5">
      <TableHeader
        setSearchTerm={setSearchTerm}
        length={data.length}
        title={"Clients Data"}
      />
      <TableCom
        loading={loading}
        data={searchTerm.length > 2 ? searchedData : data}
        handleDelete={deleteClient}
        onClick={verifyClient}
      />
      <TableFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        lenghtSize={data.length}
        viewTable={true}
      />
    </div>
  );
};

export default Clients;
