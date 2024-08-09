import React, { useEffect } from "react";
import { useUpdateBlogsMutation } from "../../context/api/blogApi";
import { Form, Modal, Input, Button } from "antd";
import { useUpdateUserMutation } from "../../context/api/userApi";

const UpdateUser = ({ handleCancel, modalOpen }) => {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

  const onFinish = (values) => {
    updateUser({ body: values, id: modalOpen._id });
  };

  useEffect(() => {
    if (isSuccess) {
      handleCancel();
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Update Blog"
        open={modalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            fname: modalOpen?.fname,
            lname: modalOpen?.lname,
            url: modalOpen?.url,
            username: modalOpen?.username,
            password: "12345678",
            age: modalOpen?.age,
            gender: modalOpen?.gender,
            budget: modalOpen?.budget,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Button onClick={handleCancel} type="default" htmlType="submit">
              Cancel
            </Button>
            <Button
              loading={isLoading}
              className="ml-4"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUser;
