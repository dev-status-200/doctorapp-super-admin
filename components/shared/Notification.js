"use client"
import React from 'react';
import { notification } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Notification = (title, message, color) => {
  notification.open({
    message: title,
    description: message,
    icon: <ExclamationCircleOutlined style={{ color: color }} />,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export default Notification