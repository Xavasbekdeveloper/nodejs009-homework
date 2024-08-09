import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../context/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data } = useGetProfileQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="fixed top-0 left-0 h-screen z-50 py-3"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <NavLink to={"manage-blog"}>
                  <UserOutlined />
                </NavLink>
              ),
              label: "Manage blog",
            },
            {
              key: "2",
              icon: (
                <NavLink to={"create-blog"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Create blog",
            },
            data?.payload?.role === "owner" ? (
              {
                key: "3",
                icon: (
                  <NavLink to={"manage-user"}>
                    <UserOutlined />
                  </NavLink>
                ),
                label: "Manage user",
              }
            ) : (
              <></>
            ),
            data?.payload?.role === "owner" ? (
              {
                key: "4",
                icon: (
                  <NavLink to={"create-user"}>
                    <VideoCameraOutlined />
                  </NavLink>
                ),
                label: "Create user",
              }
            ) : (
              <></>
            ),
          ]}
        />
        <button
          onClick={handleLogOut}
          className="text-white absolute bottom-5 left-5"
        >
          Log out
        </button>
      </Sider>
      <Layout className={`ml-${collapsed ? "20" : "200"} transition-all`}>
        <Header
          className="sticky top-0 z-40 bg-white shadow-md flex items-center justify-between"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl w-16 h-16"
          />
          <div className="flex items-center gap-2 pr-4">
            <div className="w-10 h-10 cursor-pointer rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white">
                {data?.payload?.fname.split("")[0].toUpperCase()}
              </span>
            </div>
            <span className="font-medium cursor-pointer">
              {data?.payload?.fname}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="relative overflow-auto"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
