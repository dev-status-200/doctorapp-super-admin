import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/images/logo.png";
import { useRouter } from "next/router";

import {
  BarChartOutlined,
  MedicineBoxOutlined,
  ApartmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { Layout, Menu } from "antd";
import Cookies from "js-cookie";

const { Sider, Content } = Layout;

const HeaderCom = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const navLinks = [
    {
      key: "1",
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      href: "/doctors",
      label: "Doctors",
      icon: <MedicineBoxOutlined />,
    },
    { key: "3", href: "/clients", label: "Clients", icon: <TeamOutlined /> },
    {
      key: "4",
      href: "/clinics",
      label: "Clinics",
      icon: <ApartmentOutlined />,
    },
    // {
    //   key: "5",
    //   href: "/support",
    //   label: "Customer Support",
    //   icon: <CustomerServiceOutlined />,
    // },
  ];
  return (
    <>
      <Layout>
        <Sider
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {!collapsed && (
            <div className="text-center mt-4 mb-3">
              <Image src={Logo} height={60} width={60} />
              <hr style={{ color: "silver" }} />
            </div>
          )}
          {collapsed && (
            <div className="text-center mt-4 mb-3">
              <Image src={Logo} height={30} width={30} />
              <hr style={{ color: "silver" }} />
            </div>
          )}
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {navLinks.map((link, i) => (
              <div key={i} className="m-2">
                <Menu.Item icon={link.icon}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </Menu.Item>
              </div>
            ))}
          </Menu>
          <div
            onClick={() => {
              Cookies.remove("id");
              Cookies.remove("token");
              Cookies.remove("user");
              router.push("/");
            }}
            className="logout mt-5"
          >
            <HiOutlineArrowRightOnRectangle
              size={collapsed ? 25 : 28}
            />
            {!collapsed && <span className="mx-2">Logout</span>}
          </div>
        </Sider>

        <Layout>
          <Content style={{ backgroundColor: "white", minHeight: "100vh" }}>
            {collapsed && (
              <span className="menu-toggler">
                <AiOutlineRight onClick={() => setCollapsed(!collapsed)} />
              </span>
            )}
            {!collapsed && (
              <span className="menu-toggler">
                <AiOutlineLeft onClick={() => setCollapsed(!collapsed)} />
              </span>
            )}
            <React.Fragment>{children}</React.Fragment>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default HeaderCom;
