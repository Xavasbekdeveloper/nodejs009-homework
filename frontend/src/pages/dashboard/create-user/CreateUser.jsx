import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import {
  useGetProfileQuery,
  useRegisterUserMutation,
} from "../../../context/api/userApi";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUser, { data, isLoading, isSuccess }] =
    useRegisterUserMutation();
  const { data: profile } = useGetProfileQuery();

  const handleSubmit = (values) => {
    createUser(values);
  };

  useEffect(() => {
    if (
      profile?.payload?.role === "admin" ||
      profile?.payload?.role === "user"
    ) {
      navigate("/dashboard/manage-blog");
    }
  }, [profile?.payload?.role]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-user");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        className="w-96 max-sm:w-full"
        labelCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="fname"
          name="fname"
          rules={[
            {
              required: true,
              message: "FirstName",
            },
          ]}
        >
          <Input placeholder="Enter fname" />
        </Form.Item>

        <Form.Item
          label="lname"
          name="lname"
          rules={[
            {
              required: false,
              message: "LastName",
            },
          ]}
        >
          <Input placeholder="Enter lname" />
        </Form.Item>

        <Form.Item
          label="image url"
          name="url"
          rules={[
            {
              required: false,
              message: "image url",
            },
          ]}
        >
          <Input placeholder="Enter image url" />
        </Form.Item>

        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password",
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[
            {
              required: false,
              message: "Age",
            },
          ]}
        >
          <Input placeholder="Enter age" />
        </Form.Item>

        <Form.Item
          label="gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Gender",
            },
          ]}
        >
          <Input placeholder="Enter gender" />
        </Form.Item>

        <Form.Item
          label="budget"
          name="budget"
          rules={[
            {
              required: true,
              message: "Budget",
            },
          ]}
        >
          <Input placeholder="Enter budget" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            {isLoading ? "Loading..." : " Create"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateUser;
