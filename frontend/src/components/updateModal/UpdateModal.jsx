import React, { useEffect } from "react";
import { useUpdateBlogsMutation } from "../../context/api/blogApi";
import { Form, Modal, Input, Button } from "antd";

const UpdateModal = ({ handleCancel, modalOpen }) => {
  const [updateBlog, { isLoading, isSuccess }] = useUpdateBlogsMutation();

  const onFinish = (values) => {
    updateBlog({ body: values, id: modalOpen._id });
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
            title: modalOpen?.title,
            desc: modalOpen?.desc,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Desc"
            name="desc"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input />
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

export default UpdateModal;
