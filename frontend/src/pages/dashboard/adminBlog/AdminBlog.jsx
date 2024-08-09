import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card, Col, Row } from "antd";

import {
  useDeleteBlogsMutation,
  useGetBlogsQuery,
} from "../../../context/api/blogApi";
import UpdateModal from "../../../components/updateModal/UpdateModal";

const AdminBlog = () => {
  const { data } = useGetBlogsQuery();
  const [modalOpen, setModalOpen] = useState(null);
  const [deleteBlog] = useDeleteBlogsMutation();

  const handleCancel = () => {
    setModalOpen(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      deleteBlog(id);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="p-4">
        <Row gutter={[16, 16]} className="flex flex-wrap">
          {data?.payload?.map((blog) => (
            <Col
              key={blog?._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="flex justify-center"
            >
              <Card
                bordered={false}
                className="w-full shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold">{blog?.title}</h2>
                <p className="text-gray-600">{blog?.desc}</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setModalOpen(blog)}
                    className="text-green-400 font-bold text-xl"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="text-red-300 font-bold text-xl"
                    onClick={() => handleDelete(blog?._id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
                <p className="text-slate-600">Made by {blog?.userId?.fname}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {modalOpen ? (
        <UpdateModal handleCancel={handleCancel} modalOpen={modalOpen} />
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminBlog;
