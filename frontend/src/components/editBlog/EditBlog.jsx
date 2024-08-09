import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useUpdateBlogsMutation } from "../../context/api/blogApi";

const EditBlog = ({ setEdit }) => {
  const [updateBlog, { data }] = useUpdateBlogsMutation();

  const handleSubmit = async (values) => {
    try {
      // API'ga tahrirlangan blogni jo'natish
      await updateBlog({ id: blog._id, ...values }).unwrap();
      setEdit(false); // Edit modani yopish
    } catch (error) {
      console.error("Blogni tahrirlashda xatolik:", error);
    }
  };

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
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please enter a title",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please enter a description",
          },
        ]}
      >
        <Input placeholder="Enter description" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBlog;
