import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useCreateBlogsMutation } from "../../../context/api/blogApi";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [createBlog, { data, isLoading, isSuccess }] = useCreateBlogsMutation();

  const handleSubmit = (values) => {
    createBlog(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-blog");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
        label="title"
        name="title"
        rules={[
          {
            required: true,
            message: "Title",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="desc"
        name="desc"
        rules={[
          {
            required: true,
            message: "Desc",
          },
        ]}
      >
        <Input placeholder="Enter desc" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          {isLoading ? "Loading..." : " Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
