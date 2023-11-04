import { useState } from "react";

import PrimaryModal from "../Modal";
import { Spinner } from "react-bootstrap";
import { Button } from "antd";
import { useRouter } from "next/router";

const TableCom = ({ data, handleDelete, onClick, loading }) => {
  const [state, setState] = useState({ value: "", open: false });
  const router = useRouter();

  let keys;
  if (data?.length >= 1) {
    keys = Object.keys(...data);
    keys = keys.filter(
      (key) =>
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "type" &&
        key !== "img" &&
        key !== "_id"
    );
  }

  return (
    <>
      {data.length >= 1 && loading == false ? (
        <div className="table-container">
          <table striped bordered hover className="table">
            <thead>
              <tr>
                {keys.map((ele, index) => {
                  return (
                    <>
                      <th key={index}>{ele.toUpperCase()}</th>
                    </>
                  );
                })}

                <th>Delete</th>
                {(router.pathname === "/clients" ||
                  router.pathname === "/doctors") && <th>Approve</th>}
              </tr>
            </thead>

            <tbody>
              {data.map((ele, i) => {
                return (
                  <tr key={i}>
                    {keys.map((key, index) => {
                      return (
                        <>
                          {key === "bio" ||
                          key === "address1" ||
                          key === "address" ||
                          key === "images" ||
                          key === "image" ||
                          key === "address2" ? (
                            <td key={index}>
                              <button
                                className="btn-orange-special rounded"
                                onClick={() => {
                                  setState({
                                    value: ele[key] || `No ${key}`,
                                    open: true,
                                  });
                                }}
                              >{`View ${key}`}</button>
                            </td>
                          ) : (
                            <td>{ele[key]}</td>
                          )}
                        </>
                      );
                    })}

                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(ele["id"]);
                      }}
                    >
                      <Button className="rounded">Delete</Button>
                    </td>

                    {(router.pathname === "/clients" ||
                      router.pathname === "/doctors") && (
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          onClick(ele["id"], ele["approved"]);
                        }}
                      >
                        <Button className="rounded">
                          {ele["approved"] === "0" ? "Approve" : "UnApprove"}
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-spinner">
          {loading ? <Spinner color="blue" /> : <p>No records to show.</p>}
        </div>
      )}
      <PrimaryModal
        open={state.open}
        setOpen={(updatedData) =>
          setState((prevData) => ({
            ...prevData,
            open: updatedData,
          }))
        }
      >
        <div className="p-3">{state.value}</div>
      </PrimaryModal>
    </>
  );
};

export default TableCom;
