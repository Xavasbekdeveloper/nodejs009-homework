import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Card, Col, Row } from "antd";

import {
  useDeleteBlogsMutation,
  useGetBlogsQuery,
} from "../../../context/api/blogApi";

const AdminBlog = () => {
  const { data } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogsMutation();
  const [editBlog, setEditBlog] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      deleteBlog(id);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, [edit]);

  return (
    <div className="p-4">
      <Row gutter={[16, 16]} className="flex flex-wrap">
        {data?.payload?.map((el) => (
          <Col
            key={el?._id}
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
              <h2 className="text-lg font-semibold">{el?.title}</h2>
              <p className="text-gray-600">{el?.desc}</p>
              <div className="flex justify-end gap-4 py-4">
                <button className="text-green-400 font-bold text-xl">
                  <EditOutlined />
                </button>
                <button
                  className="text-red-300 font-bold text-xl"
                  onClick={() => handleDelete(el?._id)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminBlog;
