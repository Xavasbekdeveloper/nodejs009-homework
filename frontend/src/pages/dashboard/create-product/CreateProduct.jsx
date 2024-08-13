import React, { useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateProductMutation } from "../../../context/api/productApi";

const CreateProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [create, { data, isLoading, isSuccess }] = useCreateProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("oldPrice", values.oldPrice);
    formData.append("desc", values.desc);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    fileList.forEach((file) => formData.append("file", file.originFileObj));

    await create(formData).unwrap();
  };

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

        <Form.Item
          label="price"
          name="price"
          rules={[
            {
              required: true,
              message: "Price",
            },
          ]}
        >
          <Input placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          label="oldPrice"
          name="oldPrice"
          rules={[
            {
              required: true,
              message: "oldPrice",
            },
          ]}
        >
          <Input placeholder="Enter oldPrice" />
        </Form.Item>

        <Form.Item
          label="category"
          name="category"
          rules={[
            {
              required: true,
              message: "Category",
            },
          ]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item
          label="stock"
          name="stock"
          rules={[
            {
              required: true,
              message: "Stock",
            },
          ]}
        >
          <Input placeholder="Enter stock" />
        </Form.Item>

        <Form.Item>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            multiple
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
            defaultFileList={fileList}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
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

export default CreateProduct;
