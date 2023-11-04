"use client"
import React from "react";
import { Modal } from "antd";

const PrimaryModal = ({ children, title, open, setOpen }) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      footer={false}
      onCancel={() => setOpen(false)}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default PrimaryModal;
