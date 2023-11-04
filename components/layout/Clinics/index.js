"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import TableCom from "@/components/shared/Table/Table";
import TableFooter from "@/components/shared/Table/TableFooter";
import TableHeader from "@/components/shared/Table/TableHeader";

const Clinics = ({sessionData}) => {

  const router = useRouter()
  useEffect(() => {
    if (!sessionData.isAuthorized) {
      router.push("/");
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [data, setData] = useState([]);
  const [searchedData, setSearchData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  async function getAllClinics() {
    await axios
      .get(process.env.NEXT_PUBLIC_GET_CLINICS, {
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

  const deleteClinic = (id) => {
    setLoading(true);
    axios
      .delete(process.env.NEXT_PUBLIC_DELETE_CLINICS, { headers: { id: id } })
      .then((r) => {
        const newData = data?.filter((item) => item.id !== id);
        setData(newData);
        setLoading(false);
      });
  };

  const searchClinic = async (term) => {
    if (term.length > 2) {
      setLoading(true);
      axios
        .get(process.env.NEXT_PUBLIC_SEARCH_CLINICS, {
          headers: { searchTerm: `${term}` },
        })
        .then((r) => {
          setSearchData(r.data.result);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    searchClinic(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getAllClinics();
  }, [currentPage]);

  return (
    <div className="border rounded shadow m-5 p-5">
      <TableHeader
        setSearchTerm={setSearchTerm}
        length={data.length}
        title={"Clinics Data"}
      />
      <TableCom
        loading={loading}
        handleDelete={deleteClinic}
        data={searchTerm.length > 2 ? searchedData : data}
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

export default Clinics;
